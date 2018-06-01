import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import createMutationsSharer from 'vuex-shared-mutations'
import data from '../db.js'

Vue.use(Vuex);

const INITIAL_STATE = {
  cart: [],
  selectedCategory: null,
  displayedProducts: [],
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
