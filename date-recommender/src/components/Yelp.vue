<template>
  <b-container>
    <b-row>
      <b-col>
        <b-button v-on:click="getNextYelpDate()" pill variant="outline-secondary" class="mb-2">Restaurants Near You</b-button>
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
import ShuffleHelper from './../helpers/ShuffleHelpers'

export default {
    methods: {
      setYelpDateProperties: function() {
        this.randomYelpDateImage = this.randomYelpDate.image_url;
        this.randomYelpDatePrice = YelpHelper.getTextDescriptionOfDollarSigns(this.randomYelpDate.price);
      },
      getNextYelpDate: function() {
        var self = this;
        this.currentYelpDateIndex = ShuffleHelper
                                      .cycleToNextElement(
                                        this.currentYelpDateIndex, 
                                        this.yelpResponse.length
                                      );

        this.randomYelpDate = this.yelpResponse[this.currentYelpDateIndex];
        setYelpDateProperties();
        var toAddress = encodeURIComponent(this.randomYelpDate.location.display_address[0]);
        navigator.geolocation.getCurrentPosition(pos => {
          var fromAddress = encodeURIComponent(`${pos.coords.latitude},${pos.coords.longitude}`);
          MapQuestService.getRoute(fromAddress, toAddress)
            .then(p => {
              self.timeToDestination = MapQuestHelper.getTimeDescription(p.data.route.time);
            }, function(error) {}, {enableHighAccuracy: true, maximumAge: 0});
        });
      }
    },
    props: {
      yelpResponse: Array,
      randomYelpDate: Object,
      currentYelpDateIndex: Number,
      randomYelpDatePrice: Object,
      randomYelpDateImage: Object,
      timeToDestination: Object
    },
    mounted() {

      // var date = new Date();
      // console.log(date.getHours());

      this.currentYelpDateIndex = 0;

      navigator.geolocation.getCurrentPosition(pos => {
        var fromAddress = encodeURIComponent(`${pos.coords.latitude},${pos.coords.longitude}`);

        YelpService
          .getEvents(pos.coords.latitude, pos.coords.longitude)
          .then(response => {
            var self = this;
            this.yelpResponse = ShuffleHelper.getShuffledArray(response.data.businesses);
            this.currentYelpDateIndex = 0;
            this.randomYelpDate = this.yelpResponse[this.currentYelpDateIndex];
            this.randomYelpDateImage = this.randomYelpDate.image_url;
            this.randomYelpDatePrice = YelpHelper.getTextDescriptionOfDollarSigns(this.randomYelpDate.price);
            // this.randomYelpDateImage = this.randomYelpDate.image_url;

            var toAddress = encodeURIComponent(this.randomYelpDate.location.display_address[0]);

            MapQuestService.getRoute(fromAddress, toAddress)
              .then(p => {
                self.timeToDestination = MapQuestHelper.getTimeDescription(p.data.route.time);
              });

            MapQuestService.getMap(toAddress)
              .then(p => {
                console.log(p);
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