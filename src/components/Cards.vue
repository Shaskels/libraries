<template>
        <Header />
        <table class="table">
        <tr>
            <td>Номер</td>
            <td>Дата создания</td>
            <td>Пользователь</td>
            <td>Библиотекарь</td>
            <td>Книга</td>
            <td>Действия</td>
        </tr>
        <tr v-for="item in $store.getters.getCards" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ format_date(item.dateofissue) }}</td>
            <td>{{ item.users.name}} {{ item.users.surname }}</td>
            <td>{{ item.librarian.name}} {{ item.librarian.surname }}</td>
            <td>{{ item.libraryfund.name }}</td>
            <td>
                <router-link :to="'/updateCard/'+item.id">Update</router-link>
            </td>
        </tr>
    </table>
</template>

<script>
import moment from 'moment'
import Header from '../headers/HeaderCards.vue'
export default {
    name: 'Home',
    data(){
        return {
            cards:[]
        }
    },
    components:{
        Header
    },
    methods:{
        format_date(value){
            if (value) {
                return moment(String(value)).format('YYYY-MM-DD')
            }
        },
        async loadData(){
            let user = localStorage.getItem('user-info');
            if(!user){
                this.$router.push({name:'Login'})
            }

            this.$store.dispatch('getAllCards')

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