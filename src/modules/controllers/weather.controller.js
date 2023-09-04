const axios = require('axios');
const Weather = require('../../db/models/weather.model');
const { v4: uuidv4 } = require('uuid');
const { checkDate } = require('../../utils/tools')

module.exports.getWeather = async (req, res, next) => {
    try {
        let weatherDb = null;
        await Weather.find().then(result => weatherDb = result[0]);

        if (!checkDate(weatherDb.currentWeather.now)){
            await Weather.deleteOne({ id: weatherDb.id });
            const response = await axios.get('https://api.weather.yandex.ru/v2/informers', {
                headers: {
                    "X-Yandex-API-Key": process.env.APIKeyWeather ,
                    'content-type': 'application/json'
                },
                params: {
                    "lat": "47.422052",
                    "lon": "40.093723",
                    "lang": "ru_RU"
                }
            });

            const { now, fact } = response.data;
            const id = uuidv4();
            const weather = new Weather({
                currentWeather: {
                    now,
                    icon: fact.icon,
                    temp: fact.temp,
                    feels_like: fact.feels_like,
                    condition: fact.condition
                },
                id
            });
            return weather.save().then(result => res.json(result.currentWeather));
        }
        return res.send(weatherDb.currentWeather);
    } catch (e) {
        console.log(e);
        return res.status(422).send('Error! Params not correct');
    }
};
