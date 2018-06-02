<template>
  <div class="shop">
    <!--//TODO
      //leftside menu
      //topside menu
      //cart
      //item cells-->
    <b-container fluid class="">
      <b-row>
        <b-col>
          <CategoryMenu v-bind:categories="categories" v-on:category-clicked="changeActiveCategory" />
        </b-col>
        <b-col cols="10">
          <ProductList v-bind:products="displayedProducts"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import CategoryMenu from '@/components/CategoryMenu.vue'
  import ProductList from '@/components/ProductList.vue'
  import data from './../../db.js'
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  var categories = [];
  categories = data.categories.map(data => {data.active = false; return data});
  var products = [];

  export default {
    name: 'MainShop',
    components:{
      CategoryMenu,
      ProductList,
    },
    methods: {
      changeActiveCategory: function (categoryId) {
      	if(this.selectedCategory !== categoryId) this.selectCategory(categoryId);
      },
      ...mapMutations({
      }),
      ...mapActions([
        'initCategories',
        'selectCategory',
      ]),
    },
    computed: {
      ...mapGetters({
        displayedProducts: 'displayedProducts',
        categories: 'categories',
        selectedCategory: 'selectedCategory',
      }),
    },
    created(){
    	this.initCategories();
    },
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  b-container, b-row, b-col {
    margin: 0px;
  }


</style>
