import Vue from "vue";
import VueRouter from "vue-router";
import SignupPage from "./components/auth/signup.vue";
import login from "./components/auth/signin.vue";
import Home from "./components/Home.vue";
import products from "./components/Products.vue";
import Data from "./components/Data.vue";
import Detailproduct from "./components/DetailProd.vue";
import Cart from "./components/Cart.vue";
import Order from "./components/Oreders.vue";
Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/signup", component: SignupPage },
  { path: "/login", component: login },
  { path: "/data", component: Data },
  { path: "/cart", component: Cart },
  { path: "/orderHistory", component: Order },
  {
    path: "/Electronics",
    component: products
  },
  { path: "/Electronics/:id", component: Detailproduct },
  {
    path: "/Household",
    component: products
  },
  { path: "/Household/:id", component: Detailproduct },
  {
    path: "/Fashion",
    component: products
  },
  { path: "/Fashion/:id", component: Detailproduct },
  {
    path: "/Music",
    component: products
  },
  { path: "/Music/:id", component: Detailproduct },
  {
    path: "/Furniture",
    component: products
  },
  { path: "/Furniutre/:id", component: Detailproduct },
  {
    path: "/Grocery",
    component: products
  },
  { path: "/Grocery/:id", component: Detailproduct }
];

export default new VueRouter({ mode: "history", routes });
