<template>
  <div>
      <h1 class="display-3 grey--text mt-5 text-xs-center" >Categories</h1>
    <v-container >
      <v-layout row wrap justify-center>
        <v-flex xs12 sm6 md4 lg3  ma-3>
          <v-card color="purple lighten-2" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="display-3">Electronics</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark @click="electronics">View now
                <v-icon>label_important</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 ma-3>
          <v-card color="green lighten-2" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="display-3">Household</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark  @click="household">View now
                <v-icon>label_important</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 ma-3>
          <v-card color="pink lighten-2" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="display-3">Fashion</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark  @click="fashion">View now
                <v-icon>label_important</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 ma-3>
          <v-card color="blue lighten-2" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="display-3">Music</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark  @click="music">View now
                <v-icon>label_important</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 ma-3>
          <v-card color="orange lighten-2" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="display-3">Furniture</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark  @click="furniture">View now
                <v-icon>label_important</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6 md4 lg3 ma-3>
          <v-card color="teal lighten-2" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="display-3">Grocery</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark  @click="grocery">View now
                <v-icon>label_important</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  methods:{
    electronics(){
      this.$store.commit("changeColor","purple lighten-2")
      this.$router.push("/Electronics");
    },
      household(){
      this.$store.commit("changeColor","green lighten-2")
      this.$router.push("/Household");
    },
     fashion(){
      this.$store.commit("changeColor","pink lighten-2")
      this.$router.push("/Fashion");
    },
     music(){
      this.$store.commit("changeColor","blue lighten-2")
      this.$router.push("/Music");
    },
     furniture(){
      this.$store.commit("changeColor","orange lighten-2")
      this.$router.push("/Furniture");
    },
     grocery(){
      this.$store.commit("changeColor","teal lighten-2")
      this.$router.push("/Grocery");
    }

  }
};
</script>
