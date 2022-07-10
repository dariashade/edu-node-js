import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getWeather = async (city) => {

	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
	}
	
	const { data: dataGeo } = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
		params: {
			q: city,
			appid: token,
			limit: 1
		}
	});

	if (dataGeo.length == 0) {
		throw new Error('Неверно указан город');	
	}

	const lon = dataGeo[0].lon;
	const lat = dataGeo[0].lat;

	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			lat: lat,
			lon: lon,
			appid: token,
			lang: 'ru',
			units: 'metric'
		}
	});

	return data;

};

export { getWeather };