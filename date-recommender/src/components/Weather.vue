<template>
    <b-container>
        <b-row>
            <b-col>
                <div v-if="weather">
                    <h3>What it's like outside: {{weather.temperature}} &deg;F</h3> 
                    {{weather.description}}
                </div>
            </b-col>
        </b-row>
    </b-container>    
</template>

<script>
import WeatherService from './../services/WeatherService'
import WeatherHelper from './../helpers/WeatherHelpers'

export default {
    props: {
        weather: Object,
        temperature: Object
    },
    mounted() {
        navigator.geolocation.getCurrentPosition(pos => {
            WeatherService
                .getWeather(pos.coords.latitude, pos.coords.longitude)
                .then(response => {
                    this.weather = {
                        temperature: WeatherHelper.getTemperatureInFahrenheit(response.data.main.temp),
                        description: WeatherHelper.getWeatherDescription(response.data.weather[0].description)
                    };
                });
        });
    }
}
</script>

<style scoped>

</style>