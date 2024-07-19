<template>
    <Header />
    <form class="add">
        <h1 >Заполните все поля</h1>
        <p class="error">{{ error }}</p>
        <input type="text" name="name" placeholder="Введите имя" v-model="user.name"/>
        <input type="text" name="surname" placeholder="Введите фамилию" v-model="user.surname"/>
        <input type="text" name="patronymic" placeholder="Введите отчество" v-model="user.patronymic"/>
        <p>Выберите читальный зал</p>
        <select v-model="readingroom">
            <option v-for="item in readingrooms" v-bind:value="item">{{ item.id }}</option>
        </select>
        <input type="text" name="login" placeholder="Введите логин" v-model="user.login"/>
        <input type="text" name="password" placeholder="Введите пароль" v-model="user.password"/>
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
                login:'',
                password:''
            },
            readingrooms:[],
            readingroom: null,
            error: ''
        }
    },
    methods:{
        isValid(){
            return this.user.name != '' && this.user.surname != '' && this.user.patronymic != ''
            && this.readingroom!=null && this.user.login != '' && this.user.password != '';
        },
        async add(){
            let result = null;
            if (this.isValid())
                result = await axios.post(`http://localhost:8080/librarian/add?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}&readingroomsId=${this.readingroom.id}&login=${this.user.login}&password=${this.user.password}`)
            else{
                this.error = 'Все поля должны быть заполнены'
            }
            console.warn(result);

            if(result.status==200){
                this.$router.push({name:'Librarians'})
            }

        },
        async loadData(){
            let user = localStorage.getItem('user-info');
            if(!user){
            this.$router.push({name:'Login'})
            }
    
            let result = await axios.get("http://localhost:8080/librarian/readingRoom/getAll");
            console.warn(result)
            this.readingrooms=result.data;
        }
    },
    async mounted(){
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