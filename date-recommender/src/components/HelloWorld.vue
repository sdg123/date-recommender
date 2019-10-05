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
            <b-button v-on:click="randomize()" pill variant="outline-primary" class="mb-2">I'm feeling lucky!</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="4"></b-col>
          <b-col cols="4">
            <b-card>
              {{randomDate}}
            </b-card>
          </b-col>
          <b-col cols="4"></b-col>
        </b-row>
      </div>
  </b-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    wholeResponse: Array,
    randomDate: Object
  },
  methods: {
    randomize: function() {
      this.randomDate = this.wholeResponse[Math.floor(Math.random()*this.wholeResponse.length)].name
    }
  },
  mounted () {
  axios
    .get(`https://api.trello.com/1/boards/fDjwsM96/cards/?limit=10&fields=name&key=${process.env.VUE_APP_TRELLO_API_KEY}&token=${process.env.VUE_APP_TRELLO_TOKEN}`)
    .then(response => {
      this.wholeResponse = response.data;
      this.randomDate = response.data[0].name;
    })
    // .catch(error => {
    //   console.log(error)
    // })
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
