import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const geticon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '⛅';	
		case '03':
			return '🌥️';
		case '04':
			return '☁️';	
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';	
		case '50':
			return '🌫️';
	}
};

const getGeo = async(city, token) => {

	if (!token) {
		token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
		if (!token) {
			throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
		};
	};

	const { data: dataGeo } = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
		params: {
			q: city,
			appid: token,
			limit: 1
		}
	});

	if (dataGeo.length == 0) {
		return;
	}

	const lon = dataGeo[0].lon;
	const lat = dataGeo[0].lat;

	return { lat, lon } ;

};

const getWeather = async(city) => {

	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
	}
	
	const dataGeo = await getGeo(city, token);
	if (!dataGeo) {
		throw new Error('Неверно указан город');	
	};
	
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			lat: dataGeo.lat,
			lon: dataGeo.lon,
			appid: token,
			lang: 'ru',
			units: 'metric'
		}
	});

	return data;

};

export { getWeather, getGeo, geticon };