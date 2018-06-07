<template>
  <div class="products">
    <table align="center">
      <tr>
        <th>Identyfikator zamówienia</th>
        <th>Przetwarzane</th>
        <th>Ukończone</th>
        <th>Opłacone</th>
        <th>Suma</th>
      </tr>
      <tr v-for="order in orders" >
        <th>{{order.id}}</th>
        <th v-if="order.isBeingProcessed">&#10004;</th>
        <th v-else>&#10006;</th>
        <th v-if="order.isCompleted">&#10004;</th>
        <th v-else>&#10006;</th>
        <th v-if="order.isPaid">&#10004;</th>
        <th v-else>&#10006;</th>
        <th>{{order.sum}} zł</th>
      </tr>
    </table>
  </div>
</template>

<script>
  import ProductItem from '@/components/ProductItem.vue'
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    name: 'OrderHistory',
    components:{
      ProductItem,
    },
    methods:{
      ...mapActions([
      	'fetchOrderHistory'
      ]),
      orderSum(order){
        return Math.round(
          order.productsList
            .map(e => e.price * e.quantity)
            .reduce((a, b) => a + b, 0)
          * 100
        ) / 100;
      },
    },
    async mounted(){
    	let historyResponse = await this.fetchOrderHistory()
      console.log(historyResponse);
    	if (historyResponse.success === false){
    		this.$router.push('/');
    		orders = [];
    		return;
      }
      this.orders = historyResponse.orders;
    	console.log(this.orders);
      this.orders.forEach( order => order.sum = this.orderSum(order))
    },
    data () {
      return {
      	orders: [],
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table{
  display: table;
  width: 50%;
  table-layout: fixed;
}
th,td {
  display: table-cell;
  border: 1px dotted red;
  padding: 4px 6px;
  width: 2%;
  margin-bottom: 0;
}
</style>
