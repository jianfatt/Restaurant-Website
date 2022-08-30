<template>
    <div class="form RegisterForm col-lg-4">
        <form @submit.prevent="handleRegister()">
            <div class="input-box">
                <p class="form-label">Username</p>
                <p><input type="text" v-model="username" class="form-control" required></p>

                <p class="form-label">Email</p>
                <p><input type="email" v-model="email" class="form-control" required></p>

                <p class="form-label">Password</p>
                <p><input type="password" v-model="password" class="form-control" required></p>

                <p class="message account-recovery"><a class="link account-recovery-link" href="#">Forgot Username / Password?</a></p>

                <input class="btn btn-primary" type="submit" value="Register"/>
                </div>
                <p class="message hint-message">Already have an account?<router-link :to="{ path: '/login'}" class="link hint-link" > Login </router-link></p>
        </form>
    </div>
</template>

<script>
const axios = require('axios').default;
const Swal = require('sweetalert2')

export default {
    name: 'registerForm',
    data() {
        return {
            account: null,
            username: '',
            email:'',
            password: '',
            api_url:process.env.VUE_APP_API_URL,
        }
    },
    methods: {
        handleRegister() {
            axios({
                method: 'POST',
                url: this.api_url + '/api/auth/local/register',
                data: {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
            })
                .then(response => {
                    this.account = response.data;
                    console.log(response.data);
                    let timerInterval
                    Swal.fire({
                        title: 'Resgistered Successfully!',
                        icon:'success',
                        timer: 1000,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            this.$router.push('/login')
                            console.log('I was closed by the timer')
                        }
                    })
                })
                .catch(error => {
                    console.log(error);
                    this.errored = true;
                })
        }
    }
}
</script>