<template>
    <Header />
    <table class="table">
    <tr>
        <td>Номер</td>
        <td>Фамилия</td>
        <td>Имя</td>
        <td>Отчество</td>
        <td>Действия</td>
    </tr>
    <tr v-for="item in authors" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.surname }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.patronymic }}</td>
        <td>
            <router-link :to="'/updateAuthor/'+item.id">Update</router-link>
        </td>
    </tr>
</table>
</template>

<script>
import axios from 'axios'
import Header from '../headers/HeaderAuthor.vue'
import { useLink } from 'vue-router'
export default {
name: 'Home',
data(){
    return {
        authors:[]
    }
},
components:{
    Header
},
methods:{
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
.table {
width: 100%;
margin-bottom: 20px;
border: 15px solid #F2F8F8;
border-top: 5px solid #F2F8F8;
border-collapse: collapse; 
}
.table th {
font-weight: bold;
padding: 5px;
background: #94ebeb;
border: none;
border-bottom: 5px solid #F2F8F8;
}
.table td {
padding: 5px;
border: none;
border-bottom: 5px solid #F2F8F8;
}
</style>