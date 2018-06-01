<template>
  <div class="categories">
    <b-list-group>
      <div v-for="category in categories">
        <CategoryItem v-bind:category="category" v-on:category-clicked="$emit('category-clicked',category.id)"/>
      </div>
    </b-list-group>
  </div>
</template>

<script>
  import CategoryItem from '@/components/CategoryItem'

  export default {
    name: 'CategoryMenu',
    components:{
      CategoryItem,
    },
    props: {
      categories: {
        type: Array,
        required: true,
      },
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
