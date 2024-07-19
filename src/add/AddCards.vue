<template>
    <Header />
    <form class="add">
        <h1 >Заполните все поля</h1>
        <p class="error">{{ error }}</p>
        <p>Выберите дату создания</p>
        <input type="date" v-model="card.dateofissue" placeholder="Выберите дату"/>
        <p>Выберите пользователя</p>
        <select v-model="user">
            <option v-for="item in users" v-bind:value="item">{{ item.name }} {{ item.surname }} {{ item.patronymic }}</option>
        </select>
        <p>Выберите книгу</p>
        <select v-model="book">
            <option v-for="item in fund" v-bind:value="item">{{item.id}} {{ item.name }} |  Можно выдавать на руки? {{ item.tohandout }}</option>
        </select>
        <p>Выберите библиотекаря</p>
        <select v-model="librarian">
            <option v-for="item in librarians" v-bind:value="item">{{ item.name }} {{ item.surname }} {{ item.patronymic }}</option>
        </select>
        <p v-if="book && book.tohandout">Выберите тип карты</p>
        <select v-if="book && book.tohandout" v-model="type">
            <option v-for="item in types" v-bind:value="item">{{ item }}</option>
        </select>
        <p v-if="type == 'На руки'">Выберите дату возврата</p>
        <input v-if="type == 'На руки'" type="date" name="periodforissuing" placeholder="ld;sl"  v-model="card.periodforissuing"/>
        <p v-if="type == 'Чтение в зале'">Выберите время получения</p>
        <input v-if="type == 'Чтение в зале'" type="time" name="timeofissue" placeholder="ld;sl" v-model="card.timeofissue"/>
        <p v-if="type == 'Чтение в зале'">Выберите время возврата</p>
        <input v-if="type == 'Чтение в зале'" type="time" name="returntime" placeholder="dlksldk" v-model="card.returntime"/>
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
            card:{
                dateofissue: '',
                returned: 'false',
                periodforissuing: '',
                timeofissue: '',
                returntime: ''
            },
            types:[
                'На руки',
                'Чтение в зале'
            ],
            type:'Чтение в зале',
            users:[],
            librarians:[],
            fund:[],
            user:null,
            librarian:null,
            book: null,
            error: ''
        }
    },
    methods:{
        isValid(){
            return this.card.dateofissue != '' && this.user != null && this.librarian != null
            && this.book != null;
        },
        isValidHand(){
            return this.isValid() && this.card.periodforissuing != '' ;
        },
        isValidRoom(){
            return this.isValid() && this.card.timeofissue != '' && this.card.returntime != '';
        },
        async add(){
            let result = null;
            if (this.type=='На руки' &&  this.isValidHand()){
                result = await axios.post(`http://localhost:8080/libraryCard/add/handOut?dateofissue=${this.card.dateofissue}&libraryFundId=${this.book.id}&librarianId=${this.librarian.id}&userId=${this.user.id}&returned=${this.card.returned}&periodforissuing=${this.card.periodforissuing}`)
            }
            else if (this.type=='Чтение в зале' && this.isValidRoom()){
                result = await axios.post(`http://localhost:8080/libraryCard/add/readInRoom?dateofissue=${this.card.dateofissue}&libraryFundId=${this.book.id}&librarianId=${this.librarian.id}&userId=${this.user.id}&timeofissue=${this.card.timeofissue}&returntime=${this.card.returntime}`)
            }
            else{
                this.error = 'Все поля должны быть заполнены'
            }
            console.warn(result);

            if(result.status==200){
                this.$router.push({name:'Cards'})
            }

        },
        async loadData(){
            let user = localStorage.getItem('user-info');
            if(!user){
            this.$router.push({name:'Login'})
            }

            let result = await axios.get("http://localhost:8080/librarian/getAll");
            console.warn(result)
            this.librarians=result.data;
            result = await axios.get("http://localhost:8080/user/getAll")
            console.warn(result)
            this.users=result.data;
            result = await axios.get("http://localhost:8080/libraryFund/getAllForCard")
            console.warn(result)
            this.fund=result.data;
    
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
    text-align: center;
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;
}
</style>