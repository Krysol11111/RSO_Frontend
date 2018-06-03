import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import createMutationsSharer from 'vuex-shared-mutations'
import data from '../db.js'
import links from '../servicesLocations.js'
import $ from "jquery";

Vue.use(Vuex);

const INITIAL_STATE = {
  cart: [],
  selectedCategory: null,
  categories: [],
  displayedProducts: [],
  productsPage: 1,
  loggedUser: 'Kappa',
  token: null,
};

const getters = {
  cart: state => state.cart,
  cartSum: state => Math.round(
    state.cart
      .map(e => e.price * e.quantity)
      .reduce((a, b) => a + b, 0)
    * 100
  ) / 100,
  cartCount: state => state.cart
    .map(e => e.quantity)
    .reduce((a, b) => a + b, 0),
  loggedUser: state => state.loggedUser,
  selectedCategory: state => state.selectedCategory,
  displayedProducts: state => state.displayedProducts,
  categories: state => state.categories,
};

//asynchroniczne
const actions = {
  //zapytanie do api
  /*initGame: ({commit}) => {
    return commit('mutationname', parameters)
  }*/
  initCategories: async (context) => {
    let categoriesEndpoint = links.services.products + links.productsQuery.categories;
    var categoriesConfig = {
      /*headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBaWViaDJBRHg5NE41bERyQ21XaGRQLVVldGhaTUdJaE9JWUd5NHQ3aGlVIn0.eyJqdGkiOiI4ZDFmZDdkMi05NDQxLTQ1NzEtYjViNS0yOGUxNWU3NjU4NGMiLCJleHAiOjE1Mjc5NjUxMjgsIm5iZiI6MCwiaWF0IjoxNTI3OTQ3MTI4LCJpc3MiOiJodHRwOi8vMTkyLjE2OC44LjEwODo4MDgwL2F1dGgvcmVhbG1zL3JzbyIsImF1ZCI6InJzby1jbGllbnQiLCJzdWIiOiI5MDRjNjI2ZC00YjZiLTQ2OTQtODdlYS04ZTI1Y2U4MmRjMmUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyc28tY2xpZW50IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiZWM4MjVhZDktNjNjMi00YzlkLTlkM2EtZTg1YzNlNGZlMGVhIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhZG1pbiIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwidmlldy1yZWFsbSIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInByZWZlcnJlZF91c2VybmFtZSI6IndzLWFkbWluIn0.B_GjHh9yx1N7TBN5-k9kagLBSat7Kbr8u32I72eDmND2LWKJUsN15lST9YKyezZKazTawUKJ6DBehvwP5nu4-DfFBKozLBNyffsnpoUzJgwBdCIhk9JC0WpQSmQmi677ChxFWNrMdVWd0Kv8sHrx_WjyS4Zb9XcYZQK71RmNA5lxLAzMoxTYRpPfd6rq6J8y_eiB4ZtWXfgOnN1OyIrZZIbuouE8N0UXHtaZ8I0EWd306KyTwzNNzFl4ShCvTLYn2kphpYSir5OhkMB1SFz7oGL3BaIaESO-Y_bNOMES_atOEsA1e3M60MkkJhobbUAgYJLC96YIVqgTWiQA8PGtIQ',
      }*/
    };
    try {
      let categoriesResponse = await Vue.axios.get(categoriesEndpoint, categoriesConfig);
      console.log(categoriesResponse);
      context.commit('setCategories',categoriesResponse.data);
    }
    catch(e){
      console.log(e);
    }
  },
  selectCategory: async (context,id) => {
    let productsEndpoint = links.services.products + links.productsQuery.products+ "?filter=(categoryId=(eq:"+ id +"))";
    try {
      let productsResponse = await Vue.axios.get(productsEndpoint);
      console.log(productsResponse.data.result);
      let payload = {
        categoryId: id,
        products: productsResponse.data.result,
      };
      context.commit('setProductCategory', payload);
    }
    catch (e) {
      console.log(e);
    }
  },
  logoutUser: async ({commit,dispatch,state}) => {
    token = state.token;
    dispatch('forgetLoggedUser');
    // await call to revoke token
    if (state.token !== null){
      try {
        let logoutEndpoint = links.services.users + links.usersQuery.logout;
        let logoutConfig = {
          headers: {
            Authorization: 'Bearer ' + state.token.token,
            "content-type": "application/json",
            }
        };
        console.log(logoutConfig);
        await Vue.axios.post(logoutEndpoint, {kappa: "kappa"},logoutConfig);
      }catch (e){
        console.log(e);
      }
    }
    console.log("Logging Out")
    alert("Wylogowano!");
  },
  loginUser: async ({commit}, creds) => {
    try {
      console.log(creds);
      let loginEndpoint = links.services.users + links.usersQuery.login;

      let loginData = {
        username: creds.username,
        password: creds.password,
      };
      // await call for token
      let loginResponse = await Vue.axios.post(loginEndpoint, loginData);
      console.log(loginResponse);
      // set token from response
      commit('setToken',loginResponse.data);
      // set username from token
      commit('setLoggedUser',loginData.username);
      alert("Zalogowano");
    }
    catch(e){
      console.log(e);
      dispatch('forgetLoggedUser');
      alert("Błąd logowania!");
    }
  },
  refreshToken: async ({commit,dispatch,state}) => {
    try {
      let refreshEndpoint = links.services.users + links.usersQuery.refreshToken;
      let refreshData = {
        refreshToken: state.token.refreshToken,
      };
      // await call for refreshedtoken
      let refreshResponse = await Vue.axios.post(refreshEndpoint, refreshData);
      console.log(refreshResponse);
      // set token from response
      commit('setToken',refreshResponse.data);
    }
    catch(e){
      console.log(e);
      dispatch('forgetLoggedUser');
    }
  },
  forgetLoggedUser:  ({commit,state}) => {
    commit('setToken',null);
    commit('setLoggedUser',null);
  }
};

//synchroniczne
const mutations = {
  dumpCart: (state) => {
    state.cart = [];
  },
  addToCart: (state, product) => {
    console.log(product.id);
    var productInCart = state.cart.find(e => e.id === product.id);
    if (productInCart !== undefined){
      productInCart.quantity += product.quantity;
    }
    else {
      state.cart.push(product);
    }
  },
  deleteFromCart: (state, id) => {
    state.cart = state.cart.filter(e => e.id !== id);
  },
  setLoggedUser: (state, username) => {
    state.loggedUser = username;
  },
  setProductCategory: (state, payload) => {
    state.selectedCategory = payload.categoryId;
    //call to get products
    state.displayedProducts = payload.products;
  },
  setCategories: (state,cats) => {
    state.categories = cats;
    state.selectedCategory = null;
    state.displayedProducts = [];
  },
  setToken: (state,token) => {
    state.token = token;
  }
};

export default new Vuex.Store({
  getters,
  actions,
  mutations,
  state: INITIAL_STATE,
  plugins: [
    createPersistedState(),
    createMutationsSharer({ predicate: ['dumpCart', 'addToCart','deleteFromCart','setLoggedUser'] }),
  ]
});
