import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5';


export default {
    getWeather(lat, lon) {
        return axios
                .get(`${baseUrl}/weather` +
                `?lat=${lat}` +
                `&lon=${lon}` + 
                `&appid=${process.env.VUE_APP_OPENWEATHERMAP_API_KEY}`);
    }
};