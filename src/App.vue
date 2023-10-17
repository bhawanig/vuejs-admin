<script setup>
import { useUserStore } from './stores/UserStore';
import SiteHeader from '@/components/SiteHeader.vue'
import SideBar from '@/components/SideBar.vue'
const userStore = useUserStore();
</script>

<template>
  <nav v-if="!userStore.userLogged">
    <router-link to="/" >Login </router-link>
  </nav>
  <SiteHeader v-if="userStore.userLogged"/>
  <SideBar v-if="userStore.userLogged"/>
  <router-view v-if="!userStore.userLogged"/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
