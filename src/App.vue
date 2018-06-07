<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <NavBar />
    <router-view/>
    <loading
      :show="communicating">
    </loading>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar.vue'
  import {mapGetters, mapMutations} from 'vuex'
  import loading from 'vue-full-loading'

  export default {
    name: 'App',
    components: {
      NavBar,
      loading,
    },
    computed:{
      ...mapGetters([
      	'communicating',
      ])
    },
    methods:{
      ...mapMutations([
      	'unlock_com'
      ])
    },
    mounted(){
    	this.unlock_com();
    },

  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
