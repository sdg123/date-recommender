<template>
    <b-container>
        <b-row>
            <b-col>
                <div v-if="temperature">
                    <h3>{{temperature}} &deg;F</h3> 
                </div>
            </b-col>
        </b-row>
    </b-container>    
</template>

<script>
import WeatherService from './../services/WeatherService'
export default {
    props: {
        weather: Object,
        temperature: Object
    },
    mounted() {
        navigator.geolocation.getCurrentPosition(pos => {
                WeatherService.getWeather(pos.coords.latitude, pos.coords.longitude)
                    .then(response => {
                        this.weather = response.data;
                        this.temperature = Math.floor((9/5)*(this.weather.main.temp - 273) + 32)
                    });
            });
    }
}
</script>

<style scoped>

</style>