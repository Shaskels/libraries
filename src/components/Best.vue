<template>
    <Header />
    <table class="table">
    <tr>
        <td>Номер</td>
        <td>Имя</td>
        <td>Фамилия</td>
        <td>Отчество</td>
        <td>Число обслуженных</td>
    </tr>
    <tr v-for="item in $store.getters.getBests" :key="item.id">
        <td>{{ item.librarian.id }}</td>
        <td>{{ item.librarian.name }}</td>
        <td>{{ item.librarian.surname }}</td>
        <td>{{ item.librarian.patronymic }}</td>
        <td>{{ item.userCount }}</td>
    </tr>
</table>
</template>

<script>
import Header from '../headers/HeaderBest.vue'
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