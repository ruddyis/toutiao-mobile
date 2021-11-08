<template>
  <div class="container">
    <Tabbar></Tabbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Tabbar from '../components/Tabbar'
export default {
  name: 'Container',
  components: {
    Tabbar
  },
  mounted () {
    this.$store.commit('ADD_CACHE_PAGE', 'Container')
  }
}
</script>

<style></style>
