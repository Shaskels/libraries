<template>
    <nav class="one">
        <h2>Пользователи</h2>
        <ul class="topmenu">
            <li><a v-on:click="toHome" href="#">На главную</a></li>
            <li><a v-on:click="Add" href="#">Добавить</a></li>
            <li><a href="#">Фильтры<i class="fa fa-angle-down"></i></a>
                <ul class="submenu">
                    <li><a v-on:click="showWindow1" href="#">Получить пользователей по книге</a></li>
                    <li><a v-on:click="showWindow2" href="#">Получить пользователей по произведению</a></li>
                    <li><a v-on:click="showWindow3" href="#">Получить пользователей обслуженных библиотекарем</a></li>
                    <li><a v-on:click="getOverdue" href="#">Получить пользователей просрочивших книги</a></li>
                    <li><a v-on:click="showWindow4" href="#">Получить пользователей не посещавших библиотеки</a></li>
                    <li><a v-on:click="showWindow5" href="#">Получить пользователей по параметрам</a></li>
                    <li><a v-on:click="getAll" href="#">Сбросить</a></li>
                </ul>
            </li>
        </ul>
    </nav>
    <div id="window1" class="window1">
        <form>
            <label>Выберите книгу:</label>
            <select v-model="book">
                <option v-for="item in fund" v-bind:value="item"> {{ item.id }} {{ item.name }}</option>
            </select>
        </form>
        <button type="button" v-on:click="getUserBook">Выполнить</button>
        <button type="button" v-on:click="cencel" >Отмена</button>
    </div>
    <div id="window2" class="window2">
        <form>
            <label>Выберите произведение:</label>
            <select v-model="work">
                <option v-for="item in works" v-bind:value="item"> {{ item.name }}</option>
            </select>
        </form>
        <button type="button" v-on:click="getUserWork">Выполнить</button>
        <button type="button" v-on:click="cencel" >Отмена</button>
    </div>
    <div id="window3" class="window3">
        <form>
            <p>Начало поиска</p>
            <input type="date" name="periodforissuing" placeholder="ld;sl" v-model="start" />
            <p>Конец поиска</p>
            <input type="date" name="periodforissuing" placeholder="ld;sl" v-model="end" />
            <div>
                <label>Выберите библиотекаря:</label>
                <select v-model="librarian">
                    <option v-for="item in librarians" v-bind:value="item">{{ item.id }} {{ item.name }} {{ item.surname
                        }}</option>
                </select>
            </div>
        </form>
        <button type="button" v-on:click="getUserLibrarian">Выполнить</button>
        <button type="button" v-on:click="cencel" >Отмена</button>
    </div>
    <div id="window4" class="window4">
        <form>
            <p>Начало поиска</p>
            <input type="date" name="periodforissuing" placeholder="ld;sl" v-model="start" />
            <p>Конец поиска</p>
            <input type="date" name="periodforissuing" placeholder="ld;sl" v-model="end" />
        </form>
        <button type="button" v-on:click="getUserNotVisit">Выполнить</button>
        <button type="button" v-on:click="cencel" >Отмена</button>
    </div>
    <div id="window5" class="window5">
        <form>
            <input type="text" name="name" placeholder="Введите имя" v-model="user.name" />
            <input type="text" name="surname" placeholder="Введите фамилию" v-model="user.surname" />
            <input type="text" name="patronymic" placeholder="Введите отчество" v-model="user.patronymic" />
            <p>Выберите библиотеку</p>
            <select v-model="library">
                <option v-for="item in libraries" v-bind:value="item">{{ item.name }}</option>
            </select>
            <p>Выберите категорию граждан</p>
            <select v-model="role">
                <option v-for="item in roles">{{ item }}</option>
            </select>
            <input v-if="role == 'Школьник'" type="text" name="schoolname" placeholder="Введите название школы"
                v-model="user.schoolname" />
            <input v-if="role == 'Школьник'" type="text" name="classNum" placeholder="Введите номер класса"
                v-model="user.classNum" />
            <input v-if="role == 'Школьник'" type="text" name="letter" placeholder="Введите букву класса"
                v-model="user.letter" />
            <input v-if="role == 'Пенсионер'" type="text" name="pensioncertificatenumber"
                placeholder="Введите номер пенсионного" v-model="user.pensioncertificatenumber" />
            <input v-if="role == 'Пенсионер'" type="text" name="age" placeholder="Введите возраст" v-model="user.age" />
            <input v-if="role == 'Научный работник' || role == 'Рабочий'" type="text" name="organizationname"
                placeholder="Введите название организации" v-model="user.organizationname" />
            <input v-if="role == 'Научный работник'" type="text" name="scientifictopic"
                placeholder="Введите научную тему" v-model="user.scientifictopic" />
            <input v-if="role == 'Научный работник' || role == 'Преподаватель'" type="text" name="post"
                placeholder="Введите должность" v-model="user.post" />
            <input v-if="role == 'Рабочий'" type="text" name="specialization" placeholder="Введите специальность"
                v-model="user.specialization" />
            <input v-if="role == 'Преподаватель' || role == 'Студент'" type="text" name="nameoftheeducationalintitution"
                placeholder="Введите название образовательной организации"
                v-model="user.nameoftheeducationalintitution" />
            <input v-if="role == 'Преподаватель'" type="text" name="subject" placeholder="Введите предмет"
                v-model="user.subject" />
            <input v-if="role == 'Студент'" type="text" name="faculty" placeholder="Введите факультет"
                v-model="user.faculty" />
            <input v-if="role == 'Студент'" type="text" name="course" placeholder="Введите курс"
                v-model="user.course" />
            <input v-if="role == 'Студент'" type="text" name="groupnumber" placeholder="Введите номер группы"
                v-model="user.groupnumber" />
            <input v-if="role == 'Другое'" type="text" name="fieldofactivity" placeholder="Введите род деятельности"
                v-model="user.fieldofactivity" />
        </form>
        <button type="button" v-on:click="getUserWithParam">Выполнить</button>
        <button type="button" v-on:click="cencel" >Отмена</button>
    </div>
