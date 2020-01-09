<template>
  <b-container>
      <b-row>
          <b-col>
          <b-button v-on:click="getRandomYelpDate()" pill variant="outline-secondary" class="mb-2">Hungry</b-button>
          <b-card>
            <div class="name">
              {{randomYelpDate.name}}
            </div>
            <div>
              <img :src="randomYelpDateImage" height="80px" width="80px" />
            </div>
            <div>{{randomYelpDatePrice}}</div>
            <div>{{randomYelpDate.rating}}</div>
            <div>
              <b-badge class="badge" v-for="category in randomYelpDate.categories" :key="category">
                {{category.title}}
              </b-badge>
            </div>
            <div v-for="i in randomYelpDate.location.display_address" :key="i">
                {{i}}
            </div>
            <div>
              It will take {{timeToDestination}} minutes to drive there.
            </div>
          </b-card>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
import YelpService from './../services/YelpService'
import YelpHelper from './../helpers/YelpHelpers'
import MapQuestService from './../services/MapQuestService'

export default {
    methods: {
      getRandomYelpDate: function() {
        this.randomYelpDate = this.yelpResponse[Math.floor(Math.random()*this.yelpResponse.length)];
        this.randomYelpDateImage = this.randomYelpDate.image_url;
      }
    },
    props: {
        yelpResponse: Array,
        randomYelpDate: Object,
        randomYelpDatePrice: Object,
        randomYelpDateImage: Object,
        timeToDestination: Object
    },
    mounted() {
      YelpService
        .getEvents()
        .then(response => {
          var self = this;
          this.yelpResponse = response.data.businesses;
          this.randomYelpDate = this.yelpResponse[0];
          this.randomYelpDatePrice = YelpHelper.getTextDescriptionOfDollarSigns(this.randomYelpDate.price);
          this.randomYelpDateImage =  this.yelpResponse[0].image_url;
          var toAddress = encodeURIComponent(this.randomYelpDate.location.display_address[0]);
          navigator.geolocation.getCurrentPosition(function(pos){
            var fromAddress = encodeURIComponent(`${pos.coords.latitude},${pos.coords.longitude}`);

            MapQuestService.getRoute(fromAddress, toAddress)
              .then(p => {
                var timeInMinutes = p.data.route.time / 60;
                self.timeToDestination = Math.floor(timeInMinutes);
              })
          });
        })
    }
}
</script>

<style scoped>
.badge {
margin-left: 5px;
}
</style>