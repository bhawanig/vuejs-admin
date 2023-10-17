<template>
<div class="row">
    <div class="col-sm-10 align-middle"><h2>User List</h2></div>
    <div class="col-sm-2">
            <router-link :to="{ name: 'userAdd' }" class="btn btn-outline-info nav-link px-0 align-middle"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                </svg> 
                Add User 
            </router-link>
        </div>
    <table class="table table-dark table-striped">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
                <th scope="row">{{index + 1}}</th>
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td>
                    <router-link :to="{ name: 'user', params: { id: user.id }}" class="nav-link px-0 align-middle"><i class="fs-4 bi-pencil"></i></router-link> &nbsp; 
                    <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" @click.prevent="setDeletedUserId(user.id)"><i class="fs-4 bi-trash"></i></button>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="toast align-items-center text-white border-0 w-100 show" :class="theme" role="alert" aria-live="polite" aria-atomic="true" v-if="msg">
        <div class="d-flex">
            <div class="toast-body">
                <span>{{ msg }}.</span>
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"> Delete User </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p class="text-danger fw-bold">Are you sure want to delete user?</p>
      </div>
      <div class="modal-footer">
        <button ref="Close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
        <button type="button" class="btn btn-primary" @click.prevent="deleteUser()">Yes</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>
<script>
import axios from 'axios';
import { useUserStore } from '../stores/UserStore';
const userStore = useUserStore();
import { Toast } from "bootstrap/dist/js/bootstrap.esm.min.js"
export default {
    data() {
        return {
            users: [],
            deletedUserId: '',
            msg: ''
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
            .then(response => {
                this.users = response.data.rows;
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
        },
        setDeletedUserId(userId) {
            this.deletedUserId = userId
        },
        deleteUser() {
            const headers = {
                'Content-Type': 'application/json',
                'x-access-token': userStore.userToken
            }
            fetch('http://127.0.0.1:3000/v1/api/deleteUser/'+this.deletedUserId, {
                method:  'DELETE',
                headers: headers,
            })
            .then(response => response.json())
            .then(result => {
                this.msg = result.message
                Array.from(document.querySelectorAll('.toast')).forEach(toastNode => new Toast(toastNode).show())
                this.$refs.Close.click();
                this.getPosts()
            })
            .catch (error => {
                console.log('Request failed', error);
            });
        }
    },
    mounted() {
        this.getPosts()
    }
}
</script>