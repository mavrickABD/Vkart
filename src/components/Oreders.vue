<template>
  <div id="orderHistory">
    <h1 class="display-3 grey--text mt-5 text-xs-center">Order History</h1>
    <v-container>
      <v-card
        color="blue-grey lighten-5"
        v-for="item in cart"
        :key="item.name"
        style="margin-bottom:40px"
        :class="`item ${item.category}`"
      >
        <v-layout row justify-start >
          <v-flex >
            <v-img class="white--text" height="200px" width="200px" :src="item.imageUrl"></v-img>
          </v-flex>

          <v-flex xs6 md3>
            <v-card flat color="blue-grey lighten-5" class="black--text">
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{item.name}}</div>
                  <v-rating
                    v-model="item.rating"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    half-increments
                    dense
                    readonly
                  ></v-rating>
                </div>
                <br>
                <div class="title grey--text" style="margin-top:30px">
                  Price
                  <span class="headline black--text">${{item.price}}</span>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Gaxios from "axios";

export default {
  data() {
    return {
      cart: []
    };
  },
  created() {
    var key = this.$store.getters.key;
    Gaxios.get("/users" + "/" + key + ".json").then(res => {
      var data = res.data.orderHistory.splice(1);
      this.cart = data;
      console.log(data);
    });
  }
};
</script>