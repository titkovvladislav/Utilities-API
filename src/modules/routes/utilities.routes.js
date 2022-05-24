const express = require('express');
const router = express.Router();

const {
    addIndications,
    getIndications,
} = require('../controllers/utilities.controllers');

// Utilities routes
router.post('/addIndications', addIndications);
router.post('/getIndications', getIndications);



module.exports = router;
