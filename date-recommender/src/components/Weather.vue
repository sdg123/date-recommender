<template>
    <b-container>
        <b-row>
            <b-col cols="6">
            </b-col>
            <b-col cols="6">
                <div v-if="temperature">
                    <h3>What it's like outside: {{temperature}} &deg;F</h3> 
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
                        this.weather = response.data;
                        this.temperature = WeatherHelper.getTemperatureInFahrenheit(this.weather.main.temp);
                    });
            });
    }
}
</script>

<style scoped>

</style>