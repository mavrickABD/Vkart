<template>
  <div id="Detailproduct" class="mt-5">
    <v-container>
      <v-layout row wrap align-center justify-space-around>
        <v-flex xs12 sm6 md4>
          <v-card flat>
            <v-img :src="product.imageUrl" height="350px"></v-img>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6>
          <v-card flat color="blue-grey lighten-5" class="black--text">
            <v-card-title primary-title>
              <div>
                <div class="headline">{{product.name}}</div>

                <v-rating
                  v-model="product.rating"
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  half-increments
                  dense
                  readonly
                ></v-rating>

                <br>
                <br>
                <span class="subheading">Price: ${{product.price}}</span>
                <br>
                <br>
                <span class="body-2 font-weight-bold">Description:</span>
                <br>
                <span>{{product.description}}</span>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4>
          <v-btn
            outline
            large
            block
            color="red"
            style="margin-left:45px"
            @click="addItemToKart"
            class="mt-5"
          >
            <span class="body-2 font-weight-bold">ADD to kart</span>
            <v-spacer></v-spacer>
            <v-icon>add_shopping_cart</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4>
          <v-btn outline large block color="blue" style="margin-left:45px" @click="dialog = true;">
            <span class="body-2 font-weight-bold">buy</span>
            <v-spacer></v-spacer>
            <v-icon>shopping_basket</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="blue lighten-1">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Payment Portal</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="buy">confirm</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-container>
          <v-layout row wrap>
            <v-flex>
              <div class="headline">{{product.name}}</div>
              <v-rating
                v-model="product.rating"
                color="yellow darken-3"
                background-color="grey darken-1"
                half-increments
                dense
                readonly
              ></v-rating>

              <br>
              <br>
              <span class="display-1">
                Price:
                <span class="headline font-weight-medium">${{product.price}}</span>
              </span>
              <br>
              <span class="body-2 grey--text">shipment cost: ${{shipment}}</span>
              <v-flex xs12 md6>
                <v-form ref="form">
                  <v-text-field :counter="max" :rules="rules" label="Shipmet Address " class="mt-5"></v-text-field>
                  <v-select
                    :items="categories"
                    label="payment mode"
                    outline
                    v-model="selectedCategory"
                    class="mt-5"
                  ></v-select>
                  <span class="headline font-weight-medium mt-5">Discounts</span>
                  <br>
                  <span class="title">
                    Category:
                    <span :class="color">{{level}}</span>
                  </span>
                  <br>
                  <br>
                  <span class="subheading">Discount: ${{discounts}}</span>
                  <br>
                  <br>
                  <span
                    class="headline font-weight-medium"
                    style="margin-top:10px"
                  >Total: ${{total}}</span>
                </v-form>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Gaxios from "axios";
export default {
  data() {
    return {
      product: "",
      dialog: false,
      max: 50,
      categories: ["card", "Net banking", "COD"],
      selectedCategory: ""
    };
  },

  created() {
    var self = this;
    var route = this.$route.path;
    Gaxios.get(route).then(res => {
      console.log(res);
      self.product = res.data;
    });
  },

  methods: {
    addItemToKart() {
      var key = this.$store.getters.key;
      Gaxios.get("/users" + "/" + key + ".json").then(res => {
        var data = res.data;
        console.log(data);
        data.kart.push(this.product);
        Gaxios.put("/users" + "/" + key + ".json", data);
        this.$store.commit("addItemToKart", this.product);
      });
    },
    buy() {
      var key = this.$store.getters.key;
      Gaxios.get("/users" + "/" + key + ".json").then(res => {
        var data = res.data;
        console.log(data);
        data.orderHistory.push(this.product);
        data.totalCost += parseInt(this.product.price);
        Gaxios.put("/users" + "/" + key + ".json", data);
        this.$store.commit("addItemToOrderhistory", this.product);
        this.$store.commit("updateTotalCost", this.product.price);
        this.dialog = false;
      });
    }
  },
  computed: {
    shipment() {
      var total = this.$store.getters.totalCost;
      if (total <= 100) {
        return 5;
      } else if (total > 100) {
        return 0;
      }
    },
    rules() {
      const rules = [];

      if (this.max) {
        const rule = v =>
          (v || "").length <= this.max ||
          `A maximum of ${this.max} characters is allowed`;

        rules.push(rule);
      }

      if (!this.allowSpaces) {
        const rule = v => (v || "").indexOf(" ") < 0 || "No spaces are allowed";

        rules.push(rule);
      }

      if (this.match) {
        const rule = v => (!!v && v) === this.match || "Values do not match";

        rules.push(rule);
      }

      return rules;
    },

    discounts() {
      var total = this.$store.getters.totalCost;
      if (total >= 100 && total < 500) {
        return 0;
      } else if (total <= 500 && total < 1000) {
        return ((5 / 100) * this.product.price).toFixed(2);
      } else if (total > 1000) {
        return ((10 / 100) * this.product.price).toFixed(2);
      } else {
        return 0;
      }
    },

    total() {
      var total = this.$store.getters.totalCost;

      console.log("TOTAL");
      console.log(total);
      if (total >= 100 && total < 500) {
        return parseInt(this.product.price).toFixed(2);
      } else if (total <= 500 && total < 1000) {
        return (this.product.price - (5 / 100) * this.product.price).toFixed(2);
      } else if (total > 1000) {
        return (this.product.price - (10 / 100) * this.product.price).toFixed(
          2
        );
      } else {
        return (parseInt(this.product.price) + 5).toFixed(2);
      }
    },
    level() {
      var total = this.$store.getters.totalCost;
      if (total >= 100 && total < 500) {
        return "BRONZE";
      } else if (total <= 500 && total < 1000) {
        return "SILVER";
      } else if (total > 1000) {
        return "GOLD";
      } else {
        return "none";
      }
    },
    color() {
      var total = this.$store.getters.totalCost;
      if (total >= 100 && total < 500) {
        return "brown--text text--darken-1";
      } else if (total <= 500 && total < 1000) {
        return "grey--text text--lighten-2";
      } else if (total > 1000) {
        return "amber--text text--darken-2";
      }else{
        return "black--text"
      }
    }
  }
};
</script>
