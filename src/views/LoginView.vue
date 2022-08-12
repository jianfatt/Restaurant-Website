<template>
<div class="login-container">
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
  width: 100%;
  padding: 0 100px;
}

</style>