<template>
  <nav>
    <ul class="menu">
      <li class="logo"><router-link to="/"><h1>Tona-Manager</h1></router-link></li>
      <li class="item" :class="{ active: toggle }"><router-link to="/">Home</router-link></li>
      <li class="item" :class="{ active: toggle }"><router-link to="/games">Tournaments</router-link></li>
      <li class="item" :class="{ active: toggle }"><router-link to="/events">Events</router-link></li>
      <li class="item" :class="{ active: toggle }"><router-link to="/team">The Team</router-link></li>
      <li class="item button" :class="{ active: toggle }"><router-link to="/login">Log-in</router-link></li>
      <li class="item button secondary" :class="{ active: toggle }"><router-link to="/about">About Us</router-link></li>
      <li class="toggle" @click="toggleMenu()"><span class="bars"></span></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data: function () {
    return {
      toggle: false
    }
  },
  methods: {
    toggleMenu: function () {
      this.toggle = !this.toggle
    }
  }
}
</script>

<style scoped lang="scss">
nav {
  display: inline-block;
  background-color:antiquewhite;
  height: fit-content;
  width: 100vw;
  box-shadow: 0 0 2rem 0 black;
  font-size: larger;
  ul {
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    transition: all .5s;
    li.logo {
      margin-right: auto;
      margin-left: 2rem;
    }
    li {
      margin: .7em;
    }
    li a {
      text-decoration: none;
      color: black;
      position: relative;
      transition: all ease-in-out .4s;
      display: block;
    }
    li.item a::after {
      content: '';
      position: absolute;
      display: block;
      height: .4em;
      width: 0%;
      background-color: blueviolet;
      transition: all ease-in-out .4s;
    }
    li a:hover {
      color: blueviolet;
    }
    li a:not(:hover) {
      transition: all ease-in-out .01s;
    }
    li.item a:hover::after {
      width: 100%;
    }
    li.item a:not(:hover)::after {
      transition: all ease-in-out .01s;
    }
  }
}

.toggle {
  margin-left: 1rem;
  cursor: pointer;
}

.item {
  text-align: center;
}

.item.active {
  display: block;
}

.bars, .bars::before, .bars::after {
  display: none;
  background: rgb(32, 32, 32);
  height: 2px;
  width: 1.2em;
  position: relative;
}

.bars::before, .bars::after {
  content: "";
  position: absolute;
}

.bars::before {
  top: 6px;
}

.bars::after {
  top: -6px;
}

/* Mobile menu */
@media all and (max-width: 500px) {
  nav {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      li {
        margin: 0.4em;
      }
      li.logo {
        margin-left: 0;
      }
    }
  }

  .toggle {
    order: 1;
  }

  .bars, .bars::before, .bars::after {
    display: inline-block;
  }

  .item {
    width: 100%;
    order: 3;
    display: none;
  }

  .item.button {
    order: 2;
  }

  .item.active {
    display: block;
  }

  .button.secondary {
    border-bottom: #999 solid 2px;
  }
}

/* Tablet Menu */
@media all and (min-width: 501px) and (max-width: 940px) {
  nav {
    ul {
      flex-wrap: wrap;
      justify-content: center;
      li.item {
        margin: 0.1em;
      }
      li.logo {
        flex: 1;
        margin-left: 0;
        margin-right: 2px;
      }
      li.item.button a::after {
        display: none;
      }
      li.toggle {
        margin: .1em;
      }
    }
  }

  .item {
    width: 100%;
    order: 3;
    display: none;
  }

  .item.button {
    order: 1;
    width: auto;
    display: block;
  }

  .bars, .bars::before, .bars::after {
    display: inline-block;
  }

  .toggle {
    order: 2;
  }

  .button a {
    padding: 2px 7px;
    background: teal;
    border: 1px solid teal;
    border-radius: 5px;
  }
}
</style>
