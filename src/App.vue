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
  background: url('https://codetheweb.blog/assets/img/posts/style-a-navigation-bar-css/background.jpg') no-repeat center center fixed;
  background-size: cover;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  font-family: sans-serif;
  color: white;
}

.container > .row {
  padding: 2em;
  margin-bottom: 1.5em;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.938);
  box-shadow: 0 0 .5em .2em rgba(0, 0, 0, 0.712);
  color: black;
}

.container > .row:first-child {
  margin-top: 2rem;
}

</style>
