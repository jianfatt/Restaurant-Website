<template>
    <div class="form RegisterForm">

            <div class="input-box">
                <p class="form-label">Username</p>
                <p><input type="text" v-model="username" class="form-control" required></p>

                <p class="form-label">Email</p>
                <p><input type="email" v-model="email" class="form-control" required></p>

                <p class="form-label">Password</p>
                <p><input type="password" v-model="password" class="form-control" required></p>

                <p class="message account-recovery"><a class="link account-recovery-link" href="#">Forgot Username / Password?</a></p>

                <button class="btn btn-primary" @click="handleRegister()">Register</button>
                </div>
                <p class="message hint-message">Already have an account?<router-link :to="{ path: '/login'}" class="link hint-link" > Login </router-link></p>
    </div>
</template>

<script>
const axios = require('axios').default;

export default {
    name: 'registerForm',
    data() {
        return {
            account: null,
            username: '',
            email:'',
            password: '',
        }
    },
    methods: {
        handleRegister() {
            axios({
                method: 'POST',
                url: 'http://localhost:1337/api/auth/local/register',
                data: {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
            })
                .then(response => {
                    this.account = response.data;
                    console.log(response.data);
                    this.$router.push('/login')
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
        }
    }
}
</script>

<style>

</style>