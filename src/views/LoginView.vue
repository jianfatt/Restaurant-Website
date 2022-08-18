<template>
<div class="login-container">
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
.login-container{
  text-align: center;
}

</style>