</template>

<script>
import axios from 'axios'
import Librarians from '../components/Librarians.vue'
export default {
    name: 'Header',
    data() {
        return {
            user:{
                name:'',
                surname:'',
                patronymic:'',
                schoolname:'',
                classNum:'',
                letter:'',
                pensioncertificatenumber:'',
                age:'',
                organizationname:'',
                scientifictopic:'',
                post:'',
                specialization:'',
                nameoftheeducationalintitution:'',
                subject:'',
                faculty:'',
                course:'',
                groupnumber:'',
                fieldofactivity:''
            },
            works: [],
            work: null,
            fund: [],
            book: null,
            librarians: [],
            librarian: null,
            libraries: [],
            library: null,
            libraryId:'',
            roles:[
                'Школьник',
                'Пенсионер',
                'Научный работник',
                'Рабочий',
                'Преподаватель',
                'Студент',
                'Другое'

            ],
            role:'',
            start: '',
            end: ''
        }
    },

    methods: {
        toHome() {
            this.$router.push({ name: 'Home' })
        },
        Add() {
            this.$router.push({ name: 'AddUser' })
        },
        getAll() {
            this.$store.dispatch('getAllUsers')
        },
        cencel(){
            document.getElementById('window1').style.display = 'none'
            document.getElementById('window2').style.display = 'none'
            document.getElementById('window3').style.display = 'none'
            document.getElementById('window4').style.display = 'none'
            document.getElementById('window5').style.display = 'none'
        },
        async showWindow1() {
            let result = await axios.get("http://localhost:8080/libraryFund/getAll");
            this.fund = result.data;
            document.getElementById('window1').style.display = 'block'
            document.getElementById('window2').style.display = 'none'
            document.getElementById('window3').style.display = 'none'
            document.getElementById('window4').style.display = 'none'
            document.getElementById('window5').style.display = 'none'
        },
        async showWindow2() {
            let result = await axios.get("http://localhost:8080/literaryWorks/getAll");
            this.works = result.data;
            document.getElementById('window1').style.display = 'none'
            document.getElementById('window2').style.display = 'block'
            document.getElementById('window3').style.display = 'none'
            document.getElementById('window4').style.display = 'none'
            document.getElementById('window5').style.display = 'none'
        },
        async showWindow3() {
            let result = await axios.get("http://localhost:8080/librarian/getAll");
            this.librarians = result.data;
            document.getElementById('window1').style.display = 'none'
            document.getElementById('window2').style.display = 'none'
            document.getElementById('window3').style.display = 'block'
            document.getElementById('window4').style.display = 'none'
            document.getElementById('window5').style.display = 'none'
        },
        async showWindow4() {
            document.getElementById('window1').style.display = 'none'
            document.getElementById('window2').style.display = 'none'
            document.getElementById('window3').style.display = 'none'
            document.getElementById('window4').style.display = 'block'
            document.getElementById('window5').style.display = 'none'
        },
        async showWindow5() {
            let result = await axios.get("http://localhost:8080/library/getAll");
            this.libraries = result.data;
            document.getElementById('window1').style.display = 'none'
            document.getElementById('window2').style.display = 'none'
            document.getElementById('window3').style.display = 'none'
            document.getElementById('window4').style.display = 'none'
            document.getElementById('window5').style.display = 'block'
        },
        getUserWork() {
            document.getElementById('window2').style.display = 'none'
            if (this.work)
                this.$store.dispatch('getUserWork', this.work.id)
        },
        getUserBook() {
            document.getElementById('window1').style.display = 'none'
            if (this.book)
                this.$store.dispatch('getUserBook', this.book.id)
        },
        getUserLibrarian() {
            document.getElementById('window3').style.display = 'none'
            if (this.librarian)
                this.$store.dispatch('getUserLibrarian', { id: this.librarian.id, start: this.start, end: this.end })
        },
        getOverdue() {
            this.$store.dispatch('getOverdue')
        },
        getUserNotVisit() {
            document.getElementById('window4').style.display = 'none'
            if (this.start != '' && this.end != '')
                this.$store.dispatch('getUserNotVisit', { start: this.start, end: this.end })
        },
        getUserWithParam(){
            document.getElementById('window5').style.display = 'none'
            if (this.library != null) this.libraryId = this.library.id
            switch (this.role){
                case 'Школьник':
                    this.$store.dispatch('getPupils', {name : this.user.name, surname: this.user.surname, patronymic: this.user.patronymic, classNum : this.user.classNum, schoolname: this.user.schoolname, letter: this.user.letter, id: this.libraryId})
                    break;
                case 'Пенсионер':
                    this.$store.dispatch('getPensioners', {name : this.user.name, surname: this.user.surname, patronymic: this.user.patronymic, pensioncertificatenumber : this.user.pensioncertificatenumber, age: this.user.age, id: this.libraryId})
                    break;
                case 'Научный работник':
                    this.$store.dispatch('getScience', {name : this.user.name, surname: this.user.surname, patronymic: this.user.patronymic, organizationname : this.user.organizationname, scientifictopic: this.user.scientifictopic, post: this.user.post, id: this.libraryId})
                    break;
                case 'Рабочий':
                    this.$store.dispatch('getWorker', {name : this.user.name, surname: this.user.surname, patronymic: this.user.patronymic, organizationname : this.user.organizationname, specialization: this.user.specialization, id: this.libraryId})
                    break;
                case 'Преподаватель':
                    this.$store.dispatch('getTeacher', {name : this.user.name, surname: this.user.surname, patronymic: this.user.patronymic, nameoftheeducationalintitution : this.user.nameoftheeducationalintitution, subject: this.user.subject, post: this.user.post, id: this.libraryId})
                    break;
                case 'Студент':
                    this.$store.dispatch('getStudent', {name : this.user.name, surname: this.user.surname, patronymic: this.user.patronymic, nameoftheeducationalintitution : this.user.nameoftheeducationalintitution, faculty: this.user.faculty, groupnumber: this.user.groupnumber, course: this.user.course, id: this.libraryId})
                    break;
                case 'Другое':
                    this.$store.dispatch('getOther', {name : this.user.name, surname: this.user.surname, patronymic: this.user.patronymic, fieldofactivity : this.user.fieldofactivity, id: this.libraryId})
                    break;
                default:
                    this.$store.dispatch('getUsers', {name : this.user.name, surname: this.user.surname, patronymic: this.user.patronymic, id: this.libraryId})
                    break;
            }
        },
        loadData() {
            let user = localStorage.getItem('user-info');
            if (!user) {
                this.$router.push({ name: 'Login' })
            }

        }
    },
    async mounted() {
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

.window5 input{
    display: block;
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