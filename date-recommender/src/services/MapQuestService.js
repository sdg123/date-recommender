import axios from 'axios'

const corsPrefix = 'https://cors-anywhere.herokuapp.com';
const baseUrl = 'https://www.mapquestapi.com';

export default {
    getRoute(from, to) {
        return axios
                .get(`${corsPrefix}/${baseUrl}/directions/v2/route`+
                `?key=${process.env.VUE_APP_MAPQUEST_API_KEY}` + 
                `&from=${from}` + 
                `&to=${to}` + 
                `&outformat=json` + 
                `&routeType=fastest` + 
                `&doReverseGeocode=false` + 
                `&enhancedNarrative=false` +
                `&avoidTimedConditions=false` + 
                `&ambiguities=ignore`);
    }
};