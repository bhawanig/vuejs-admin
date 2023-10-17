<template>
    <div class="row">
        <h2 class="col-sm-10 align-middle">Add User</h2>
        <div class="col-sm-2">
            <router-link :to="{ name: 'users' }" class="btn btn-outline-info nav-link px-0 align-middle"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                </svg> 
                Back 
            </router-link>
        </div>
        <div class="toast align-items-center text-white border-0 w-100 show" :class="theme" role="alert" aria-live="polite" aria-atomic="true" v-if="update || errors.length">
            <div class="d-flex">
                <div class="toast-body">
                    <span v-if="update">User details added successfully.</span>
                    <div v-if="errors.length">
                        <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
                    </div>
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
        <form @submit.prevent="updateUser">
            <div class="mb-3 mt-3 row">
                <label for="inputEmail" class="col-sm-2 col-form-label">First Name</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="inputFName" v-model="users.first_name">
                </div>
            </div>
            <div class="mb-3 mt-3 row">
                <label for="inputEmail" class="col-sm-2 col-form-label">Last Name</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="inputLName" v-model="users.last_name">
                </div>
            </div>
            <div class="mb-3 mt-3 row">
                <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="inputEmail" v-model="users.email">
                </div>
            </div>
            <div class="mb-3 mt-3 row">
                <label for="inputEmail" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword" v-model="users.password">
                </div>
            </div>
            <div class="mb-3 mt-3 row">
                <label for="inputEmail" class="col-sm-2 col-form-label">Phone</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="inputPhone" v-model="users.phone">
                </div>
            </div>
            <div class="mb-3 row">
                <div class="col-sm-5">
                    <button type="submit" class="btn btn-primary">Submit</button>
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
                users: {},
                errors: [],
                update: false,
                theme: 'bg-primary'
            }
        },
        methods: {
            async updateUser() {
                this.errors = [];

                if (!this.users.first_name) {
                    this.errors.push("First Name required.");
                }
                if (!this.users.last_name) {
                    this.errors.push("Last Name required.");
                }
                if (!this.users.phone) {
                    this.errors.push("Phone Number required.");
                }
                if (!this.users.email) {
                    this.errors.push('Email required.');
                } else if (!this.validEmail(this.users.email)) {
                    this.errors.push('Invalid email.');
                }
                if (!this.users.password) {
                    this.errors.push("Password is required.");
                }
                if (this.users.password && this.users.password.length < 6) {
                    this.errors.push("Password must be 6 characters long.");
                }
                if (this.users.phone && this.users.phone.length < 10) {
                    this.errors.push("Phone number must be 10 characters long.");
                }
                if(this.errors.length > 0) {
                    this.update = false;
                    this.theme = 'bg-danger';
                    Array.from(document.querySelectorAll('.toast')).forEach(toastNode => new Toast(toastNode).show())
                }
                if (!this.errors.length) {
                    const data = {
                        first_name:  this.users.first_name,
                        last_name: this.users.last_name,
                        email: this.users.email,
                        phone: this.users.phone,
                        password: this.users.password
                    }
                    const headers = {
                        'Content-Type': 'application/json',
                        'x-access-token': userStore.userToken
                    }
                    axios.post('http://127.0.0.1:3000/v1/api/createUser', data, {headers: headers})
                    .then(response => {
                        if(response.status == 200) {
                            Array.from(document.querySelectorAll('.toast')).forEach(toastNode => new Toast(toastNode).show())
                            this.update = true;
                            this.theme = 'bg-success';
                            router.push({name : 'users'});
                        } else {
                            this.errors.push(data.message);
                        }
                    })
                    .catch (error => {
                        console.log(error)
                        if(error.response && error.response.status == 401 && error.response.data.logout) {
                            //userStore.logout()
                            this.errors.push(error.message);
                        } else {
                            this.errors.push(error.message);
                        }
                    });
                }
            },
            validEmail: function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }
        }
    }
</script>