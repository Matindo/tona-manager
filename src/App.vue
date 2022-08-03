<template>
  <div id="app">
    <nav-bar />
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transitionName">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
    <foot-bar />
  </div>
</template>

<script>
import FootBar from './components/FootBar.vue'
import NavBar from './components/NavBar.vue'
export default {
  components: { NavBar, FootBar }
}
</script>

<style lang="scss">
#app {
  height: 125vh;
  background-image: url('https://codetheweb.blog/assets/img/posts/style-a-navigation-bar-css/background.jpg');
  background-size: cover;
  font-family: sans-serif;
  color: white;
}
</style>
