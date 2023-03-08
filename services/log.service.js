import chalk from "chalk";
import dedent from "dedent-js";
import {getIcon} from "./api.service.js";

export const printError = (err) => {
    console.log(chalk.black.bgRed(' ERROR ')+' '+err);
}

export const printSuccess = (msg) => {
    console.log(chalk.black.bgGreen(' SUCCESS ')+' '+msg);
}

export const printHelp = () => {
    console.log(
        dedent`${chalk.black.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -h - для вывода помощи
        -s [CITY] - для установки города
        -t [API_KEY] - для сохранения токена
        `
    );
}

export const printWeather = (res) => {
    console.log(
        dedent`${chalk.black.bgYellow(' WEATHER ')} Погода в городе ${res.name}
        ${getIcon(res.weather[0].icon)} ${res.weather[0].description}
        Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
        Влажность: ${res.main.humidity} %
        Скорость ветра: ${res.wind.speed}
        `
    );
}
