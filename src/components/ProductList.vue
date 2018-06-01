<template>
  <div class="products">
    <b-list-group>
      <div v-for="product in products" >
        <ProductItem v-bind:product="product" v-bind:addToCart="addToCart" />
      </div>
    </b-list-group>
  </div>
</template>

<script>
  import ProductItem from '@/components/ProductItem.vue'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'ProductList',
    components:{
      ProductItem,
    },
    props: {
      products: {
        type: Array,
        required: true,
      },
    },
    methods:{
      ...mapMutations({
        dumpCart: 'dumpCart',
        addToCart: 'addToCart',
        //loadCart: 'loadCart',
      })
    },
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
