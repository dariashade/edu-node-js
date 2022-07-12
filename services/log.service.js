import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (err) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + err);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-h - вывод помощи
		-s [CITY] - установка города
		-t [API_KEY] - сохранение токена  
		`
	);
};

const printWeather = (data, icon) => {
	console.log(
		dedent`${chalk.bgBlueBright(' WEATHER ')} Погода в городе ${data.name}
		${icon}  ${data.weather[0].description}
		Температура: ${data.main.temp} (ощущается как ${data.main.feels_like})
		Ветер: ${data.wind.speed}м/с
		`
	);	
}

export { printError, printSuccess, printHelp, printWeather };