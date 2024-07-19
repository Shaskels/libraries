<template>
    <Header />
    <table class="table">
        <tr>
            <td>Номер</td>
            <td>Название</td>
            <td>Стеллаж</td>
            <td>Полка</td>
            <td>Читальный зал</td>
            <td>Можно выдавать на руки?</td>
            <td>Выдана?</td>
            <td>Дата получения</td>
            <td>Действия</td>
        </tr>
        <tr v-for="item in $store.getters.getFund" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.rack }}</td>
            <td>{{ item.shelf }}</td>
            <td>{{ item.readingrooms.id }}</td>
            <td>{{ item.tohandout }}</td>
            <td>{{ item.given }}</td>
            <td>{{ format_date(item.dateofreceipt) }}</td>
            <td>
                <router-link :to="'/updateFund/'+item.id">Update</router-link>
            </td>

        </tr>
    </table>
</template>

<script>
import moment from 'moment'
import Header from '../headers/HeaderFund.vue'
export default {
    name: 'Home',
    data(){
        return {
            fund:[]
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
            this.$store.dispatch('getAllFund')

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