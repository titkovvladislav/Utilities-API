const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeatherSchema = new Schema({
    currentWeather: {
        now: { type: Number },
        icon: { type: String },
        temp: { type: Number },
        feels_like: { type: Number },
        condition: { type: String }
    },
    id: { type: String }
});

module.exports = Weather = mongoose.model("Weather", WeatherSchema);
