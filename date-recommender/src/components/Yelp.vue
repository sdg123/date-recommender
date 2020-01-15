<template>
  <b-container>
      <b-row>
          <b-col>
          <b-button v-on:click="getRandomYelpDate()" pill variant="outline-secondary" class="mb-2">Restaurants Near You</b-button>
          <div class="name">
            {{randomYelpDate.name}}
          </div>
          <div>
            <img :src="randomYelpDateImage" height="80px" width="80px" />
          </div>
          <div>{{randomYelpDatePrice}}</div>
          <div>{{randomYelpDate.rating}} stars</div>
          <div>
            <b-badge class="badge" v-for="category in randomYelpDate.categories" :key="category">
              {{category.title}}
            </b-badge>
          </div>
          <div v-for="i in randomYelpDate.location.display_address" :key="i">
            {{i}}
          </div>
          <div v-if="timeToDestination">
            It will take <span class="time"><strong>{{timeToDestination}}</strong></span> to drive there.
          </div>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
import YelpService from './../services/YelpService'
import YelpHelper from './../helpers/YelpHelpers'
import MapQuestService from './../services/MapQuestService'
import MapQuestHelper from './../helpers/MapQuestHelpers'

export default {
    methods: {
      getRandomYelpDate: function() {
        var self = this;
        this.randomYelpDate = this.yelpResponse[Math.floor(Math.random()*this.yelpResponse.length)];
        this.randomYelpDateImage = this.randomYelpDate.image_url;
        this.randomYelpDatePrice = YelpHelper.getTextDescriptionOfDollarSigns(this.randomYelpDate.price);
        var toAddress = encodeURIComponent(this.randomYelpDate.location.display_address[0]);
        navigator.geolocation.getCurrentPosition(pos => {
          var fromAddress = encodeURIComponent(`${pos.coords.latitude},${pos.coords.longitude}`);
          MapQuestService.getRoute(fromAddress, toAddress)
            .then(p => {
              self.timeToDestination = MapQuestHelper.getTimeDescription(p.data.route.time);
            }, function(error) {}, {maximumAge: 0});
        });
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

      // var date = new Date();
      // console.log(date.getHours());

      navigator.geolocation.getCurrentPosition(pos => {
        var fromAddress = encodeURIComponent(`${pos.coords.latitude},${pos.coords.longitude}`);

        YelpService
          .getEvents(pos.coords.latitude, pos.coords.longitude)
          .then(response => {
            var self = this;
            this.yelpResponse = response.data.businesses;
            this.randomYelpDate = this.yelpResponse[0];
            this.randomYelpDatePrice = YelpHelper.getTextDescriptionOfDollarSigns(this.randomYelpDate.price);
            this.randomYelpDateImage =  this.yelpResponse[0].image_url;
            var toAddress = encodeURIComponent(this.randomYelpDate.location.display_address[0]);

            MapQuestService.getRoute(fromAddress, toAddress)
              .then(p => {
                self.timeToDestination = MapQuestHelper.getTimeDescription(p.data.route.time);
              });
          });
        }, error => {
          console.log(error);
        }, {enableHighAccuracy: true, maximumAge: 0});
    }
}
</script>

<style scoped>
.badge {
margin-left: 5px;
}
.time {
  color: green;

}
</style>