import axios from 'axios'

const baseUrl = 'https://api.trello.com';

export default {
    getCards() {
        return axios
                .get(`${baseUrl}/1/boards/fDjwsM96/cards/` +
                `?limit=10` +
                `&fields=name` +
                `&key=${process.env.VUE_APP_TRELLO_API_KEY}` + 
                `&token=${process.env.VUE_APP_TRELLO_TOKEN}`);
    }
};