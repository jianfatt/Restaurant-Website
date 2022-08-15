<template>
<div class="register-container">
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
  width: 100vw;
  padding: 0 100px;
}

</style>