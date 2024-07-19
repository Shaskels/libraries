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
            <option v-for="item in fund" v-bind:value="item">{{item.id}} {{ item.name }} {{ item.tohandout }}</option>
        </select>
        <p>Выберите библиотекаря</p>
        <select v-model="librarian">
            <option v-for="item in librarians" v-bind:value="item">{{ item.name }} {{ item.surname }} {{ item.patronymic }}</option>
        </select>
        <p>Возвращена?</p>
        <input type="checkbox" checked="false" name="returned" placeholder="Введите номер стеллажа" v-model="card.returned"/>
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
        <button type="button" v-on:click="add">Изменить</button>
    </form>
    <button class="delete" type="button" v-on:click="del(card.id)">Удалить</button>
</template>

<script>
import { isVariableDeclarationList } from 'typescript'
import moment from 'moment'
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
                id: '',
                dateofissue: '',
                returned: '',
                periodforissuing: '',
                timeofissue: '',
                returntime: ''
            },
            types:[
                'На руки',
                'Чтение в зале'
            ],
            type:'',
            startType:'',
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
        format_date(value){
            if (value) {
                return moment(String(value)).format('YYYY-MM-DD')
            }
        },
        format_time(value){
            if (value) {
                return moment(String(value)).format('hh:mm:ss')
            }
        },
        isValid(){
            if (this.card.returned == false) this.card.returned = 'false'
            else this.card.returned = 'true';
            return this.card.dateofissue != '' && this.user != null && this.librarian != null
            && this.book != null;
        },
        isValidHand(){
            return this.isValid() && this.card.periodforissuing != '' ;
        },
        isValidRoom(){
            return this.isValid() && this.card.timeofissue != '' && this.card.returntime != '';
        },
        async del(id){
            let result = await axios.delete(`http://localhost:8080/libraryCard/delete?id=${this.card.id}`)
            console.warn(result);

            if(result.status==200){
                this.$router.push({name:'Cards'})
            }
        },
        async add(){
            let result = null;
            if (this.type != this.startType && this.startType == 'На руки' && this.isValidRoom()){
                result = await axios.delete(`http://localhost:8080/libraryCard/delete/handOut?id=${this.$route.params.id}`)
                result = await axios.post(`http://localhost:8080/libraryCard/add/existReadInRoom?timeofissue=${this.card.timeofissue}&returntime=${this.card.returntime}&id=${this.$route.params.id}`)
            }
            else if (this.type != this.startType && this.startType == 'Чтение в зале' && this.isValidHand()){
                result = await axios.delete(`http://localhost:8080/libraryCard/delete/readInRoom?id=${this.$route.params.id}`)
                result = await axios.post(`http://localhost:8080/libraryCard/add/existHandOut?returned=${this.card.returned}&periodforissuing=${this.card.periodforissuing}&id=${this.$route.params.id}`)
            }
            else if (this.type=='На руки' &&  this.isValidHand()){
                result = await axios.put(`http://localhost:8080/libraryCard/update/handOut?dateofissue=${this.card.dateofissue}&libraryFundId=${this.book.id}&librarianId=${this.librarian.id}&userId=${this.user.id}&returned=${this.card.returned}&periodforissuing=${this.card.periodforissuing}&id=${this.$route.params.id}`)
            }
            else if (this.type=='Чтение в зале' && this.isValidRoom()){
                result = await axios.put(`http://localhost:8080/libraryCard/update/readInRoom?dateofissue=${this.card.dateofissue}&libraryFundId=${this.book.id}&librarianId=${this.librarian.id}&userId=${this.user.id}&timeofissue=${this.card.timeofissue}&returntime=${this.card.returntime}&id=${this.$route.params.id}`)
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
            result = await axios.get("http://localhost:8080/libraryFund/getAll")
            console.warn(result)
            this.fund=result.data;
    
            result = await axios.get(`http://localhost:8080/libraryCard/getById?id=${this.$route.params.id}`)
            console.warn(result)
            this.card.dateofissue = this.format_date(result.data.dateofissue)
            this.card.id = result.data.id
            this.user=result.data.users
            this.librarian = result.data.librarian
            this.book = result.data.libraryfund
            if (result.data.periodforissuing){
                this.type = this.types[0];
                this.startType = this.types[0];
                this.card.returned=result.data.returned
                this.card.periodforissuing = this.format_date(result.data.periodforissuing)
            }
            else if (result.data.returntime){
                this.type = this.types[1];
                this.startType = this.types[1];
                this.card.timeofissue = this.format_time(result.data.timeofissue)
                this.card.returntime = this.format_time(result.data.returntime)
            }
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