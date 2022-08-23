<template>
    <div class="form loginForm">

        <div class="input-box">
            <p class="form-label">Username</p>
            <p><input type="text" v-model="username" class="form-control"></p>

            <p class="form-label">Password</p>
            <p><input type="password" v-model="password" class="form-control"></p>

            <p class="message account-recovery"><a class="link account-recovery-link" href="#">Forgot Username /
                    Password?</a></p>

            <button class="btn btn-primary" @click="handleLogin()">Login</button>

        </div>

        <p class="message hint-message">Don't have an account?<router-link :to="{ path: '/register' }"
                class="link hint-link"> Register </router-link>
        </p>
        <span class="message error-message" v-show="errored">{{ errorMsg }}</span>

    </div>
</template>

<script>
const axios = require('axios').default;

export default {
    name: 'loginForm',
    data() {
        return {
            account: null,
            username: '',
            password: '',
            errored: false,
            errorMsg: 'Invalid username or password. Please try again.'
        }
    },
    methods: {
        handleLogin() {
            axios({
                method: 'POST',
                url: 'http://localhost:1337/api/auth/local',
                data: {
                    identifier: this.username,
                    password: this.password
                }
            })
                .then(response => {
                    this.account = response.data
                    console.log(response.data);
                    this.$router.push('/')
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
.form {
    margin: auto;
    width: 380px;
}

.input-box {
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
}

.form-label {
    margin: 0;
    text-align: left;
}

.link {
    text-decoration: none;
}

.btn {
    width: 320px;
}

.message {
    padding: 10px 0;
    text-align: left;
    font-size: 13px;
}

.hint-message {
    text-align: center;
}

.error-message {
    color: red
}
</style>