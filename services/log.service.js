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

export { printError, printSuccess, printHelp };