<template>
<div class="row">
    <div class="card bg-success text-white" style="width: 30rem;">
    <div class="card-body">
        <h5 class="card-title">Users</h5>
        <p class="card-text mt-4">No of Users</p>
        <router-link :to="{ name: 'users' }" class="nav-link px-0 align-middle card-link text-dark text-decoration-none">{{ totalUsers }}</router-link>
    </div>
    </div>
</div>
</template>
<script>
import axios from 'axios';
import { useUserStore } from '../stores/UserStore';
const userStore = useUserStore();
export default {
    data() {
        return {
            totalUsers: 0
        }
    },
    methods: {
        getPosts() {
                const headers = {
                    'Content-Type': 'application/json',
                    'x-access-token': userStore.userToken
                }
                //router.push('/dashboard');
                axios.get('http://127.0.0.1:3000/v1/api/allUser', {headers: headers})
                .then(result => {
                    this.totalUsers = result.data.count;
                })
                .catch (error => {
                    console.log(error)
                if(error.response && error.response.status == 401 && error.response.data.logout) {
                    userStore.logout()
                    console.log(error);
                } else {
                    console.log(error);
                }
                });
            
        }
    },
    mounted() {
        this.getPosts()
    }
}
</script>