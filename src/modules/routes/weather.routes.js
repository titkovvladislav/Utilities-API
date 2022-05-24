const express = require('express');
const router = express.Router();

const {
    getWeather,
} = require('../controllers/weather.controller');

// routes
router.get('/getweather', getWeather);


module.exports = router;
