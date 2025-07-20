const express = require('express');
const router = express.Router();
const { getAllPlots, createPlot, updatePlot, deletePlot } = require('../controllers/plotController');
const auth = require('../middleware/auth');

router.get('/',  getAllPlots);
router.post('/',  createPlot);
router.put('/:id',  updatePlot);
router.delete('/:id',  deletePlot);

module.exports = router;