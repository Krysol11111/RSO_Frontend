<template>
  <div class="categoryItem">
    <b-list-group-item v-bind:class="{'active': category.id === selectedCategory}" v-on:click="$emit('category-clicked',category.id)">
      {{category.name}}
    </b-list-group-item>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'CategoryItem',
    props: {
      category: {
        type: Object,
        required: true,
      },
    },
    computed: {
      ...mapGetters({
        selectedCategory: 'selectedCategory',
      }),
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
