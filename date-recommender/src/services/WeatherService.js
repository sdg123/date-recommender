import axios from 'axios'

export default {
    getWeather(lat, lon) {
        return axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.VUE_APP_OPENWEATHERMAP_API_KEY}`);
    }
};