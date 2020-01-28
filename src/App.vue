<template>
  <div id="app">
    <app-navbar/>
     <v-content>
      <transition enter-active-class="animated fadeInDownBig" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "app",
  components: {
    "app-navbar": Navbar
  },
  created() {
    //this.$store.dispatch("autoLogin");
  }
};
</script>

<style>
body,
html {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>