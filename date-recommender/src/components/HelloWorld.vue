<template>
  <div class="hello">
    {{wholeResponse}}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    wholeResponse: String
  },
  mounted () {
  axios
    .get(`http://www.omdbapi.com/?s=mummy&apikey=${process.env.VUE_APP_OMDB_API_KEY}&page=1&type=movie&Content-Type=application/json`)
    .then(response => {
      this.wholeResponse = response.data.Search
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
