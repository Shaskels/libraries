<template>
    <Header />
    <form class="add">
        <h1 >Заполните все поля</h1>
        <p class="error">{{ error }}</p>
        <input type="text" name="name" placeholder="Введите имя" v-model="user.name"/>
        <input type="text" name="surname" placeholder="Введите фамилию" v-model="user.surname"/>
        <input type="text" name="patronymic" placeholder="Введите отчество" v-model="user.patronymic"/>
        <p>Выберите библиотеку</p>
        <select v-model="library">
            <option v-for="item in libraries" v-bind:value="item">{{ item.name }}</option>
        </select>
        <p>Выберите категорию граждан</p>
        <select v-model="role">
            <option v-for="item in roles">{{ item }}</option>
        </select>
        <input v-if="role == 'Школьник'" type="text" name="schoolname" placeholder="Введите название школы" v-model="user.schoolname"/>
        <input v-if="role == 'Школьник'" type="text" name="classNum" placeholder="Введите номер класса" v-model="user.classNum"/>
        <input v-if="role == 'Школьник'" type="text" name="letter" placeholder="Введите букву класса" v-model="user.letter"/>
        <input v-if="role == 'Пенсионер'" type="text" name="pensioncertificatenumber" placeholder="Введите номер пенсионного" v-model="user.pensioncertificatenumber"/>
        <input v-if="role == 'Пенсионер'" type="text" name="age" placeholder="Введите возраст" v-model="user.age"/>
        <input v-if="role == 'Научный работник' || role=='Рабочий'" type="text" name="organizationname" placeholder="Введите название организации" v-model="user.organizationname"/>
        <input v-if="role == 'Научный работник'" type="text" name="scientifictopic" placeholder="Введите научную тему" v-model="user.scientifictopic"/>
        <input v-if="role == 'Научный работник' || role=='Преподаватель'" type="text" name="post" placeholder="Введите должность" v-model="user.post"/>
        <input v-if="role == 'Рабочий'" type="text" name="specialization" placeholder="Введите специальность" v-model="user.specialization"/>
        <input v-if="role == 'Преподаватель' || role=='Студент'" type="text" name="nameoftheeducationalintitution" placeholder="Введите название образовательной организации" v-model="user.nameoftheeducationalintitution"/>
        <input v-if="role == 'Преподаватель'" type="text" name="subject" placeholder="Введите предмет" v-model="user.subject"/>
        <input v-if="role == 'Студент'" type="text" name="faculty" placeholder="Введите факультет" v-model="user.faculty"/>
        <input v-if="role == 'Студент'" type="text" name="course" placeholder="Введите курс" v-model="user.course"/>
        <input v-if="role == 'Студент'" type="text" name="groupnumber" placeholder="Введите номер группы" v-model="user.groupnumber"/>
        <input v-if="role == 'Другое'" type="text" name="fieldofactivity" placeholder="Введите род деятельности" v-model="user.fieldofactivity"/>
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
            libraries:[],
            library:null,
            error: ''
        }
    },
    methods:{
        isValid(){
            return this.user.name != '' && this.user.surname != '' && this.user.patronymic != ''
            && this.library != null;
        },
        isValidPup(){
            return this.isValid() && this.user.classNum != '' && this.user.schoolname != ''
            && this.user.letter != '';
        },
        isValidPensi(){
            return this.isValid() && this.user.age != '' && this.user.pensioncertificatenumber != '';
        },
        isValidSince(){
            return this.isValid() && this.user.post != '' && this.user.scientifictopic != '' 
            && this.user.organizationname != '';
        },
        isValidTeach(){
            return this.isValid() && this.user.nameoftheeducationalintitution != '' && 
            this.user.subject != '' && this.user.post != '';
        },
        isValidWorker(){
            return this.isValid() && this.user.organizationname != '' && this.user.specialization != '';
        },
        isValidStud(){
            return this.isValid() && this.user.nameoftheeducationalintitution != '' && this.user.faculty != ''
            && this.user.course != '' && this.user.groupnumber != '';
        },
        isValidOther(){
            return this.isValid() && this.user.fieldofactivity != '';
        },
        async add(){
            let result = null;
            if (this.role == 'Школьник' && this.isValidPup()){
                result = await axios.post(`http://localhost:8080/user/add/pupils?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}&libraryId=${this.library.id}&schoolname=${this.user.schoolname}&classNum=${this.user.classNum}&letter=${this.user.letter}`)
            }
            else if (this.role == 'Пенсионер' && this.isValidPensi()){
                result = await axios.post(`http://localhost:8080/user/add/pensioners?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}&libraryId=${this.library.id}&pensioncertificatenumber=${this.user.pensioncertificatenumber}&age=${this.user.age}`)
            }
            else if (this.role == 'Научный работник' && this.isValidSince()){
                result = await axios.post(`http://localhost:8080/user/add/scientificWorkers?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}&libraryId=${this.library.id}&organizationname=${this.user.organizationname}&scientifictopic=${this.user.scientifictopic}&post=${this.user.post}`)
            }
            else if (this.role == 'Рабочий' && this.isValidWorker()){
                result = await axios.post(`http://localhost:8080/user/add/workers?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}&libraryId=${this.library.id}&organizationname=${this.user.organizationname}&specialization=${this.user.specialization}`)
            }
            else if (this.role == 'Преподаватель' && this.isValidTeach()){
                result = await axios.post(`http://localhost:8080/user/add/teachers?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}&libraryId=${this.library.id}&nameoftheeducationalintitution=${this.user.nameoftheeducationalintitution}&subject=${this.user.subject}&post=${this.user.post}`)
            }
            else if (this.role == 'Студент' && this.isValidStud()){
                result = await axios.post(`http://localhost:8080/user/add/students?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}&libraryId=${this.library.id}&nameoftheeducationalintitution=${this.user.nameoftheeducationalintitution}&faculty=${this.user.faculty}&course=${this.user.course}&groupnumber=${this.user.groupnumber}`)
            }
            else if (this.role == 'Другое' && this.isValidOther()){
                result = await axios.post(`http://localhost:8080/user/add/otherResidents?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}&libraryId=${this.library.id}&fieldofactivity=${this.user.fieldofactivity}`)
            }
            else{
                this.error = 'Все поля должны быть заполнены'
            }
            console.warn(result);

            if(result.status==200){
                this.$router.push({name:'Users'})
            }

        },
        async loadData(){
            let user = localStorage.getItem('user-info');
            if(!user){
            this.$router.push({name:'Login'})
            }

            let result = await axios.get("http://localhost:8080/library/getAll");
            console.warn(result)
            this.libraries=result.data;
    
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
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    font-size: 15px;
}
</style>