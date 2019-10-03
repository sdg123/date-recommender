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
    .get(`https://api.trello.com/1/boards/ZLBNOfCb?key=${process.env.VUE_APP_TRELLO_API_KEY}&token=${process.env.VUE_APP_TRELLO_TOKEN}`)
    .then(response => {
      this.wholeResponse = response.data
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
