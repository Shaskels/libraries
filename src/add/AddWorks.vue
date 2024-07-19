<template>
    <Header />
    <form class="add">
        <h1 >Заполните все поля</h1>
        <p class="error">{{ error }}</p>
        <input type="text" name="name" placeholder="Введите название" v-model="work.name"/>
        <p>Выберите автора</p>
        <select v-model="author">
            <option v-for="item in authors" v-bind:value="item">{{ item.name }} {{ item.surname }} {{  item.patronymic }}</option>
        </select>
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
            work:{
                name:'',
            },
            authors:[],
            author:null,
            error: ''
        }
    },
    methods:{
        isValid(){
            return this.user.name != '' && this.author != null;
        },
        async add(){
            let result = null;
            if (this.isValid()){
                result = await axios.post(`http://localhost:8080/literaryWorks/add?name=${this.work.name}&authorId=${this.author.id}`)
            }
            else{
                this.error = 'Все поля должны быть заполнены'
            }
            console.warn(result);

            if(result.status==200){
                this.$router.push({name:'Works'})
            }

        },
        async loadData(){
            let user = localStorage.getItem('user-info');
            if(!user){
            this.$router.push({name:'Login'})
            }

            let result = await axios.get("http://localhost:8080/author/getAll");
            console.warn(result)
            this.authors=result.data;
    
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