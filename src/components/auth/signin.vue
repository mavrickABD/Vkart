<template>
  <div id="login" class="mt-5">
    <h1 class="display-3 grey--text mt-5 text-xs-center">Login</h1>
    <v-container grid-list-lg>
      <v-layout row justify-center wrap>
        <v-flex xs6 lg6 md6>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-btn
              :disabled="!valid"
              depressed
              color="green lighten-1"
              @click="validate"
              class="white--text font-weight-bold"
              large
            >Login</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    show1: false,
    password: "",
    valid: true,
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    rules: {
      required: value => !!value || "Required.",

      emailMatch: () => "The email and password you entered don't match"
    }
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const formData = {
          email: this.email,
          password: this.password
        };
        console.log(formData);
        this.$store.dispatch("login", {formData, cb: this.$router.push('/')});
      }
    }
  }
};
</script>

<style scoped>
</style>