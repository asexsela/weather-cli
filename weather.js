#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import {printHelp, printError, printSuccess, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICT} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен');
        process.exit(1)
    }
    try {
        await saveKeyValue(TOKEN_DICT.token, token)
        printSuccess('Токен сохранен!')
    } catch (e) {
        printError(e.toString());
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('Не передан город');
        process.exit(1)
    }

    try {
        await saveKeyValue(TOKEN_DICT.city, city);
        printSuccess(`Город [${city}] сохранен!`)
    } catch (e) {
        printError(e.toString());
    }
}

const getForCast = async () => {
    try {
        const city = await getKeyValue(TOKEN_DICT.city)
        const weather = await getWeather(city)
        printWeather(weather)
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Город не найден');
        } else if (e?.response?.status === 401) {
            printError('Не верный токен');
        } else {
            printError(e.toString());
        }

    }

}

const initCli = () => {
    const args = getArgs(process.argv)

    if (args.h) {
        printHelp()
    }

    if (args.s) {
        return saveCity(args.s);
    }

    if (args.t) {
        return saveToken(args.t)
    }
    // Show weather page
    return getForCast()
}

initCli();
