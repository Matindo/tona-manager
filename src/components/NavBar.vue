<template>
  <b-navbar toggleable="lg" type="dark" variant="info" :key="user.live">
    <b-navbar-brand to="/">Tona-Manager</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="m-auto">
        <b-nav-item to="/home" exact exact-active-class="active">
          <span class="icon"><b-icon icon="house"></b-icon></span>
          <span class="text">Home</span>
        </b-nav-item>
        <b-nav-item to="/events" exact exact-active-class="active">
          <span class="icon"><b-icon icon="scroll"></b-icon></span>
          <span class="text">Events & Tournaments</span>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-form @submit.prevent="search">
          <b-form-input size="sm" class="mr-sm-1" placeholder="find tournament" v-model="searchQuery" type="text"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0 mr-2" type="submit">
            <b-icon icon="search"></b-icon>
          </b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <template #button-content>
            <span class="profile">
              <b-icon icon="person" v-if="!user.live"></b-icon>
              <b-avatar src="user.dpic" v-else rounded></b-avatar>
              {{ user.live ? user.fName : 'Account' }}
            </span>
          </template>
          <b-dropdown-item to="/account">{{ user.live ? 'Profile' : 'Register' }}</b-dropdown-item>
          <b-dropdown-item @click="loginOut">{{ user.live ? 'Sign Out' : 'Sign In' }}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavBar',
  data: function () {
    return {
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'USER'
    })
  },
  methods: {
    loginOut: function () {
      if (!this.user.live) {
        this.$emit('signInUser')
      } else {
        this.$store.dispatch('SIGNOUT_USER')
      }
    },
    search: function () {
      if (this.searchQuery === '') {
        return
      }
      this.$emit('searchTournament', this.searchQuery)
    }
  }
}
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
a {
  color: white;
  text-decoration: none;
  position: relative;
  transition: all ease-in-out .3s;
  &:hover {
    color: white;
    text-decoration: none;
  }
  &:not(:hover) {
    transition: all ease-in-out .02s;
  }
}
.navbar button:not(.navbar-toggler) {
  background-color: hsl(180, 100%, 97%);
  color: hsl(0, 6%, 6%);
  border: none;
  transition: all .25s ease;
  &:hover {
    background-color: hsl(0, 0%, 36%);
    color: hsl(180, 100%, 97%);
  }
}
//Tablet menu style //
@media all and (max-width: 900px) {
  .nav-item {
    text-align: center;
    margin-block: .35em;
    & > * {
      display: block;
    }
  }
  .form-inline {
    flex-wrap: nowrap;
    width: auto;
    margin-inline: auto;
    margin-block-start: .7rem;
  }
  .navbar-nav:has(.form-inline) {
    border-block-start: groove aliceblue .025rem;
  }
  .dropdown-menu {
    text-align: center !important;
  }
}

@media all and (max-width: 600px) {
  .text {
    display: none;
  }
}
</style>
