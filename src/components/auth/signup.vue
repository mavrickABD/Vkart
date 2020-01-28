<template>
  <div id="signup" class="mt-5">
    <h1 class="display-3 grey--text mt-5 text-xs-center">Signup</h1>
    <v-container>
      <v-layout row justify-center>
        <v-flex xs6>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Username" required></v-text-field>

            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field v-model="avatar" label="Avatar URL" required></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 6 characters"
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
            >Signup</v-btn>
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
    avatar:
      "https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg",
    valid: true,
    name: "",
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
      min: v => v.length >= 6 || "Min 6 characters",
      emailMatch: () => "The email and password you entered don't match"
    }
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const formData = {
          email: this.email,
          username: this.name,
          avatar: this.avatar,
          password: this.password,
          kart: [""],
          orderHistory: [""],
          totalCost: 0
        };
        console.log(formData);
        this.$store.dispatch("signUp", {
          formData,
          cb: () => this.$router.push("/")
        });
      }
    }
  }
};
</script>
