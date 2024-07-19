<template>
    <Header />
    <form class="add">
        <h1 >Заполните все поля</h1>
        <p class="error">{{ error }}</p>
        <input type="text" name="name" placeholder="Введите название" v-model="book.name"/>
        <input type="text" name="shelf" placeholder="Введите номер полки" v-model="book.shelf"/>
        <input type="text" name="rack" placeholder="Введите номер стеллажа" v-model="book.rack"/>
        <p>Выберите читальный зал</p>
        <select class="select" v-model="readingroom">
            <option v-for="item in readingrooms" v-bind:value="item">{{ item.id }}</option>
        </select>
        <p>Можно ли выдавать на руки?</p>
        <input type="checkbox" checked="false" name="tohandout" placeholder="Введите номер стеллажа" v-model="book.tohandout"/>
        <p>Выберите дату получения</p>
        <input type="date" v-model="book.dateofreceipt" placeholder="Выберите дату"/>
        <p>Выберите категорию книги</p>
        <select class="select" v-model="role">
            <option v-for="item in roles">{{ item }}</option>
        </select>
        <p v-if="role == 'Статья'">Выберите тип статьи</p>
        <select class="select" v-model="article" v-if="role == 'Статья'">
            <option v-for="item in typeOfArticle" v-bind:value="item">{{ item.name }}</option>
        </select>
        <input v-if="role == 'Диссертация'" type="text" name="object" placeholder="Введите объект диссертации" v-model="book.object"/>
        <input v-if="role == 'Журнал' || role == 'Газета'" type="text" name="frequency" placeholder="Введите частоту выпуска" v-model="book.frequency"/>
        <input v-if="role == 'Журнал' || role == 'Газета'" type="text" name="format" placeholder="Введите формат выпуска" v-model="book.format"/>
        <input v-if="role == 'Журнал' || role == 'Газета'" type="text" name="thematics" placeholder="Введите тематику" v-model="book.thematics"/>
        <input v-if="role == 'Газета'" type="text" name="territory" placeholder="Введите территорию выпуска" v-model="book.territory"/>
        <p v-if="role == 'Роман'">Выберите тип романа</p>
        <select class="select" v-model="novel" v-if="role == 'Роман'">
            <option v-for="item in typeOfNovel" v-bind:value="item">{{ item.name }}</option>
        </select>
        <input v-if="role == 'Стихи'" type="text" name="theme" placeholder="Введите тему стихов" v-model="book.theme"/>
        <p v-if="role == 'Повесть'">Выберите тип повести</p>
        <select class="select" v-model="story" v-if="role == 'Повесть'">
            <option v-for="item in typeOfStory" v-bind:value="item">{{ item.name }}</option>
        </select>
        <p>Выберите произведения, которые есть в книге</p>
        <select class="multiple" v-model="works" multiple>
            <option v-for="item in literaryWorks" v-bind:value="item">{{ item.id }} {{ item.name }}</option>
        </select>
        <button type="button" v-on:click="add">Изменить</button>
    </form>
    <button class="delete" type="button" v-on:click="del(book.id)">Удалить</button>
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
            book:{
                id: '',
                name:'',
                shelf:'',
                rack:'',
                tohandout:'',
                given:'false',
                dateofreceipt:'',
                object:'',
                frequency:'',
                format:'',
                thematics:'',
                territory:'',
                theme:''
            },
            roles:[
                'Статья',
                'Диссертация',
                'Журнал',
                'Газета',
                'Роман',
                'Стихи',
                'Повесть'
            ],
            typeOfArticle:[
                {id:'0', name:'Передовая'},
                {id:'1', name:'Научная'},
                {id:'2', name:'Информационная'},
                {id:'3', name:'Общеисследовательская'},
                {id:'4', name:'Практико-аналитическая'}
            ],
            typeOfNovel:[
                {id:'0', name:'Фантастический'},
                {id:'1', name:'Исторический'},
                {id:'2', name:'Романтический'},
                {id:'3', name:'Детективный'},
                {id:'4', name:'Психологический'}
            ],
            typeOfStory:[
                {id:'0', name:'Фантастическая'},
                {id:'1', name:'Романтическая'},
                {id:'2', name:'Детективная'},
                {id:'3', name:'Сентиментальная'},
                {id:'4', name:'Реалистичная'},
                {id:'5', name:'Сказочная'},
            ],
            article:null,
            novel:null,
            story:null,
            role:'',
            startRole:'',
            readingrooms:[],
            readingroom:null,
            literaryWorks:[],
            works:[],
            startWorks:[],
            error: ''
        }
    },
    methods:{
        format_date(value){
            if (value) {
                return moment(String(value)).format('YYYY-MM-DD')
            }
        },
        async del(id){
            let result = await axios.delete(`http://localhost:8080/libraryFund/delete?id=${this.book.id}`)
            console.warn(result);

            if(result.status==200){
                this.$router.push({name:'Fund'})
            }
        },
        tryIn(){
            this.isValid()
            console.warn(this.book, this.works, this.novel)
        },
        isValid(){
            if (this.book.tohandout == false) this.book.tohandout = 'false'
            else this.book.tohandout = 'true';
            return this.book.name != '' && this.book.shelf != '' && this.book.rack != ''
            && this.book.tohandout != '' && this.book.dateofreceipt != '' && this.readingroom != null;
        },
        isValidArt(){
            return this.isValid() && this.article != null;
        },
        isValidDis(){
            return this.isValid() && this.object != '';
        },
        isValidMag(){
            return this.isValid() && this.book.frequency != '' && this.book.thematics != ''
            && this.book.format != '';
        },
        isValidNews(){
            return this.isValid() && this.book.frequency != '' && this.book.thematics != ''
            && this.book.format != '' && this.book.territory != '';
        },
        isValidNov(){
            return this.isValid() && this.novel != null;
        },
        isValidPoe(){
            return this.isValid() && this.book.theme != null;
        },
        isValidStory(){
            return this.isValid() && this.story != null;
        },
        async add(){
            let result = null;
            if (this.startRole != this.role){
                switch (this.startRole){
                    case 'Статья': 
                        result = await axios.delete(`http://localhost:8080/libraryFund/delete/article?id=${this.$route.params.id}`)
                        break;
                    case 'Диссертация':
                        result = await axios.delete(`http://localhost:8080/libraryFund/delete/dissertations?id=${this.$route.params.id}`)
                        break;
                    case 'Журнал':
                        result = await axios.delete(`http://localhost:8080/libraryFund/delete/magazines?id=${this.$route.params.id}`)
                        break;
                    case 'Газета':
                        result = await axios.delete(`http://localhost:8080/libraryFund/delete/newspapers?id=${this.$route.params.id}`)
                        break;
                    case 'Роман':
                        result = await axios.delete(`http://localhost:8080/libraryFund/delete/novels?id=${this.$route.params.id}`)
                        break;
                    case 'Стихи':
                        result = await axios.delete(`http://localhost:8080/libraryFund/delete/poetry?id=${this.$route.params.id}`)
                        break;
                    case 'Повесть':
                        result = await axios.delete(`http://localhost:8080/libraryFund/delete/story?id=${this.$route.params.id}`)
                        break;
                    default:
                        console.warn('Nothing')
                }

                if (this.role == 'Статья' && this.isValidArt()){
                result = await axios.post(`http://localhost:8080/libraryFund/add/existArticle?type=${this.article.id}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Диссертация' && this.isValidDis()){
                result = await axios.post(`http://localhost:8080/libraryFund/add/existDis?object=${this.book.object}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Журнал' && this.isValidMag()){
                result = await axios.post(`http://localhost:8080/libraryFund/add/existMag?frequency=${this.book.frequency}&format=${this.book.format}&thematics=${this.book.thematics}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Газета' && this.isValidNews()){
                result = await axios.post(`http://localhost:8080/libraryFund/add/existNew?frequency=${this.book.frequency}&format=${this.book.format}&thematics=${this.book.thematics}&territory=${this.book.territory}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Роман' && this.isValidNov()){
                result = await axios.post(`http://localhost:8080/libraryFund/add/existNovel?type=${this.novel.id}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Стихи' && this.isValidPoe()){
                result = await axios.post(`http://localhost:8080/libraryFund/add/existPoetry?theme=${this.book.theme}&id=${this.$route.params.id}`)
                }
                else if (this.role == 'Повесть' && this.isValidStory()){
                result = await axios.post(`http://localhost:8080/libraryFund/add/existStory?type=${this.story.id}&id=${this.$route.params.id}`)
                }
                else{
                this.error = 'Все поля должны быть заполнены'
                }
            } else {
            if (this.role == 'Статья' && this.isValidArt()){
                result = await axios.put(`http://localhost:8080/libraryFund/update/articles?name=${this.book.name}&shelf=${this.book.shelf}&rack=${this.book.rack}&tohandout=${this.book.tohandout}&given=${this.book.given}&dateofreceipt=${this.book.dateofreceipt}&readingroomsId=${this.readingroom.id}&type=${this.article.id}&id=${this.$route.params.id}`)
            }
            else if (this.role == 'Диссертация' && this.isValidDis()){
                result = await axios.put(`http://localhost:8080/libraryFund/update/dissertations?name=${this.book.name}&shelf=${this.book.shelf}&rack=${this.book.rack}&tohandout=${this.book.tohandout}&given=${this.book.given}&dateofreceipt=${this.book.dateofreceipt}&readingroomsId=${this.readingroom.id}&object=${this.book.object}&id=${this.$route.params.id}`)
            }
            else if (this.role == 'Журнал' && this.isValidMag()){
                result = await axios.put(`http://localhost:8080/libraryFund/update/magazines?name=${this.book.name}&shelf=${this.book.shelf}&rack=${this.book.rack}&tohandout=${this.book.tohandout}&given=${this.book.given}&dateofreceipt=${this.book.dateofreceipt}&readingroomsId=${this.readingroom.id}&frequency=${this.book.frequency}&format=${this.book.format}&thematics=${this.book.thematics}&id=${this.$route.params.id}`)
            }
            else if (this.role == 'Газета' && this.isValidNews()){
                result = await axios.put(`http://localhost:8080/libraryFund/update/newspapers?name=${this.book.name}&shelf=${this.book.shelf}&rack=${this.book.rack}&tohandout=${this.book.tohandout}&given=${this.book.given}&dateofreceipt=${this.book.dateofreceipt}&readingroomsId=${this.readingroom.id}&frequency=${this.book.frequency}&format=${this.book.format}&thematics=${this.book.thematics}&territory=${this.book.territory}&id=${this.$route.params.id}`)
            }
            else if (this.role == 'Роман' && this.isValidNov()){
                result = await axios.put(`http://localhost:8080/libraryFund/update/novels?name=${this.book.name}&shelf=${this.book.shelf}&rack=${this.book.rack}&tohandout=${this.book.tohandout}&given=${this.book.given}&dateofreceipt=${this.book.dateofreceipt}&readingroomsId=${this.readingroom.id}&type=${this.novel.id}&id=${this.$route.params.id}`)
            }
            else if (this.role == 'Стихи' && this.isValidPoe()){
                result = await axios.put(`http://localhost:8080/libraryFund/update/poetry?name=${this.book.name}&shelf=${this.book.shelf}&rack=${this.book.rack}&tohandout=${this.book.tohandout}&given=${this.book.given}&dateofreceipt=${this.book.dateofreceipt}&readingroomsId=${this.readingroom.id}&theme=${this.book.theme}&id=${this.$route.params.id}`)
            }
            else if (this.role == 'Повесть' && this.isValidStory()){
                result = await axios.put(`http://localhost:8080/libraryFund/update/story?name=${this.book.name}&shelf=${this.book.shelf}&rack=${this.book.rack}&tohandout=${this.book.tohandout}&given=${this.book.given}&dateofreceipt=${this.book.dateofreceipt}&readingroomsId=${this.readingroom.id}&type=${this.story.id}&id=${this.$route.params.id}`)
            }
            else{
                this.error = 'Все поля должны быть заполнены'
            }
            }
            console.warn(result);

            if(result.status==200){ 
                if (this.startWorks != this.works){
                    let idFund = result.data.id.toString();
                    for (let i=0; i<this.works.length; i++){
                        let idWork = this.works[i].id.toString();
                        await axios.post(`http://localhost:8080/worksInFund/add?libraryfundId=${idFund}&literaryworksId=${idWork}`)
                    }
                }
                this.$router.push({name:'Fund'})
            }

        },
        async loadData(){
            let user = localStorage.getItem('user-info');
            if(!user){
            this.$router.push({name:'Login'})
            }

            let result = await axios.get("http://localhost:8080/librarian/readingRoom/getAll");
            this.readingrooms=result.data;
            result = await axios.get("http://localhost:8080/literaryWorks/getAll");
            this.literaryWorks=result.data;

            result = await axios.get(`http://localhost:8080/libraryFund/getById?id=${this.$route.params.id}`)
            console.warn(result)
            this.book.id = result.data.id
            this.book.given=result.data.given
            this.book.name=result.data.name
            this.book.rack=result.data.rack
            this.book.shelf=result.data.shelf
            this.book.tohandout = result.data.tohandout
            this.readingroom = result.data.readingrooms;
            this.book.dateofreceipt = this.format_date(result.data.dateofreceipt)
            if (result.data.object){
                this.startRole = 'Диссертация'
                this.role = 'Диссертация'
                this.book.object = result.data.object
            } else if (result.data.territory){
                this.startRole = 'Газета'
                this.role = 'Газета'
                this.book.format = result.data.format;
                this.book.frequency = result.data.frequency;
                this.book.thematics = result.data.thematics;
                this.book.territory = result.data.territory;
            } else if (result.data.frequency){
                this.startRole = 'Журнал'
                this.role = 'Журнал'
                this.book.format = result.data.format;
                this.book.frequency = result.data.frequency;
                this.book.thematics = result.data.thematics;
            } else if (result.data.theme){
                this.startRole = 'Стихи'
                this.role = 'Стихи'
                this.book.theme = result.data.theme
            } else if (result.data.typeOfStory){
                this.startRole = 'Повесть'
                this.role = 'Повесть'
                this.story = this.typeOfStory[result.data.typeOfStory]
            } else if (result.data.typeOfNovel){
                this.startRole = 'Роман'
                this.role = 'Роман'
                this.novel = this.typeOfNovel[result.data.typeOfNovel]
            } else if (result.data.typeOfArticle){
                this.startRole = 'Статья'
                this.role = 'Статья'
                this.article = this.typeOfArticle[result.data.typeOfArticle]
            }
            result = await axios.get(`http://localhost:8080/worksInFund/getWorks?id=${this.$route.params.id}`)
            console.warn(result)
            this.works = result.data;
            this.startWorks = result.data;
    
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
.add .select{
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
.add .multiple {
    height: 80px;
    width: 400px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.add p{
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    font-size: 15px;
}
</style>