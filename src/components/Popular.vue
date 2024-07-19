<template>
    <Header />
    <table class="table">
    <tr>
        <td>Номер</td>
        <td>Название</td>
        <td>Число</td>
    </tr>
    <tr v-for="item in $store.getters.getPopulars" :key="item.id">
        <td>{{ item.literaryWorks.id }}</td>
        <td>{{ item.literaryWorks.name }}</td>
        <td>{{ item.count }}</td>
    </tr>
</table>
</template>

<script>
import Header from '../headers/HeaderPopular.vue'
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