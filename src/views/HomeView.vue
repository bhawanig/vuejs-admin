<template>
  
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{ goToDashboard(isAuthenticated) }}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  props: ['isAuthenticated'],
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username
    },
  },
  methods: {
    goToDashboard(isAuthenticated) {
      if (isAuthenticated) {
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    },
  },
}
</script>