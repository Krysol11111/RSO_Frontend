
<template>
    <b-navbar toggleable="md" type="dark" variant="info" fixed="top">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#"><router-link to="/">Sklep</router-link></b-nav-item>
          <b-nav-item href="#"><router-link to="/AboutUs">O Nas</router-link></b-nav-item>
          <b-nav-item href="#"><router-link to="/Contact">Kontakt</router-link></b-nav-item>

        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#" v-if="loggedUser === null"><router-link to="/Login">Login</router-link></b-nav-item>
          <b-nav-text v-if="loggedUser !== null"><div class="reset-color">Witaj <b>{{loggedUser}}</b></div></b-nav-text>
          <b-nav-item v-if="loggedUser !== null"><b-link v-on:click="logout()">Logout</b-link></b-nav-item>
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>Koszyk({{cartCount}})</em>
            </template>
            <b-container style="min-width: 400px;">
              <div v-for="product in cartProducts" >
                <DropdownCartItem v-bind:product="product" v-bind:deleteFromCart="deleteFromCart"/>
              </div>
              <div style="text-align: right;">Suma do zapłaty: {{cartSum}} zł</div>
              <div style="text-align: right;"><router-link to="/Order"><b-button>Zamów</b-button></router-link></div>
            </b-container>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
</template>

<script>
  import data from './../../db.js'
  import {logoutUser} from '@/userAuth.js'
  import CategoryItem from '@/components/CategoryItem'
  import DropdownCartItem from '@/components/DropdownCartItem'
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  var categories = data.categories.map(data => {data.active = false; return data})

  export default {
    name: 'NavBar',
    components:{
      CategoryItem,
      DropdownCartItem,
    },
    computed: {
      ...mapGetters({
        cartProducts: 'cart',
        cartSum: 'cartSum',
        cartCount: 'cartCount',
        loggedUser: 'loggedUser',
      }),
    },
    methods:{
      ...mapMutations({
        dumpCart: 'dumpCart',
        addToCart: 'addToCart',
        deleteFromCart: 'deleteFromCart',
        setLoggedUser: 'setLoggedUser',
      }),
      ...mapActions([
      	'logoutUser'
      ]),
      logout: function(){
        this.logoutUser();
        this.$router.push('/Login');
      },
    },
    data () {
      return {
        categories: categories,
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  b-nav-item-dropdown{
    min-width: 400px !important;
  }
  a, a:link, a:visited, a:hover, a:active, em, .reset-color{
    color: black;
  }

</style>
