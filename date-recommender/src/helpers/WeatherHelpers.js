export default {
    getTemperatureInFahrenheit(temperatureInKelvin) {
        return Math.floor((9/5)*(temperatureInKelvin - 273) + 32);
    },
    getWeatherDescription(weather) {
        return weather.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    },
    isInclementWeather(temperature, weatherDescription) {
        var temperatureDegreeOfInclemency = this.getTemperatureDegreeOfInclemency(temperature);
        var weatherDescriptionDegreeOfInclemency = this.getWeatherDescriptionDegreeOfInclemency(weatherDescription);
        
        return (temperatureDegreeOfInclemency + weatherDescriptionDegreeOfInclemency) >= 1.0 ? true : false;
    },
    getTemperatureDegreeOfInclemency(temperature) {
        var degreeOfInclemency = 0.0;
        if (temperature <= 40 || temperature > 100)
            degreeOfInclemency = 1.0;
        else if (temperature < 50 || temperature > 90)
            degreeOfInclemency = 0.8;
        else if (temperature < 58 || temperature > 80)
            degreeOfInclemency = 0.7;

        return degreeOfInclemency;
    },
    getWeatherDescriptionDegreeOfInclemency(weatherDescription) {
        var degreeOfInclemency = 0.0;
        var mildlyInclementWeatherDescriptionWords = [ "Wind", "Sunny" ];
        var inclementWeatherDescriptionWords = [ "Storm", "Rain", "Strong", "Hot" ];
        
        if (new RegExp(mildlyInclementWeatherDescriptionWords.join("|")).test(weatherDescription))
            degreeOfInclemency += 0.25;
        if (new RegExp(inclementWeatherDescriptionWords.join("|")).test(weatherDescription))
            degreeOfInclemency += 0.6;

        return degreeOfInclemency;
    }
};