<template>
  <b-container>
      <div class="hello">
        <b-row>
          <b-col>
            <h1>Date Recommender</h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button v-on:click="getRandomTrelloDate()" pill variant="outline-primary" class="mb-2">Existing planned date idea</b-button>
          </b-col>
          <b-col>
            <b-button v-on:click="getRandomYelpDate()" pill variant="outline-secondary" class="mb-2">Hungry</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <b-card>
              {{randomTrelloDate}}
            </b-card>
          </b-col>
          <b-col cols="6">
            <b-card>
              {{randomYelpDate}}
            </b-card>
          </b-col>
        </b-row>
      </div>
  </b-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    trelloResponse: Array,
    randomTrelloDate: Object,
    yelpResponse: Array,
    randomYelpDate: Object
  },
  methods: {
    getRandomTrelloDate: function() {
      this.randomTrelloDate = this.trelloResponse[Math.floor(Math.random()*this.trelloResponse.length)].name
    },
    getRandomYelpDate: function() {
      this.randomYelpDate = this.yelpResponse[Math.floor(Math.random()*this.yelpResponse.length)].name
    }
  },
  mounted () {
  axios
    .get(`https://api.trello.com/1/boards/fDjwsM96/cards/?limit=10&fields=name&key=${process.env.VUE_APP_TRELLO_API_KEY}&token=${process.env.VUE_APP_TRELLO_TOKEN}`)
    .then(response => {
      this.trelloResponse = response.data;
      this.randomTrelloDate = response.data[0].name;
    })

    axios
    .get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?limit=5&location=Winston Salem`, {headers: {'Authorization': `Bearer ${process.env.VUE_APP_YELP_API_KEY}`}})
    .then(response => {
      this.yelpResponse = response.data.businesses;
      this.randomYelpDate = this.yelpResponse[0].name;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
