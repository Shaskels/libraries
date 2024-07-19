<template>
    <nav class="one">
        <h2>Книги</h2>
        <ul class="topmenu">
            <li><a v-on:click="toHome" href="#">На главную</a></li>
            <li><a v-on:click="Add" href="#">Добавить</a></li>
            <li><a href="#">Фильтры<i class="fa fa-angle-down"></i></a>
                <ul class="submenu">
                    <li><a  v-on:click="showWindow1" href="#">Получить книги по автору</a></li>
                    <li><a  v-on:click="showWindow2" href="#">Получить книги по произведению</a></li>
                    <li><a  v-on:click="showWindow3" href="#">Получить поступившие книги</a></li>
                    <li><a  v-on:click="showWindow4" href="#">Получить книги для чтения в зале по пользователю</a></li>
                    <li><a  v-on:click="showWindow5" href="#">Получить книги для выдачи по пользователю</a></li>
                    <li><a v-on:click="getAll" href="#">Сбросить</a></li>
                </ul>
            </li>
        </ul>
    </nav>
    <div id="window1" class="window1">
        <form>
            <label>Выберите автора:</label>
            <select v-model="author">
                <option v-for="item in authors" v-bind:value="item">{{ item.name }} {{ item.surname }}</option>
            </select>
        </form>
        <button type="button" v-on:click="getFundAuthor" >Выполнить</button>
        <button type="button" v-on:click="cencel" >Отмена</button>
    </div>
    <div id="window2" class="window2">
        <form>
            <label>Выберите произведение:</label>
            <select v-model="work">
                <option v-for="item in works" v-bind:value="item">{{ item.name }}</option>
            </select>
        </form>
        <button type="button" v-on:click="getFundWork" >Выполнить</button>
        <button type="button" v-on:click="cencel" >Отмена</button>
    </div>
    <div id="window3" class="window3">
        <form>
            <p >Начало поиска</p>
            <input  type="date" name="periodforissuing" placeholder="ld;sl"  v-model="start"/>
            <p >Конец поиска</p>
            <input  type="date" name="periodforissuing" placeholder="ld;sl"  v-model="end"/>
        </form>
        <button type="button" v-on:click="getFundReciept" >Выполнить</button>
        <button type="button" v-on:click="cencel" >Отмена</button>
    </div>
    <div id="window4" class="window4">
        <form>
            <label>Выберите пользователя:</label>
            <select v-model="user">
                <option v-for="item in users" v-bind:value="item">{{ item.id}} {{ item.name }} {{ item.surname }}</option>
            </select>
        </form>
        <button type="button" v-on:click="getFundUsed" >Выполнить</button>
        <button type="button" v-on:click="cencel" >Отмена</button>
    </div>
    <div id="window5" class="window5">
        <form>
            <label>Выберите пользователя:</label>
            <select v-model="user">
                <option v-for="item in users" v-bind:value="item">{{ item.id}} {{ item.name }} {{ item.surname }}</option>
            </select>
        </form>
        <button type="button" v-on:click="getFundGiven" >Выполнить</button>
        <button type="button" v-on:click="cencel" >Отмена</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Header',
    data(){
        return{
            authors: [],
            author: null,
            works: [],
            work: null,
            users: [],
            user: null,
            start: '',
            end: ''
        }
    },
    methods:{
        toHome(){
            this.$router.push({name:'Home'})
        },
        Add(){
            this.$router.push({name:'AddFund'})
        },
        getAll(){
            this.$store.dispatch('getAllFund')
        },
        cencel(){
            document.getElementById('window1').style.display='none'
            document.getElementById('window2').style.display='none'
            document.getElementById('window3').style.display='none'
            document.getElementById('window4').style.display='none'
            document.getElementById('window5').style.display='none'
        },
        async showWindow1(){
            let result = await axios.get("http://localhost:8080/author/getAll");
            this.authors=result.data;
            document.getElementById('window1').style.display='block'
            document.getElementById('window2').style.display='none'
            document.getElementById('window3').style.display='none'
            document.getElementById('window4').style.display='none'
            document.getElementById('window5').style.display='none'
        },
        async showWindow2(){
            let result = await axios.get("http://localhost:8080/literaryWorks/getAll");
            this.works=result.data;
            document.getElementById('window1').style.display='none'
            document.getElementById('window2').style.display='block'
            document.getElementById('window3').style.display='none'
            document.getElementById('window4').style.display='none'
            document.getElementById('window5').style.display='none'
        },
        async showWindow3(){
            document.getElementById('window1').style.display='none'
            document.getElementById('window2').style.display='none'
            document.getElementById('window3').style.display='block'
            document.getElementById('window4').style.display='none'
            document.getElementById('window5').style.display='none'
        },
        async showWindow4(){
            let result = await axios.get("http://localhost:8080/user/getAll");
            this.users=result.data;
            document.getElementById('window1').style.display='none'
            document.getElementById('window2').style.display='none'
            document.getElementById('window3').style.display='none'
            document.getElementById('window4').style.display='block'
            document.getElementById('window5').style.display='none'
        },
        async showWindow5(){
            let result = await axios.get("http://localhost:8080/user/getAll");
            this.users=result.data;
            document.getElementById('window1').style.display='none'
            document.getElementById('window2').style.display='none'
            document.getElementById('window3').style.display='none'
            document.getElementById('window4').style.display='none'
            document.getElementById('window5').style.display='block'
        },
        getFundAuthor(){
            document.getElementById('window1').style.display='none'
            if (this.author)
                this.$store.dispatch('getFundAuthor', this.author.id)
        },
        getFundWork(){
            document.getElementById('window2').style.display='none'
            if (this.work)
                this.$store.dispatch('getFundWork', this.work.id)
        },
        getFundReciept(){
            document.getElementById('window3').style.display='none'
            if (this.start != '' && this.end != '')
                this.$store.dispatch('getFundReciept', {start: this.start, end: this.end})
        },
        getFundUsed(){
            document.getElementById('window4').style.display='none'
            if (this.user)
                this.$store.dispatch('getFundUsed', this.user.id)
        },
        getFundGiven(){
            document.getElementById('window5').style.display='none'
            if (this.user)
                this.$store.dispatch('getFundGiven', this.user.id)
        },
        loadData(){
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
.window1 {
    display: none;
    position: fixed;
    bottom: auto;
    right: 0;
    border: 3px solid #ECDAD6;
    background-color: #ECDAD6;
}
.window1 label {
    font-family: 'Lora', serif;
    font-size: 15px;
}
.window2 {
    display: none;
    position: fixed;
    bottom: auto;
    right: 0;
    border: 3px solid #ECDAD6;
    background-color: #ECDAD6;
}
.window2 label {
    font-family: 'Lora', serif;
    font-size: 15px;
}
.window3 {
    display: none;
    position: fixed;
    bottom: auto;
    right: 0;
    border: 3px solid #ECDAD6;
    background-color: #ECDAD6;
}
.window3 label {
    font-family: 'Lora', serif;
    font-size: 15px;
}
.window4 {
    display: none;
    position: fixed;
    bottom: auto;
    right: 0;
    border: 3px solid #ECDAD6;
    background-color: #ECDAD6;
}
.window4 label {
    font-family: 'Lora', serif;
    font-size: 15px;
}
.window5 {
    display: none;
    position: fixed;
    bottom: auto;
    right: 0;
    border: 3px solid #ECDAD6;
    background-color: #ECDAD6;
}
.window5 label {
    font-family: 'Lora', serif;
    font-size: 15px;
}
h2 {
    font-family: monospace;
    color: #606060;
}

nav {
    width: auto;
    margin: 0 auto 0px;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.topmenu>li {
    display: inline-block;
    margin-right: 20px;
    position: relative;
}

.topmenu>li:last-child {
    margin-right: 0;
}

a {
    display: block;
    padding: 10px 15px;
    text-decoration: none;
    outline: none;
    font-family: 'Lora', serif;
    transition: .5s linear;
    width: fit-content;
}

.fa {
    font-family: "FontAwesome";
    color: inherit;
    padding-left: 10px;
}

.submenu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 10;
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    width: fit-content;
}

.one ul {
    background: #ECDAD6;
}

.one ul a {
    color: #695753;
}

.one .submenu {
    display: none;
    background: #b19891;
}

.one ul li:hover .submenu {
    display: block;
}

.submenu li a {
    border-bottom: 1px solid rgba(255, 255, 255, .3);
    color: white;
    width: fit-content;
}
</style>