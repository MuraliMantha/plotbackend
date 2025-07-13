const Plot = require('../models/Plot');

// Get all plots
const getAllPlots = async (req, res) => {
  try {
    const plots = await Plot.find();
    // Format as GeoJSON FeatureCollection for compatibility with frontend
    const geojson = {
      type: 'FeatureCollection',
      features: plots.map(plot => ({
        type: 'Feature',
        properties: {
          plotNo: plot.plotNo,
          status: plot.status,
          facing: plot.facing,
          area: plot.area,
          price: plot.price,
          surveyNo: plot.surveyNo,
          locationPin: plot.locationPin,
          boundaries: plot.boundaries,
          notes: plot.notes,
          plotTypes: plot.plotTypes,
          address: plot.address,
          measurements: plot.measurements,
          _id: plot._id, // Include MongoDB _id for updates
        },
        geometry: plot.geometry,
      })),
    };
    res.status(200).json(geojson);
  } catch (error) {
    console.error('❌ Error fetching plots:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

function pixelToGeo(x, y, imageWidth, imageHeight, bounds) {
  const { lngMin, lngMax, latMin, latMax } = bounds;
  const lng = lngMin + (x / imageWidth) * (lngMax - lngMin);
  const lat = latMax - (y / imageHeight) * (latMax - latMin);
  return [lng, lat];
}

// Create a plot
const createPlot = async (req, res) => {
    try {
    const { geometry, ...rest } = req.body;

    const bounds = {
      lngMin: 78.0400,
      lngMax: 78.0412,
      latMin: 17.4110,
      latMax: 17.4120
    };

    const imageWidth = 1000;  // in pixels
    const imageHeight = 1000;

    // Convert pixel coords to lat/lng
    const convertedCoordinates = geometry.coordinates[0].map(([x, y]) =>
      pixelToGeo(x, y, imageWidth, imageHeight, bounds)
    );

    const plot = new Plot({
      ...rest,
      geometry: {
        type: 'Polygon',
        coordinates: [convertedCoordinates]
      }
    });

    await plot.save();

    res.status(201).json({ success: true, message: 'Plot created', data: plot });
  } catch (error) {
    console.error('❌ Error creating plot:', error);
    res.status(400).json({ success: false, message: 'Invalid plot data', error: error.message });
  }
};

// Update a plot
const updatePlot = async (req, res) => {
  try {
    const plot = await Plot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!plot) {
      return res.status(404).json({ success: false, message: 'Plot not found' });
    }
    res.status(200).json({ success: true, message: 'Plot updated', data: plot });
  } catch (error) {
    console.error('❌ Error updating plot:', error);
    res.status(400).json({ success: false, message: 'Invalid update data', error: error.message });
  }
};

// Delete a plot
const deletePlot = async (req, res) => {
  try {
    const plot = await Plot.findByIdAndDelete(req.params.id);
    if (!plot) {
      return res.status(404).json({ success: false, message: 'Plot not found' });
    }
    res.status(200).json({ success: true, message: 'Plot deleted' });
  } catch (error) {
    console.error('❌ Error deleting plot:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getAllPlots, createPlot, updatePlot, deletePlot };