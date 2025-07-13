const express = require('express');
const router = express.Router();
const { getAllPlots, createPlot, updatePlot, deletePlot } = require('../controllers/plotController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllPlots);
router.post('/', auth, createPlot);
router.put('/:id', auth, updatePlot);
router.delete('/:id', auth, deletePlot);

module.exports = router;