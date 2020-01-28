<template>
  <nav>
    <v-toolbar app flat clipped-left :color="color">
      <v-toolbar-side-icon dark @click="drawer=!drawer" v-if="username"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        <span class="font-weight-black display-1">V</span>
        <span class="font-weight-light font-italic">kart</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-badge left color="red" style="margin-right:25px" v-model="items" v-if="username">
        <template v-slot:badge>
          <span>{{items}}</span>
        </template>
        <v-btn flat fab style="width: 37%;
    height: 37%;" depressed @click="Cart">
          <v-icon color="white">shopping_cart</v-icon>
        </v-btn>
      </v-badge>
      <v-tooltip bottom v-if="username=='abhyuday'">
        <template v-slot:activator="{ on }">
          <v-btn @click="addData" flat dark v-on="on">
            <v-icon>add_circle</v-icon>
          </v-btn>
        </template>
        <span>add Data</span>
      </v-tooltip>
      <v-tooltip bottom v-if="!username">
        <template v-slot:activator="{ on }">
          <v-btn @click="loadSignup" flat dark v-on="on">
            <v-icon>person_add</v-icon>
          </v-btn>
        </template>
        <span>signup</span>
      </v-tooltip>
      <v-tooltip bottom v-if="!username">
        <template v-slot:activator="{ on }">
          <v-btn @click="loadLogin" flat dark v-on="on">
            <v-icon>input</v-icon>
          </v-btn>
        </template>
        <span>login</span>
      </v-tooltip>
      <v-tooltip bottom v-if="username">
        <template v-slot:activator="{ on }">
          <v-btn @click="logout" flat dark v-on="on">
            <v-icon>keyboard_tab</v-icon>
          </v-btn>
        </template>
        <span>logout</span>
      </v-tooltip>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div
              class="subheading font-italic grey--text text--darken-3 display-1 font-weight-black"
            >{{username}}</div>
            <div class="body-1 font-italic grey--text text--darken-3">{{email}}</div>
          </v-flex>
        </v-layout>
      </v-img>

      <v-list>
        <v-list-tile v-for="link in links" :key="link.name" router :to="link.route" class="ma-3">
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="subheading ma-2 grey--text">{{link.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>


<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { name: "Your Profile", icon: "account_circle", route: "/profile" },
        { name: "Order History", icon: "local_atm", route: "/orderHistory" },
        { name: "About", icon: "info", route: "/about" }
      ]
    };
  },
  computed: {
    color() {
      return this.$store.getters.color;
    },
    username() {
      return this.$store.getters.username;
    },
    avatar() {
      return this.$store.getters.avatar;
    },
    email() {
      return this.$store.getters.email;
    },
    items() {
      console.log("SIZE");

      var size = this.$store.getters.kartSize;
      console.log(size);
      if (size == 0) {
        size = false;
      }
      return size;
    }
  },
  methods: {
    loadSignup() {
      this.$store.commit("changeColor", "blue-grey darken-2");
      this.$router.push("/signup");
    },
    loadLogin() {
      this.$store.commit("changeColor", "blue-grey darken-2");
      this.$router.push("/login");
    },
    logout() {
      this.$store.commit("logOut");
    },
    addData() {
      this.$router.push("/data");
    },
    Cart() {
      this.$router.push("/cart");
    }
  },
  created() {
    console.log(this.$store.getters);
  }
};
</script>

<style>
</style>
