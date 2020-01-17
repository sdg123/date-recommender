<template>
  <b-container>
      <div>
        <b-row>
          <b-col>
            <h1>Date Recommender</h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button v-on:click="getSelection(1)" pill variant="outline-primary" class="mb-2">What's the weather like?</b-button>
          </b-col>
          <b-col>
            <b-button v-on:click="getSelection(2)" pill variant="outline-primary" class="mb-2">Date idea from my Trello board</b-button>
          </b-col>
          <b-col>
            <b-button v-on:click="getSelection(3)" pill variant="outline-primary" class="mb-2">Recommend a restaurant</b-button>
          </b-col>
        </b-row>
        <b-card>
          <div v-if="selection == 1">
            <Weather />
          </div>
          <div v-if="selection == 2">
            <Trello />
          </div>
          <div v-if="selection == 3">
            <Yelp />
          </div>
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
  },
  props: {
    selection: Object
  },
  methods: {
    getSelection: function(option) {
      this.selection = option;
    }
  },
  mounted() {
    this.selection = 0;
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
