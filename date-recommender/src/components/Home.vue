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
            <b-button v-on:click="getRandomTrelloDate()" pill variant="outline-primary" class="mb-2">Existing planned date idea</b-button>
            <b-card>
              {{randomTrelloDate}}
            </b-card>
          </b-col>
        </b-row>
        <Yelp />
      </div>
  </b-container>
</template>

<script>
import TrelloService from './../services/TrelloService'
import Yelp from './../components/Yelp.vue'

export default {
  name: 'HelloWorld',
  props: {
    trelloResponse: Array,
    randomTrelloDate: Object
  },
  methods: {
    getRandomTrelloDate: function() {
      this.randomTrelloDate = this.trelloResponse[Math.floor(Math.random()*this.trelloResponse.length)].name
    }
  },
  components: {
    Yelp
  },
  mounted () {
    TrelloService
      .getCards()
        .then(response => {
          this.trelloResponse = response.data;
          this.randomTrelloDate = response.data[0].name;
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
