<template>
  <div class="order">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div v-for="item in cartProducts">
        <div class="container py-1">
          <div class="card">
            <div class="row ">
              <div class="col-md-2">
                <img v-bind:src="item.imagePath"  class="w-100 item-picture">
              </div>
              <div class="col-md-4 description">
                <div class="card-block">
                  <h4 class="card-title">{{item.name}}</h4>
                  <p class="card-text">{{item.description}}</p>
                </div>
              </div>
              <div class="col-md-4 centered">
                Ilość: {{item.quantity}}
              </div>
              <div class="col-md-2 centered">
                <button class="btn" v-on:click="deleteFromCart(item.id)"><i class="fa fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="total">
      Suma do zapłaty: {{cartSum}} zł
    </div>
    <div id="consentForm">
      <b-form @submit="orderCart" class="login-form">
        <b-form-group id="orderConfirmationGroup">
          <b-form-checkbox id="orderConfirmation" class="checkbox-labeled"
                           type="checkbox"
                           v-model="orderForm.confirmation"
                           :state="!$v.orderForm.confirmation.$invalid">
            Potwierdzam, że chcę zamówić dokładnie to co znajduje się w koszyku i z pewnością zapłacę, tak mi dopomóż Bóg
          </b-form-checkbox>
        </b-form-group>
        <b-button type="submit"
                  variant="primary"
                  :disabled="$v.orderForm.$invalid">
          Zamów
        </b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import { required, minLength, sameAs, email } from "vuelidate/lib/validators"

  export default {
    name: 'Order',
    data () {
      return {
        loremIpsum: "abc",
        orderForm: {},
      }
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
      }),
      ...mapActions([
      	'makeOrder'
      ]),
      async orderCart(){
      	if (this.cartCount === 0){
      		alert("Nie można utworzyć zamówienia z pustego koszyka");
      		return;
        }
        this.makeOrder();
      }
    },
    validations: {
      orderForm: {
        confirmation:{
        	checked: (value) => {return value===true},
        },
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btn {
    background-color: DodgerBlue; /* Blue background */
    border: none; /* Remove borders */
    color: white; /* White text */
    padding: 12px 16px; /* Some padding */
    font-size: 16px; /* Set a font size */
    cursor: pointer; /* Mouse pointer on hover */
  }
  .btn:hover {
    background-color: RoyalBlue;
  }
  .centered {
    margin: auto;
  }

</style>
