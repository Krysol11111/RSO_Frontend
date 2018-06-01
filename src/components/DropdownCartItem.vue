<template>
    <b-row>
      <b-col class="name-col">
        {{product.name}}
      </b-col>
      <b-col class="quantity-col">
        {{product.quantity}}
      </b-col>
      <b-col class="price-col">
        {{product.price * product.quantity}}zł
      </b-col>
      <b-col>
        <b-button v-on:click="deleteFromCartClick">Usuń</b-button>
      </b-col>
    </b-row>
</template>

<script>
  export default {
    name: 'ProductItem',
    props: {
      product: {
        type: Object,
        required: true,
      },
      deleteFromCart:{
        required: true,
      }
    },
    methods: {
      deleteFromCartClick: function() {
        this.deleteFromCart(this.product.id);
      }
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
