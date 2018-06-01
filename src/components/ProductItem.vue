<template>
  <div class="productItem">
    <div class="container py-3">
      <div class="card">
        <div class="row ">
          <div class="col-md-4">
            <img v-bind:src="product.imagePath"  class="w-100 item-picture">
          </div>
          <div class="col-md-8 px-3 description">
            <div class="card-block px-3">
              <h4 class="card-title">{{product.name}}</h4>
              <p class="card-text">{{product.description}}</p>
            </div>
            <form>
              Cena za sztukę: {{product.price}} zł
              <input v-model.number="quantity" type="number" class="form-control" id="inputQuantity" placeholder="1" min="1" v-bind:max="product.quantity">
              <div class="form-group row">
                <div class="col-sm-10">
                  <button type="addToCart" class="btn btn-primary" v-on:click="addToCartOnClick">Dodaj do Koszyka</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var quantity = 1;
  export default {
    name: 'ProductItem',
    props: {
      product: {
        type: Object,
        required: true,
      },
      addToCart:{
        required: true,
      }
    },
    methods: {
      addToCartOnClick: function() {
        var addedProduct = JSON.parse(JSON.stringify(this.product));
        addedProduct.quantity = this.quantity;
        this.addToCart(addedProduct);
      }
    },
    data () {
      return {
      	quantity: quantity,
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item-picture{
    height: 100%
  }
  .description{
    padding-bottom:150px;
  }
  form{
    position:absolute;
    bottom:0;
  }
  #inputQuantity{
    width:100px;
  }
  p, h4{
    text-align: left;
  }
</style>
