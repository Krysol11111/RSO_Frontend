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
  loggedUser: 'Krzysztof',
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
};

//asynchroniczne
const actions = {
  //zapytanie do api
  /*initGame: ({commit}) => {
    return commit('mutationname', parameters)
  }*/
  initCategories: async () => {
    /*let payload = {
      grant_type: "password",
      client_id: "rso-client",
      client_secret: "3d3ec54d-29fc-4f40-b265-36bcb200b794",
      username: "ws-admin",
      password: "ws-admin",
    };
    console.log(await Vue.axios.post(
      "http://192.168.8.108:8080/auth/realms/rso/protocol/openid-connect/token",
      payload,
      {
        emulateJSON: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    ));*/
    let categoriesEndpoint = links.services.products + links.productsQuery.categories;
    var categoriesConfig = {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBaWViaDJBRHg5NE41bERyQ21XaGRQLVVldGhaTUdJaE9JWUd5NHQ3aGlVIn0.eyJqdGkiOiIxZDEwNzVmMC0yNmIzLTRlZTMtYjgzNy1mODZmNWRkY2UwYWQiLCJleHAiOjE1Mjc5NTYyMzMsIm5iZiI6MCwiaWF0IjoxNTI3OTM4MjMzLCJpc3MiOiJodHRwOi8vMTkyLjE2OC44LjEwODo4MDgwL2F1dGgvcmVhbG1zL3JzbyIsImF1ZCI6InJzby1jbGllbnQiLCJzdWIiOiI5MDRjNjI2ZC00YjZiLTQ2OTQtODdlYS04ZTI1Y2U4MmRjMmUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyc28tY2xpZW50IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiNGM4NjAyNjUtODQzMS00MzlkLTg3N2MtODg0M2JlNzM0ODEwIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhZG1pbiIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwidmlldy1yZWFsbSIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInByZWZlcnJlZF91c2VybmFtZSI6IndzLWFkbWluIn0.IWs1sak7WgvtLSpRrAXxblGYfe6vbOiP7l-LXeJmgdKXnwPqU0CXNsdJ20kfH6l7CVXgKCSCAk-L8MMeqg92itnbYKYuxdLcC4FejUAeI7qfP1YoX3lzTymK-ST2jVtDjeGM4PhU1D2lrYeT0HnERKvYp9OMoVcMWlzJl7H9jCax1c647TiZn305XZUZswTRpzU9TvMo4RZ-gzs5McXnOt2RPxLRUJJ9msZmeMvru0xkctxGUqc1d9RERzcJHdaqnKqxyp2p2oh_y60P3sKBVI366Cchv4eUfbx3QVt2k-_obCr0orbb4cpwY8V80A2xoS-9AX5eFvz3GYb5zbFcSw',
      }
    };
    console.log(categoriesConfig);
    console.log({headers: {
      Authorization: "Bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBaWViaDJBRHg5NE41bERyQ21XaGRQLVVldGhaTUdJaE9JWUd5NHQ3aGlVIn0.eyJqdGkiOiIxZDEwNzVmMC0yNmIzLTRlZTMtYjgzNy1mODZmNWRkY2UwYWQiLCJleHAiOjE1Mjc5NTYyMzMsIm5iZiI6MCwiaWF0IjoxNTI3OTM4MjMzLCJpc3MiOiJodHRwOi8vMTkyLjE2OC44LjEwODo4MDgwL2F1dGgvcmVhbG1zL3JzbyIsImF1ZCI6InJzby1jbGllbnQiLCJzdWIiOiI5MDRjNjI2ZC00YjZiLTQ2OTQtODdlYS04ZTI1Y2U4MmRjMmUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyc28tY2xpZW50IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiNGM4NjAyNjUtODQzMS00MzlkLTg3N2MtODg0M2JlNzM0ODEwIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhZG1pbiIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwidmlldy1yZWFsbSIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInByZWZlcnJlZF91c2VybmFtZSI6IndzLWFkbWluIn0.IWs1sak7WgvtLSpRrAXxblGYfe6vbOiP7l-LXeJmgdKXnwPqU0CXNsdJ20kfH6l7CVXgKCSCAk-L8MMeqg92itnbYKYuxdLcC4FejUAeI7qfP1YoX3lzTymK-ST2jVtDjeGM4PhU1D2lrYeT0HnERKvYp9OMoVcMWlzJl7H9jCax1c647TiZn305XZUZswTRpzU9TvMo4RZ-gzs5McXnOt2RPxLRUJJ9msZmeMvru0xkctxGUqc1d9RERzcJHdaqnKqxyp2p2oh_y60P3sKBVI366Cchv4eUfbx3QVt2k-_obCr0orbb4cpwY8V80A2xoS-9AX5eFvz3GYb5zbFcSw"
      }});
    let categoriesResponse = await Vue.axios.get(categoriesEndpoint,categoriesConfig);
    //console.log(categoriesResponse);

  },
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
  setProductCategory: (state, id) => {
    state.selectedCategory = id;
    //call to get products
    state.displayedProducts = data.products(id);
  },
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
