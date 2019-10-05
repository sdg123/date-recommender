<template>
  <b-container>
      <div class="hello">
        <h1>Date Recommender</h1>
        <b-button variant="primary" class="mb-2">Random date idea</b-button>
        <div v-for="(item, i) in wholeResponse" v-bind:key="i">
          <b-row>
            <b-col>
              <b-card>
                {{item.name}}
              </b-card>
            </b-col>
          </b-row>
        </div>
      </div>
  </b-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    wholeResponse: Array
  },
  mounted () {
  axios
    .get(`https://api.trello.com/1/boards/fDjwsM96/cards/?limit=10&fields=name&key=${process.env.VUE_APP_TRELLO_API_KEY}&token=${process.env.VUE_APP_TRELLO_TOKEN}`)
    .then(response => {
      this.wholeResponse = response.data;
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
