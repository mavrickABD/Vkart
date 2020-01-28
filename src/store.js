import Vue from "vue";
import Vuex from "vuex";
import axios from "./axios-auth";
import Gaxios from "axios";
import router from "./router";
import api_key from "./api_key"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
    color: "blue-grey darken-2",
    key: null
  },

  // ### MUTATIONS ###

  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    newUser(state, userData) {
      state.user = userData;
    },
    logOut(state) {
      state.idToken = null;
      state.userId = null;
      state.user = null;
      localStorage.clear();
      router.push("/");
    },
    userName(state, username) {
      state.user.username = username;
    },
    changeColor(state, color) {
      state.color = color;
    },
    addKey(state, Key) {
      state.key = Key;
    },
    updateTotalCost(state, price) {
      state.user.totalCost += parseInt(price);
    },
    addItemToKart(state, item) {
      state.user.kart.push(item);
    },
    addItemToOrderhistory(state, item) {
      state.user.orderHistory.push(item);
    }
  },

  // ### ACTIONS ###

  actions: {
    signUp({ commit, dispatch }, { formData: authData, cb }) {
      var data = {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      };
      axios
        .post("/signupNewUser?key=" + api_key.api_key, data)
        .then(res => {
          console.log(res);
          localStorage.setItem("token", res.data.idToken); // storing the token in browser data
          localStorage.setItem("userId", res.data.localId); // stroring userID in browser data
          localStorage.setItem("username", authData.username); // stroring username in browser data
          console.log(authData.username);
          commit("authUser", {
            token: res.data.idToken, // idToken property of data object in firebase res object
            userId: res.data.localId //user id by firebase respone .localId
          });
          dispatch("addUser", authData);
          cb();
        })
        .catch(error => console.log(error));
    },

    login({ commit, dispatch }, { formData: authData, cb }) {
      var user = authData.username;
      var data = {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }
    
      axios
        .post("/verifyPassword?key=" + api_key.api_key, data)
        .then(res => {
          localStorage.setItem("token", res.data.idToken); // storing the token in browser data
          localStorage.setItem("userId", res.data.localId); // stroring userID in browser data
          localStorage.setItem("username", user); // storing username
          console.log(authData.username);
          commit("authUser", {
            token: res.data.idToken, // idToken property of data object in firebase res object
            userId: res.data.localId //user id by firebase respone .localId
          });
          dispatch("loadUser", authData.email);
          cb();
        })
        .catch(error => console.log(error));
    },

    addUser({ commit, state }, userData) {
      if (!state.idToken) {
        return;
      }
      Gaxios.post("/users.json" + "?auth=" + state.idToken, userData) //token appended to the http request for auth
        .then(res => {
          console.log(res);
          commit("addKey", res.data.name);
          commit("newUser", userData);
        })
        .catch(error => console.log(error));
    },

    loadUser({ commit, state }, email) {
      if (!state.idToken) {
        return;
      }
      Gaxios.get("/users.json" + "?auth=" + state.idToken)
        .then(res => {
          console.log(res);

          const data = res.data;

          for (let key in data) {
            const user = data[key];

            if (user.email == email) {
              commit("newUser", user);
              commit("addKey", key);
              break;
            }
          }
        })
        .catch(error => console.log(error));
    },

    autoLogin({ commit }) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const username = localStorage.getItem("username");
      if (!token) {
        return;
      } else {
        commit("authUser", {
          token: token,
          userId: userId
        });
        commit("userName", username);
      }
    }
  },

  //GETTERS

  getters: {
    username(state) {
      if (state.user) {
        return state.user.username;
      } else {
        return false;
      }
    },
    avatar(state) {
      if (state.user) {
        return state.user.avatar;
      } else {
        return "https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg";
      }
    },
    color(state) {
      return state.color;
    },
    email(state) {
      if (state.user) {
        return state.user.email;
      } else {
        return false;
      }
    },
    key(state) {
      return state.key;
    },
    totalCost(state) {
      if (state.user) {
        return state.user.totalCost;
      } else {
        return false;
      }
    },
    kartSize(state) {
      if (state.user) {
        return state.user.kart.length - 1;
      } else {
        return false;
      }
    }
  }
});
