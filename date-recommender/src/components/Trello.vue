<template>
    <b-container>
        <b-row>
          <b-col>
            <b-button v-on:click="getRandomTrelloDate()" pill variant="outline-primary" class="mb-2">Existing planned date idea</b-button>
            <b-card>
              {{randomTrelloDate}}
            </b-card>
          </b-col>
        </b-row>
    </b-container>
</template>

<script>
import TrelloService from './../services/TrelloService'

export default {
    props: {
        trelloResponse: Array,
        randomTrelloDate: Object
    },
    methods: {
        getRandomTrelloDate: function() {
            this.randomTrelloDate = this.trelloResponse[Math.floor(Math.random()*this.trelloResponse.length)].name
        }
    },
    mounted() {
        TrelloService
            .getCards()
                .then(response => {
                this.trelloResponse = response.data;
                this.randomTrelloDate = response.data[0].name;
                })
    }
}
</script>