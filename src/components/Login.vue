<template>
<img class="logo" src="../assets/book.svg" />
<h1>Login</h1>
<div class="login">
    <input type="text" v-model="loginL" placeholder="Введите Ваш логин" />
    <input type="password" v-model="password" placeholder="Введите Ваш пароль" />
    <button v-on:click="login">Login</button>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',
    data(){
        return {
            loginL: '',
            password:''
        }
    },
    methods:{
        async login(){
            let result = await axios.get(`http://localhost:8080/librarian/login?login=${this.loginL}&password=${this.password}`)
            console.warn(result.status)
            
            if(result.status==200 && result.data.length > 0){
                
                localStorage.setItem("user-info",JSON.stringify(result.data[0]))
                this.$router.push({name:'Home'})
            }
        }
    },
    mounted(){
        let user = localStorage.getItem('user-info');
        if(user){
            this.$router.push({name:'Home'})
        }
    }
}
</script>

<style scoped>
h1{
  text-align: center;
  line-height: 1.1;
}
</style>