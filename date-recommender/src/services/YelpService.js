import axios from 'axios'

export default {
    getEvents() {
        return axios
                .get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?limit=5&location=Winston Salem`, {headers: {'Authorization': `Bearer ${process.env.VUE_APP_YELP_API_KEY}`}});
    }
};