
const mongoose = require('mongoose');

const plotSchema = new mongoose.Schema({
  plotNo: String,
  status: String,
  facing: String,
  area: Number,
  price: Number,
  surveyNo: String, 
  locationPin: String,
  boundaries: String,
  notes: String,
  plotTypes: String,
  address: String,
  measurements: String,
  geometry: {
    type: {
      type: String,
      enum: ['Polygon'],
      required: true,
    },
    coordinates: {
      type: [[[Number]]], // 3-level deep array
      required: true,
    }
  }
}, { timestamps: true, collection: 'polygonmaster' }); // 👈 force collection name
// ✅ Create GeoJSON 2dsphere index
plotSchema.index({ geometry: '2dsphere'});

module.exports = mongoose.model('Plot', plotSchema);
