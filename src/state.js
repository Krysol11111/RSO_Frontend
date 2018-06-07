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
  currentProductPage: 1,
  productsPerPage: 5,
  productsPage: 1,
  loggedUser: null,
  token: null,
  communicating: false,
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
  displayedProducts: state => state.displayedProducts.map((e) => {
    var product = JSON.parse(JSON.stringify(e));
    product.maxQuantity = product.quantity;
    let cartProduct = state.cart.find(e => e.id === product.id);
    if (cartProduct !== undefined)
      product.quantity = product.quantity - cartProduct.quantity;
    return product;
  }),
  currentProductPage: state => state.currentProductPage,
  prevPageExists: state => state.currentProductPage > 1,
  nextPageExists: state => state.displayedProducts.length == state.productsPerPage,
  categories: state => state.categories,
  communicating: state => state.communicating,

};

//asynchroniczne
const actions = {
  initCategories: async ({commit, state}) => {
    //show loading wheel while communicating. Not meant as mutex - possible race states are handled by services.
    //loading wheel is supposed to show the client that communication is underway.
    if (state.communicating === true) {
      return;
    }else{
      commit('lock_com');
    }
    let categoriesEndpoint = links.services.products + links.productsQuery.categories;
    var categoriesConfig = {
      /*headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBaWViaDJBRHg5NE41bERyQ21XaGRQLVVldGhaTUdJaE9JWUd5NHQ3aGlVIn0.eyJqdGkiOiI4ZDFmZDdkMi05NDQxLTQ1NzEtYjViNS0yOGUxNWU3NjU4NGMiLCJleHAiOjE1Mjc5NjUxMjgsIm5iZiI6MCwiaWF0IjoxNTI3OTQ3MTI4LCJpc3MiOiJodHRwOi8vMTkyLjE2OC44LjEwODo4MDgwL2F1dGgvcmVhbG1zL3JzbyIsImF1ZCI6InJzby1jbGllbnQiLCJzdWIiOiI5MDRjNjI2ZC00YjZiLTQ2OTQtODdlYS04ZTI1Y2U4MmRjMmUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyc28tY2xpZW50IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiZWM4MjVhZDktNjNjMi00YzlkLTlkM2EtZTg1YzNlNGZlMGVhIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhZG1pbiIsInVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwidmlldy1yZWFsbSIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInByZWZlcnJlZF91c2VybmFtZSI6IndzLWFkbWluIn0.B_GjHh9yx1N7TBN5-k9kagLBSat7Kbr8u32I72eDmND2LWKJUsN15lST9YKyezZKazTawUKJ6DBehvwP5nu4-DfFBKozLBNyffsnpoUzJgwBdCIhk9JC0WpQSmQmi677ChxFWNrMdVWd0Kv8sHrx_WjyS4Zb9XcYZQK71RmNA5lxLAzMoxTYRpPfd6rq6J8y_eiB4ZtWXfgOnN1OyIrZZIbuouE8N0UXHtaZ8I0EWd306KyTwzNNzFl4ShCvTLYn2kphpYSir5OhkMB1SFz7oGL3BaIaESO-Y_bNOMES_atOEsA1e3M60MkkJhobbUAgYJLC96YIVqgTWiQA8PGtIQ',
      }*/
    };
    try {
      let categoriesResponse = await Vue.axios.get(categoriesEndpoint, categoriesConfig);
      console.log(categoriesResponse);
      commit('setCategories',categoriesResponse.data);
    }
    catch(e){
      console.log(e);
    }
    commit('unlock_com');
  },
  selectCategory: async ({commit,state},id) => {
    if (state.communicating === true) {
      return;
    }else{
      commit('lock_com');
    }
    let productsEndpoint = links.services.products + links.productsQuery.products+ "?filter=(categoryId=(eq:"+ id +"))&page=(0,"+ state.productsPerPage + ")";
    try {
      let productsResponse = await Vue.axios.get(productsEndpoint);
      console.log(productsResponse.data.result);
      let payload = {
        categoryId: id,
        products: productsResponse.data.result,
        page: 1,
      };
      commit('setDisplayedProducts', payload);
    }
    catch (e) {
      console.log(e);
    }
    commit('unlock_com');
  },
  changePage: async ({commit,state},count) => {
    if (count === 0) return;
    if (state.communicating === true) {
      return;
    }else{
      commit('lock_com');
    }
    var lesser,greater;

      lesser = (state.currentProductPage+count-1) * state.productsPerPage;
      greater = (state.currentProductPage+count) * state.productsPerPage;
    if (count < 0) [lesser,greater] = [greater,lesser];
    let productsEndpoint = links.services.products + links.productsQuery.products+ "?filter=(categoryId=(eq:"+ state.selectedCategory +"))&page=("+lesser+","+ greater + ")";
    try {
      let productsResponse = await Vue.axios.get(productsEndpoint);
      console.log(productsResponse.data.result);
      let payload = {
        products: productsResponse.data.result,
        page: state.currentProductPage+count,
      };
      commit('setDisplayedProducts', payload);
    }
    catch (e) {
      console.log(e);
    }
    commit('unlock_com');
  },
  logoutUser: async ({commit,dispatch,state}) => {
    if (state.communicating === true) {
      return;
    }else{
      commit('lock_com');
    }
    let token = state.token;
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
        await Vue.axios.post(logoutEndpoint, {},logoutConfig);
      }catch (e){
        console.log(e);
      }
    }
    await dispatch('forgetLoggedUser');
    console.log("Logging Out");
    window.alert("Wylogowano!");
    commit('unlock_com');

  },
  loginUser: async ({commit, dispatch, state}, creds) => {
    if (state.communicating === true) {
      return;
    }else{
      commit('lock_com');
    }
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
      await dispatch('forgetLoggedUser');
      alert("Błąd logowania!");
    }
    commit('unlock_com');
  },
  registerUser: async ({commit,state}, creds) => {
    if (state.communicating === true) {
      return;
    }else{
      commit('lock_com');
    }
    try {
      console.log(creds);
      let registerEndpoint = links.services.users + links.usersQuery.register;
      let registerData = {
        user: {
          username: creds.username,
          firstName: creds.firstName,
          lastName: creds.lastName,
          email: creds.email,
        },
        password: creds.password,
      };
      // await call for token
      let registerResponse = await Vue.axios.post(registerEndpoint, registerData);
      console.log(registerResponse);
      alert("Zarejestrowano!");
    }
    catch(e){
      console.log(e);
      alert("Błąd rejestracji!");
    }
    commit('unlock_com');
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
      await dispatch('forgetLoggedUser');
      alert("Błąd odświerzania tokena");
    }
  },
  forgetLoggedUser:  ({commit,state}) => {
    commit('setToken',null);
    commit('setLoggedUser',null);
  },
  makeOrder: async ({commit,state,dispatch}) => {
    if (state.communicating === true) {
      return;
    }else{
      commit('lock_com');
    }
    //check login and send cart to backend
    if (state.cartCount < 1 ){
      alert("Koszyk jest pusty!");
      return;
    }
    if (state.loggedUser !== null && state.token !== null){
      // send cart to backend and if successful -> dumpCart from state
      try{
        let makeOrderEndpoint = links.services.orders + links.ordersQuery.createOrder;
        let orderData = {
          productsList: state.cart.map((item) => {
            return {
              productId: item.id,
              price: item.price,
              quantity: item.quantity,
            }
          })
        };
        let orderConfig = {
          headers: {
            Authorization: 'Bearer ' + state.token.token,
          }
        };
        console.log(orderData.productList);
        var response = await Vue.axios.post(makeOrderEndpoint,orderData,orderConfig);
        if (response.status === 200) {
          commit('dumpCart');
          alert("Zamówienie dodano pomyślnie");
        }
        else{
          alert("Błąd w dodawaniu zamówienia - brakujące lub nieprawidłowe dane bądź niewystarczający zapas w magazynie do realizacji zamówienia");
        }
        await dispatch('refreshToken');
      }catch(e){
        await dispatch('forgetLoggedUser');
        alert("Błąd autoryzacji - zaloguj się i spróbuj ponownie");
      }
    }
    else{
      await dispatch('forgetLoggedUser');
      alert("Do utworzenia zamówienia potrzeba najpierw się zalogować!!!");
    }
    commit('unlock_com');
  },
  fetchOrderHistory: async ({commit,state,dispatch}) => {
    if (state.communicating === true) {
      return;
    }else{
      commit('lock_com');
    }
    var success = false;
    var orders = [];
    if (state.loggedUser !== null && state.token !== null){
      try{
        let fetchOrderHistoryEndpoint = links.services.orders + links.ordersQuery.fetchOrders;
        let orderConfig = {
          headers: {
            Authorization: 'Bearer ' + state.token.token,
          }
        };
        var response = await Vue.axios.get(fetchOrderHistoryEndpoint,orderConfig);
        if (response.status === 200) {
          success = true;
          console.log(response.data);
          orders = response.data;
        }
        else{
          alert("Błąd pobierania zamówień");
        }
        await dispatch('refreshToken');
      }catch(e){
        await dispatch('forgetLoggedUser');
        alert("Błąd autoryzacji - zaloguj się i spróbuj ponownie");
      }
    }
    else{
      await dispatch('forgetLoggedUser');
      alert("Tylko zalogowani użytkownicy mogą oglądać swoje zamówienia");
    }
    commit('unlock_com');
    return {
      success: success,
      orders: orders,
    };
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
  setDisplayedProducts: (state, payload) => {
    if (payload.categoryId !== undefined) {
      state.selectedCategory = payload.categoryId;
    }
    state.displayedProducts = payload.products;
    state.currentPage = payload.page;
  },
  setCategories: (state,cats) => {
    state.categories = cats;
    state.selectedCategory = null;
    state.displayedProducts = [];
  },
  setToken: (state,token) => {
    state.token = token;
  },
  lock_com: (state) => {
    state.communicating = true;
  },
  unlock_com: (state) => {
    state.communicating = false;
  }
};

export default new Vuex.Store({
  getters,
  actions,
  mutations,
  state: INITIAL_STATE,
  plugins: [
    createPersistedState(),
    createMutationsSharer({ predicate: ['dumpCart', 'addToCart','deleteFromCart','setLoggedUser','setToken'] }),
  ]
});
