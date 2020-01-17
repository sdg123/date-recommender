export default {
    getTemperatureInFahrenheit(temperatureInKelvin) {
        return Math.floor((9/5)*(temperatureInKelvin - 273) + 32);
    },
    getWeatherDescription(weather) {
        return weather.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    }
};