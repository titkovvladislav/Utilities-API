require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const apiRoutesUser = require("./src/modules/routes/users.routes");
const apiRoutesUtilities = require("./src/modules/routes/utilities.routes");
const apiRoutesWeather = require("./src/modules/routes/weather.routes");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use('/weather', apiRoutesWeather);
app.use('/auth', apiRoutesUser);
app.use('/utilities', apiRoutesUtilities);

const start = () => {
    try {
        mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        app.listen(PORT, () => {
            console.log(`PROSLUSHKA...${PORT}`)
        })
    } catch (e) {

        console.log(e)
    }
}

start()
