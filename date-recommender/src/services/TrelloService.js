import axios from 'axios'

export default {
    getCards() {
        return axios
                .get(`https://api.trello.com/1/boards/fDjwsM96/cards/?limit=10&fields=name&key=${process.env.VUE_APP_TRELLO_API_KEY}&token=${process.env.VUE_APP_TRELLO_TOKEN}`);
    }
};