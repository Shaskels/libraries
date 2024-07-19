<template>
    <Header />
    <table class="table">
        <tr>
            <td>Номер</td>
            <td>Имя</td>
            <td>Фамилия</td>
            <td>Отчество</td>
            <td>Читальный зал</td>
            <td>Действия</td>
        </tr>
        <tr v-for="item in $store.getters.getLibrarians" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.surname }}</td>
            <td>{{ item.patronymic }}</td>
            <td>{{ item.readingrooms.id }}</td>
            <td>
                <router-link :to="'/updateLibrarians/'+item.id">Update</router-link>
            </td>

        </tr>
    </table>
</template>

<script>
import Header from '../headers/HeaderLibrarians.vue'
//import axios from 'axios'
export default {
    name: 'Home',
    data(){
        return {
            librarians: []
        }
    },
    components:{
        Header
    },
    methods:{
        loadData(){
            let user = localStorage.getItem('user-info');
            if(!user){
                this.$router.push({name:'Login'})
            }

            this.$store.dispatch('getAllLibrarians')

        }
    },
    mounted(){
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