<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <uploadVouchers/>
    <PostCompnent/>
  </div>
</template>

<script>
import PostCompnent from './components/PostComponent.vue'
import uploadVouchers from './components/uploadVouchers.vue'

export default {
  name: 'app',  
  components: {
    PostCompnent,
    uploadVouchers
  }
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
