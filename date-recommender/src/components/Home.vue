<template>
  <b-container>
      <div>
        <b-row>
          <b-col>
            <h1>Date Recommender</h1>
          </b-col>
        </b-row>
        <b-card>
          <Weather />
          <Trello />
          <Yelp />
        </b-card>
      </div>
  </b-container>
</template>

<script>
import Yelp from './../components/Yelp.vue'
import Trello from './../components/Trello.vue'
import Weather from './../components/Weather.vue'
export default {
  name: 'HelloWorld',
  components: {
    Trello,
    Yelp,
    Weather
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
