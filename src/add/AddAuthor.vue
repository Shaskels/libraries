<template>
    <Header />
    <form class="add">
        <h1 >Заполните все поля</h1>
        <p class="error">{{ error }}</p>
        <input type="text" name="name" placeholder="Введите имя" v-model="user.name"/>
        <input type="text" name="surname" placeholder="Введите фамилию" v-model="user.surname"/>
        <input type="text" name="patronymic" placeholder="Введите отчество" v-model="user.patronymic"/>
        <button type="button" v-on:click="add">Добавить</button>
    </form>
</template>

<script>
import { isVariableDeclarationList } from 'typescript'
import Header from '../headers/HeaderAdd.vue'
import axios from 'axios'
export default {
    name: 'Add',
    components:{
        Header
    },
    data(){
        return{
            user:{
                name:'',
                surname:'',
                patronymic:'',
            },
            error: ''
        }
    },
    methods:{
        isValid(){
            return this.user.name != '' && this.user.surname != '' && this.user.patronymic != '';
        },
        async add(){
            let result = null;
            if (this.isValid())
                result = await axios.post(`http://localhost:8080/author/add?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}`)
            else{
                this.error = 'Все поля должны быть заполнены'
            }
            console.warn(result);

            if(result.status==200){
                this.$router.push({name:'Authors'})
            }

        },
        loadData(){
            let user = localStorage.getItem('user-info');
            if(!user){
            this.$router.push({name:'Login'})
            }
    
        }
    },
    mounted(){
        this.loadData();
    }
}
</script>

<style scoped>
.add {
    margin-top: 50px;
}
.add h1{
    font-size: 25px;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    margin-bottom: 30px;
}
.add select{
    width: 320px;
    height: 30px;
    display: block;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px ;
}
.add p{
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    font-size: 15px;
}
</style>