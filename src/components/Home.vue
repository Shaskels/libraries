<template>
    <Header />
    <div class="buttons">    
        <button v-on:click="toUserPage">Пользователи</button>

        <button v-on:click="toCardPage">Карты</button>
        <button v-on:click="toWorkPage">Произведения</button>
        <button v-on:click="toFundPage">Книги</button>
        <button v-on:click="toAuthorPage">Авторы</button>
        <button v-on:click="toLibrariansPage">Библиотекари</button>

    </div>
    <div class="best">
            <label>Самые популярные произведения:</label>
            <button v-on:click="toPopularPage">{{ 1 }} {{ $store.getters.getPopulars.at(0).literaryWorks.name }}</button>
            <label>Лучшие работники:</label>
            <button v-on:click="toBestPage">{{ 1 }} {{ $store.getters.getBests.at(0).librarian.name }} {{ $store.getters.getBests.at(0).librarian.surname }}</button>

    </div>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios'
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
        toBestPage(){
            this.$router.push({name:'Best'})
        },
        toPopularPage(){
            this.$router.push({name:'Popular'})
        },
        async toUserPage(){
            await this.$router.push({name:'Users'})
        },
        toCardPage(){
            this.$router.push({name:'Cards'})
        },
        toFundPage(){
            this.$router.push({name:'Fund'})
        },
        toWorkPage(){

            this.$router.push({name:'Works'})
        },
        toAuthorPage(){
            this.$router.push({name:'Authors'})
        },
        toLibrariansPage(){
            this.$router.push({name:'Librarians'})
        },
        loadData(){
            let user = localStorage.getItem('user-info');
            if(!user){
                this.$router.push({name:'Login'})
            }
            this.$store.dispatch('getBest');
           this.$store.dispatch('getPopular');
            

        }
    },
    async mounted(){
        this.loadData();
    }
}
</script>

<style scoped>
.box{
    display: inline-block;
}
.buttons{
    margin-top: 5%;
}
.buttons button {
    background: #b19891;
    border: 0;
    font-size: 20px;
    margin-top: 30px;
    padding: 10px 20px;
    color: #f2f2f2;
    width: 300px;
    height: 50px;
    border-radius: 10px;
    cursor: pointer;
    /* display: block; */
    margin-left: 5%;
    margin-right: auto;
}
.buttons button:hover{
    background: #d4b6ae;
    color: #333;
}
.best label{
    display:block;
    font-size: 20px;
    margin-top: 30px;
    margin-left: 20%;
    margin-right: auto;
}
.best button{
    background: #b19891;
    border: 0;
    font-size: 17px;
    margin-top: 30px;
    padding: 10px 20px;
    color: #f2f2f2;
    width: fit-content;
    height: fit-content;
    border-radius: 10px;
    cursor: pointer;
    display:block;
    margin-left: 20%;
    margin-right: auto;
    top: 20px;

}
.best button:hover{
    background: #d4b6ae;
    color: #333;
}
</style>