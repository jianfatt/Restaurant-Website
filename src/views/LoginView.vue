<template>
<div class="form-container">
<h1>Login</h1>
<loginForm></loginForm>
</div>
</template>

<script>
import loginForm from "@/components/LoginForm.vue"

export default {
  name: '',
  components:{
    loginForm
  }
}
</script>

<style>
.form-container{
  text-align: center;
  margin: 50px 0;
}

</style>