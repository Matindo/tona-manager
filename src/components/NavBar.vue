<template>
  <nav>
    <ul class="menu">
      <li class="logo"><router-link to="/"><h1>Tona-Manager</h1></router-link></li>
      <li class="item" :class="{ active: toggle }"><router-link to="/">Home</router-link></li>
      <li class="item" :class="{ active: toggle }"><router-link to="/games">Tournaments</router-link></li>
      <li class="item" :class="{ active: toggle }"><router-link to="/events">Events</router-link></li>
      <li class="item" :class="{ active: toggle }"><router-link to="/team">The Team</router-link></li>
      <li class="item button" :class="{ active: toggle }"><router-link to="/login">Log-in</router-link></li>
      <li class="item button secondary" :class="{ active: toggle }"><router-link to="/about">Sign Up</router-link></li>
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
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
nav {
  background: #222;
  padding: 5px 20px;
}
ul {
  list-style-type: none;
}
a {
  color: white;
  text-decoration: none;
  transition: all ease-in-out .5s;
}
a:hover {
  color: blueviolet;
  text-decoration: none;
}
a:not(:hover) {
  transition: all ease-in-out .02s;
}
.menu li {
  font-size: 16px;
  padding: 15px 5px;
  a {
    display: block;
  }
}
.logo a {
  font-size: larger;
}
.button.secondary {
  border-bottom: 1px #444 solid;
}
.item:not(.button) a::after {
  content: '';
  position: absolute;
  display: block;
  height: .4em;
  width: 0%;
  background-color: blueviolet;
  transition: all ease-in-out .4s;
}
.item:not(.button) a:hover::after { width: 100% }
.item:not(.button) a:not(:hover)::after { transition: all ease-in-out .02s; }

// Moblie menu style //
.menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  * {
    transition: all .5s;
  }
}
.toggle {
  cursor: pointer;
  order: 1
}
.item.button {
  order: 2;
}
.item {
  width: 100%;
  text-align: center;
  order: 3;
  display: none;
}
.item.active {
  display: block;
}
.bars {
  background: #999;
  position: relative;
  display: inline-block;
  width: 18px;
  height: 2px;
}
.bars::before, .bars::after {
  content: "";
  display: inline-block;
  width: 18px;
  height: 2px;
  background: #999;
  position: absolute;
}
.bars::before {
  top: 5px;
}
.bars::after {
  top: -5px
}

//Tablet menu style //
@media all and (min-width: 548px) {
  .menu {
    justify-content: center;
  }
  .logo {
    flex: 1;
  }
  .item.button {
    display: block;
    order: 1;
    width: auto;
  }
  .toggle { order: 2; }
  .button a {
    background: teal;
    padding: 7px 15px;
    border: 1px solid #006d6d;
    border-radius: 50em;
    text-decoration: none;
  }
  .button a:hover {
    transition: all .3s;
  }
  .button:not(.secondary) a:hover {
    background: #006d6d;
    border-color: #005959;
  }
  .button.secondary { border: 0; }
  .button.secondary a { background: transparent; }
  .button.secondary a:hover {
    color: #ddd;
  }
}

// Desktop view style //
@media all and (min-width: 885px) {
  .item {
    display: block;
    width: auto;
    order: 1;
    a {
      position: relative;
    }
  }
  .toggle {
    display: none;
  }
  .logo { order: 0; }
  .button { order: 2; }
  .menu li {
    padding: 15px 10px;
    .button {
      padding-right: 0;
    }
  }
}
</style>
