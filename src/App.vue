<template>
  <div id="app">
    <nav-bar @signInUser="login" @searchTournament="search" />
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transitionName">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
    <foot-bar />
    <b-modal centered id="loginModal" hide-footer hide-header>
      <b-form id="login-form" @submit.prevent="signIn">
        <b-form-fieldset label="E-mail">
          <b-input type="email" v-model="credentials.email" autocomplete placeholder="email@example.com" required />
        </b-form-fieldset>
        <b-form-fieldset label="Password">
          <b-input type="password" v-model="credentials.pword" autocomplete required />
        </b-form-fieldset>
        <div class="form-footer">
          <b-button variant="outline-primary" pill size="sm" type="submit">SIGN iN</b-button>
          <b-button variant="outline-secondary" pill size="sm" @click="$bvModal.hide('loginModal')">CANCEL</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import FootBar from './components/FootBar.vue'
import NavBar from './components/NavBar.vue'

export default {
  components: { NavBar, FootBar },
  data: function () {
    return {
      credentials: { email: '', pword: '' }
    }
  },
  methods: {
    search: function (searchQuery) {
      // handle search here
    },
    login: function () {
      this.$bvModal.show('loginModal')
    },
    signIn: function () {
      // do somn
    }
  },
  beforeMount: async function () {
    await this.$store.dispatch('INITIALIZE')
  },
  beforeDestroy: async function () {
    await this.$store.dispatch('TERMINATE')
  }
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
  transition: all .1s linear;
  width: 100dvw;
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

#login-form{
  padding: 1rem 2rem;
  input {
    margin: 0.125rem 0;
    border: none;
    border-bottom: 0.125em hsl(146, 50%, 36%);
    background-color: hsl(208, 100%, 97%);
    &:active {
      border-bottom: 0.19em hsl(146, 90%, 16%);
      color: hsl(0, 7%, 3%);
    }
  }
}

.form-footer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  & > * {
    flex-grow: 1;
    text-align: center;
    margin: 1rem .25rem;
  }
}

</style>
