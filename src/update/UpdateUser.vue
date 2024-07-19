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
        <button type="button" v-on:click="add">Изменить</button>
    </form>
    <button class="delete" type="button" v-on:click="del(user.id)">Удалить</button>
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
                id: '',
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
            startRole: '',
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
        async del(id){
            let result = await axios.delete(`http://localhost:8080/user/delete?id=${this.user.id}`)
            console.warn(result);

            if(result.status==200){
                this.$router.push({name:'Users'})
            }
        },
        async add(){
            let result = null;
            if (this.startRole != this.role){
                switch(this.startRole){
                    case 'Школьник': 
                        result = await axios.delete(`http://localhost:8080/user/delete/pupils?id=${this.$route.params.id}`)
                        break;
                    case 'Пенсионер':
                        result = await axios.delete(`http://localhost:8080/user/delete/pensioners?id=${this.$route.params.id}`)
                        break;
                    case 'Научный работник':
                        result = await axios.delete(`http://localhost:8080/user/delete/scientificWorkers?id=${this.$route.params.id}`)
                        break;
                    case 'Рабочий':
                        result = await axios.delete(`http://localhost:8080/user/delete/workers?id=${this.$route.params.id}`)
                        break;
                    case 'Преподаватель':
                        result = await axios.delete(`http://localhost:8080/user/delete/teachers?id=${this.$route.params.id}`)
                        break;
                    case 'Студент':
                        result = await axios.delete(`http://localhost:8080/user/delete/students?id=${this.$route.params.id}`)
                        break;
                    case 'Другое':
                        result = await axios.delete(`http://localhost:8080/user/delete/otherResidents?id=${this.$route.params.id}`)
                        break;
                    default:
                        console.warn('Nothing')

                }
                if (this.role == 'Школьник' && this.isValidPup()){
                    result = await axios.post(`http://localhost:8080/user/add/existPupils?schoolname=${this.user.schoolname}&classNum=${this.user.classNum}&letter=${this.user.letter}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Пенсионер' && this.isValidPensi()){
                    result = await axios.post(`http://localhost:8080/user/add/existPensioners?pensioncertificatenumber=${this.user.pensioncertificatenumber}&age=${this.user.age}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Научный работник' && this.isValidSince()){
                    result = await axios.post(`http://localhost:8080/user/add/existScientific?organizationname=${this.user.organizationname}&scientifictopic=${this.user.scientifictopic}&post=${this.user.post}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Рабочий' && this.isValidWorker()){
                    result = await axios.post(`http://localhost:8080/user/add/existWorker?organizationname=${this.user.organizationname}&specialization=${this.user.specialization}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Преподаватель' && this.isValidTeach()){
                    result = await axios.post(`http://localhost:8080/user/add/existTeacher?nameoftheeducationalintitution=${this.user.nameoftheeducationalintitution}&subject=${this.user.subject}&post=${this.user.post}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Студент' && this.isValidStud()){
                    result = await axios.post(`http://localhost:8080/user/add/existStudents?nameoftheeducationalintitution=${this.user.nameoftheeducationalintitution}&faculty=${this.user.faculty}&course=${this.user.course}&groupnumber=${this.user.groupnumber}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Другое' && this.isValidOther()){
                    result = await axios.post(`http://localhost:8080/user/add/existOther?fieldofactivity=${this.user.fieldofactivity}&id=${this.$route.params.id}`)
                }
                else{
                    this.error = 'Все поля должны быть заполнены'
                }
            } else {
                if (this.role == 'Школьник' && this.isValidPup()){
                    result = await axios.put(`http://localhost:8080/user/update/pupils?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}&libraryId=${this.library.id}&schoolname=${this.user.schoolname}&classNum=${this.user.classNum}&letter=${this.user.letter}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Пенсионер' && this.isValidPensi()){
                    result = await axios.put(`http://localhost:8080/user/update/pensioners?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}&libraryId=${this.library.id}&pensioncertificatenumber=${this.user.pensioncertificatenumber}&age=${this.user.age}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Научный работник' && this.isValidSince()){
                    result = await axios.put(`http://localhost:8080/user/update/scientificWorkers?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}&libraryId=${this.library.id}&organizationname=${this.user.organizationname}&scientifictopic=${this.user.scientifictopic}&post=${this.user.post}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Рабочий' && this.isValidWorker()){
                    result = await axios.put(`http://localhost:8080/user/update/workers?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}&libraryId=${this.library.id}&organizationname=${this.user.organizationname}&specialization=${this.user.specialization}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Преподаватель' && this.isValidTeach()){
                    result = await axios.put(`http://localhost:8080/user/update/teachers?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}&libraryId=${this.library.id}&nameoftheeducationalintitution=${this.user.nameoftheeducationalintitution}&subject=${this.user.subject}&post=${this.user.post}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Студент' && this.isValidStud()){
                    result = await axios.put(`http://localhost:8080/user/update/students?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}&libraryId=${this.library.id}&nameoftheeducationalintitution=${this.user.nameoftheeducationalintitution}&faculty=${this.user.faculty}&course=${this.user.course}&groupnumber=${this.user.groupnumber}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Другое' && this.isValidOther()){
                    result = await axios.put(`http://localhost:8080/user/update/otherResidents?surname=${this.user.surname}&name=${this.user.name}&patronymic=${this.user.patronymic}&libraryId=${this.library.id}&fieldofactivity=${this.user.fieldofactivity}&id=${this.$route.params.id}`)
                }
                else{
                    this.error = 'Все поля должны быть заполнены'
                }
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

            result = await axios.get(`http://localhost:8080/user/getById?id=${this.$route.params.id}`)
            this.user.id = result.data.id;
            this.user.name = result.data.name;
            this.user.surname = result.data.surname;
            this.user.patronymic = result.data.patronymic;
            this.library = result.data.library;
            if (result.data.schoolname){
                this.role = 'Школьник';
                this.startRole = 'Школьник';
                this.user.schoolname = result.data.schoolname;
                this.user.classNum = result.data.classNum;
                this.user.letter = result.data.letter;
            } else if (result.data.age){
                this.role = 'Пенсионер';
                this.startRole = 'Пенсионер';
                this.user.age = result.data.age;
                this.user.pensioncertificatenumber = result.data.pensioncertificatenumber;
            } else if (result.data.scientifictopic){
                this.role = 'Научный работник';
                this.startRole = 'Научный работник';
                this.user.post = result.data.post
                this.user.scientifictopic= result.data.scientifictopic;
                this.user.organizationname = result.data.organizationname;
            } else if (result.data.specialization){
                this.role = 'Рабочий';
                this.startRole = 'Рабочий';
                this.user.organizationname = result.data.organizationname
                this.user.specialization = result.data.specialization
            } else if (result.data.subject){
                this.role = 'Преподаватель';
                this.startRole = 'Преподаватель';
                this.user.post = result.data.post
                this.user.nameoftheeducationalintitution = result.data.nameoftheeducationalintitution
                this.user.subject = result.data.subject
            } else if (result.data.faculty){
                this.role = 'Студент';
                this.startRole = 'Студент';
                this.user.course = result.data.course;
                this.user.faculty = result.data.faculty;
                this.user.nameoftheeducationalintitution = result.data.nameoftheeducationalintitution
                this.user.groupnumber = result.data.groupnumber;
            } else if (result.data.fieldofactivity) {
                this.role = 'Другое';
                this.startRole = 'Другое';
                this.user.fieldofactivity = result.data.fieldofactivity
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
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    font-size: 15px;
}
</style>