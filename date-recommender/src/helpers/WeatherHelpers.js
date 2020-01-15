export default {
    getTemperatureInFahrenheit(temperatureInKelvin) {
        return Math.floor((9/5)*(temperatureInKelvin - 273) + 32);
    }
};