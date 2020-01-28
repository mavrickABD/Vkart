<template>
  <div id="signup" class="mt-5">
    <h1 class="display-3 grey--text mt-5 text-xs-center">Add Data</h1>
    <v-container class="mt-2">
      <v-layout row justify-center>
        <v-flex xs6>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :rules="[rules.required]" label="Product Name" required></v-text-field>
            <v-text-field v-model="price" :rules="[rules.required]" label="Product Price" required></v-text-field>
            <v-text-field v-model="desc" :rules="[rules.required]" label="Description" required></v-text-field>
            <v-text-field v-model="image" :rules="[rules.required]" label="Image URL" required></v-text-field>
            <v-text-field v-model="rating" :rules="[rules.required]" label="Rating" required></v-text-field>
            <v-select
              :items="categories"
              label="Select Category"
              outline
              v-model="selectedCategory"
            ></v-select>
            <v-btn
              :disabled="!valid"
              depressed
              color="green lighten-1"
              @click="validate"
              class="white--text font-weight-bold"
              large
            >Submit</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Gaxios from "axios";
export default {
  data: () => ({
    image: "",
    valid: true,
    name: "",
    price: "",
    desc: "",
    rating: "",
    rules: {
      required: value => !!value || "Required."
    },
    categories: [
      "Electronics",
      "Household",
      "Fashion",
      "Music",
      "Furniture",
      "Grocery"
    ],
    selectedCategory: ""
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const productData = {
          name: this.name,
          imageUrl: this.image,
          description: this.desc,
          price: this.price,
          rating: this.rating,
          category: this.selectedCategory
        };

        Gaxios.post("/" + this.selectedCategory + ".json", productData).then(
          (this.image = ""),
          (this.desc = ""),
          (this.name = ""),
          (this.price = "")((this.rating = ""))
        );
      }
    }
  }
};
</script>
