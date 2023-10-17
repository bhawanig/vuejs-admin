<template>
    <SiteHeader />
    <div class="row"> 
        <div class="mb-3 mt-3 row">
        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
        <input type="text" class="form-control" id="inputEmail">
        </div>
    </div>
    <div class="mb-3 row">
        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
        <input type="password" class="form-control" id="inputPassword">
        </div>
    </div>
    <div class="mb-3 row">
        <button type="button" class="btn btn-primary">Primary</button>
    </div>
    </div>
</template>
<script>
import SiteHeader from './SiteHeader.vue'

export default {
    components: {
        SiteHeader,
    }
}
</script>