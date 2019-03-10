<template>
<div id="global page" style ="background-color:rgb(179, 233, 255)">
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
            <hr class="hr-primary" />
    <uploadVouchers/>
            <hr class="hr-primary" />
    <PostCompnent/>
            
  </div>
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

page {
  background-color: rgb(179, 233, 255);
}

</style>
