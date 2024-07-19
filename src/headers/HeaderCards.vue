<template>
    <nav class="one">
        <h2>Карты</h2>
        <ul class="topmenu">
            <li><a v-on:click="toHome" href="#">На главную</a></li>
            <li><a v-on:click="Add" href="#">Добавить</a></li>
            <li><a href="#">Фильтры<i class="fa fa-angle-down"></i></a>
                <ul class="submenu">
                    <li><a  v-on:click="showWindow" href="#">Получить карты на конкретное произведение</a></li>
                    <li><a v-on:click="getAll" href="#">Сбросить</a></li>
                </ul>
            </li>
        </ul>
    </nav>
    <div id="window" class="window">
        <form>
            <p >Начало поиска</p>
            <input  type="date" name="periodforissuing" placeholder="ld;sl"  v-model="start"/>
            <p >Конец поиска</p>
            <input  type="date" name="periodforissuing" placeholder="ld;sl"  v-model="end"/>
            <div><label>Выберите произведение:</label>
            <select v-model="work">
                <option v-for="item in works" v-bind:value="item">{{ item.id }} {{ item.name }}</option>
            </select>
            </div>
        </form>
        <button type="button" v-on:click="getCards" >Выполнить</button>
        <button type="button" v-on:click="cencel" >Отмена</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Header',
    data(){
        return {
            works:[],
            work:null,
            start: '',
            end: '',
        }
    },
    methods:{
        toHome(){
            this.$router.push({name:'Home'})
        },
        async Add(){
            this.$router.push({name:'AddCard'})
        },
        getAll(){
            this.$store.dispatch('getAllCards')
        },
        cencel(){
            document.getElementById('window').style.display='none'
        },
        async showWindow(){
            let result = await axios.get("http://localhost:8080/literaryWorks/getAll");
            this.works=result.data;
            document.getElementById('window').style.display='block'
        },
        getCards(){
            document.getElementById('window').style.display='none'
            if (this.work)
                this.$store.dispatch('getCardsEdition', {id: this.work.id, start: this.start,end: this.end} )

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
.window {
    display: none;
    position: fixed;
    bottom: auto;
    right: 0;
    border: 3px solid #ECDAD6;
    background-color: #ECDAD6;
}
.window label {
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