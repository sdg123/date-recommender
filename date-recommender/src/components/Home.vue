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
              <div class="name">
                {{randomYelpDate.name}}
              </div>
              <div>
                <img :src="randomYelpDateImage" height="80px" width="80px" />
              </div>
              <div>{{randomYelpDate.price}}</div>
              <div>{{randomYelpDate.rating}}</div>
              <div v-for="i in randomYelpDate.categories" :key="i">
                {{i.title}}
              </div>
              <div v-for="i in randomYelpDate.location.display_address" :key="i">
                  {{i}}
              </div>
            </b-card>
          </b-col>
        </b-row>
      </div>
  </b-container>
</template>

<script>
import TrelloService from './../services/TrelloService'
import YelpService from './../services/YelpService'
export default {
  name: 'HelloWorld',
  props: {
    trelloResponse: Array,
    randomTrelloDate: Object,
    yelpResponse: Array,
    randomYelpDate: Object,
    randomYelpDateImage: Object
  },
  methods: {
    getRandomTrelloDate: function() {
      this.randomTrelloDate = this.trelloResponse[Math.floor(Math.random()*this.trelloResponse.length)].name
    },
    getRandomYelpDate: function() {
      this.randomYelpDate = this.yelpResponse[Math.floor(Math.random()*this.yelpResponse.length)];
      this.randomYelpDateImage = this.randomYelpDate.image_url;
    }
  },
  mounted () {
    TrelloService
      .getCards()
        .then(response => {
          this.trelloResponse = response.data;
          this.randomTrelloDate = response.data[0].name;
        })

    YelpService
      .getEvents()
        .then(response => {
          this.yelpResponse = response.data.businesses;
          this.randomYelpDate = this.yelpResponse[0];
          this.randomYelpDateImage =  this.yelpResponse[0].image_url;
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
.name {
  font-size: 2em;
}
</style>
