<template>
    <Header />
    <table class="table">
        <tr>
            <td>Номер</td>
            <td>Имя</td>
            <td>Фамилия</td>
            <td>Отчество</td>
            <td>Библиотека</td>
            <td>Действия</td>
        </tr>
        <tr v-for="item in $store.getters.getUsers" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.surname }}</td>
            <td>{{ item.patronymic }}</td>
            <td>{{ item.library.name }}</td>
            <td>
                <router-link :to="'/updateUser/'+item.id">Update</router-link>
            </td>

        </tr>
    </table>
</template>

<script>
import Header from '../headers/HeaderUsers.vue'
export default {
    name: 'Home',
    data(){
        return {
            users:[]
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

            this.$store.dispatch('getAllUsers')

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