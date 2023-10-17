<template>
    <h2>Vue Admin</h2>
    <div class="container-fluid">
        <h2 class="mt-5">Login</h2>
        <div class="toast align-items-center text-white border-0 w-100 show" :class="theme" role="alert" aria-live="polite" aria-atomic="true" v-if="errors.length">
            <div class="d-flex">
                <div class="toast-body">
                    <div v-if="errors.length">
                        <div v-for="(error, index) in errors" :key="index" class="text-danger fw-bold">{{ error }}</div>
                    </div>
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
        <form @submit.prevent="setPost">
            <div class="mb-3 mt-3 row">
                <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="inputEmail" v-model="postData.email">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword" v-model="postData.password">
                </div>
            </div>
            <div class="mb-3 row">
                <div class="col-sm-5">
                    <button type="submit" class="btn btn-primary">Primary</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import { useUserStore } from '../stores/UserStore';
const userStore = useUserStore();
import router from "@/router";
import { Toast } from "bootstrap/dist/js/bootstrap.esm.min.js"
export default {
    data() {
        return {
            errors: [],
            postData: {
                email:  '',
                password:   ''
            }
        }
    },
    created() {
        if (userStore.userLogged) {
            router.push('/dashboard');
        }
    },
    methods: {
        setPost() {
            this.errors = [];
            const data = {
                email:  this.postData.email,
                password:  this.postData.password
            }
            const headers = {
                'Content-Type': 'application/json',
            }
            axios.post('http://127.0.0.1:3000/v1/api/login', data, {headers: headers})
            .then(response => {
                if(response.status == 200) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    userStore.setLoggedIn();
                    router.push({name : 'dashboard'});
                } else {
                    Array.from(document.querySelectorAll('.toast')).forEach(toastNode => new Toast(toastNode).show())
                    this.errors.push(response.data.message);
                }
            })
            .catch (error => {
                if (error.response && error.response.data) {
                    Array.from(document.querySelectorAll('.toast')).forEach(toastNode => new Toast(toastNode).show())
                    this.errors.push(error.response.data.message);
                } else {
                    console.log('Request failed', error);
                }
                
            });
        }
    }
}
</script>