import { defineStore } from 'pinia'
import router from "@/router";
export const useUserStore = defineStore('user', {
    state: () => ({ isLoggedIn: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : false}),
    getters: {
      userLogged: (state) => state.isLoggedIn,
      userToken: (state) => state.isLoggedIn.token
    },
    actions: {
        logout() {
          localStorage.removeItem('user');
          this.isLoggedIn = null;
          router.push({name : 'login'});
      },
      setLoggedIn() {
        this.isLoggedIn = JSON.parse(localStorage.getItem('user'))
      }
    },
})