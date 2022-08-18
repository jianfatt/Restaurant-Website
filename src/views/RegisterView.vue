<template>
<div class="register-container">
  <h1>Register</h1>
<registerForm></registerForm>
</div>
</template>

<script>
import registerForm from "@/components/RegisterForm.vue"

export default {
  name: '',
  components:{
    registerForm
  }
}
</script>

<style>
.register-container{
  text-align: center;
}

</style>