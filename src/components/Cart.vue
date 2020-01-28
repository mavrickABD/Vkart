<template>
  <div id="cart">
    <h1 class="display-3 grey--text mt-5 text-xs-center">Cart</h1>
    <v-container>
      <v-card
        color="blue-grey lighten-5"
        v-for="item in cart"
        :key="item.name"
        style="margin-bottom:40px"
        :class="`item ${item.category}`"
      >
        <v-layout row justify-start wrap>
          <v-flex xs8 md4>
            <v-img contain class="white--text" height="200px" width="200px" :src="item.imageUrl"></v-img>
          </v-flex>

          <v-flex xs6 md3>
            <v-card flat color="blue-grey lighten-5" dark class="black--text">
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
                <br />
                <div class="title grey--text" style="margin-top:30px">
                  Price
                  <span class="headline black--text">${{item.price}}</span>
                </div>
                <v-flex xs12 sm6 md4>
                  <v-btn
                    outline
                    large
                    block
                    color="blue"
                    style="margin-left:500px"
                    @click="dialog = true;"
                  >
                    <span class="body-2 font-weight-bold">buy</span>
                    <v-spacer></v-spacer>
                    <v-icon>shopping_basket</v-icon>
                  </v-btn>
                </v-flex>
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
      var data = res.data.kart.splice(1);
      this.cart = data;
      console.log(data);
    });
  }
};
</script>

<style scoped>
.item.Eletronics {
  border-left: 4px solid #9575cd;
}
.item.Music {
  border-left: 4px solid #64b5f6;
}
</style>
