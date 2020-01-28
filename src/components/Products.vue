<template>
  <div id="products" class="mt-5">
    <h1 class="display-3 mt-5 text-xs-center">
      <span :class="textColor">{{path}}</span>
    </h1>

    <v-container>
      <v-layout row justify-start>
        <v-flex xs12 sm6 md3 v-for="(product, key , index) in products" :key="index" ma-3>
          <v-card color="blue-grey lighten-5">
            <v-img :src="product.imageUrl" height="200px"></v-img>

            <v-card-title primary-title style="padding: 10px">
              <div>
                <div class="headline">{{product.name}}</div>
                <span class="grey--text">${{product.price}}</span>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-rating
                v-model="product.rating"
                color="yellow darken-3"
                background-color="grey darken-1"
                half-increments
                dense
                readonly
              ></v-rating>

              <v-spacer></v-spacer>
              <v-btn flat color="green" @click="detialPage(key)">Buy</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Gaxios from "axios";
//import DetailProdVue from "./DetailProd.vue";
export default {
  data() {
    return {
      products: [],
      //rating: 3.53
    };
  },
  computed: {
    path() {
      return this.$route.path.substr(1);
    },
    textColor() {
      var color = this.$store.getters.color;
      color = color.split(" ")[0];
      
      return color + "--" + "text" + " " + "text--lighten-2";
    }
  },
  methods: {
    detialPage(id) {
      this.$router.push("/" + this.path + "/" + id + ".json");
    }
  },
  created() {
    var self = this;
    Gaxios.get("/" + this.path + ".json").then(res => {
      console.log(res);

      const data = res.data;

      self.products = data;
    });
  }
};
</script>

