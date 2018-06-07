<template>
  <div class="shop">
    <b-container fluid class="">
      <b-row>
        <b-col>
          <CategoryMenu v-bind:categories="categories" v-on:category-clicked="changeActiveCategory" />
        </b-col>
        <b-col cols="10">
          <ProductList v-bind:products="displayedProducts"/>
          <div class="page-menu">
            <b-button class="minsize" :disabled="!prevPageExists ? '' : disabled">Wstecz</b-button>
            <div class="page-number">Aktualna strona: {{currentProductPage}}</div>
            <b-button class="minsize" :disabled="!nextPageExists ? '' : disabled">Dalej</b-button>
          </div>
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
        currentProductPage: 'currentProductPage',
        prevPageExists: 'prevPageExists',
        nextPageExists: 'nextPageExists',
      }),
    },
    mounted(){
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
  .page-menu{
    display:flex;
    align: center;
    justify-content: center;
  }
  .page-number {
    margin-left: 30px;
    margin-right: 30px;
  }
  .minsize{
    min-width:100px
  }

</style>
