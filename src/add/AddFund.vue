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
        <select class="select" v-model="role">
            <option value="" disabled selected>Выберите категорию книги</option>
            <option v-for="item in roles">{{ item }}</option>
        </select>
        <p>Выберите тип статьи</p>
        <select class="select" v-model="article" v-if="role == 'Статья'">
            <option v-for="item in typeOfArticle" v-bind:value="item">{{ item.name }}</option>
        </select>
        <input v-if="role == 'Диссертация'" type="text" name="object" placeholder="Введите объект диссертации" v-model="book.object"/>
        <input v-if="role == 'Журнал' || role == 'Газета'" type="text" name="frequency" placeholder="Введите частоту выпуска" v-model="book.frequency"/>
        <input v-if="role == 'Журнал' || role == 'Газета'" type="text" name="format" placeholder="Введите формат выпуска" v-model="book.format"/>
        <input v-if="role == 'Журнал' || role == 'Газета'" type="text" name="thematics" placeholder="Введите тематику" v-model="book.thematics"/>
        <input v-if="role == 'Газета'" type="text" name="territory" placeholder="Введите территорию выпуска" v-model="book.territory"/>
        <p>Выберите тип романа</p>
        <select class="select" v-model="novel" v-if="role == 'Роман'">
            <option v-for="item in typeOfNovel" v-bind:value="item">{{ item.name }}</option>
        </select>
        <input v-if="role == 'Стихи'" type="text" name="theme" placeholder="Введите тему стихов" v-model="book.theme"/>
        <p>Выберите тип повести</p>
        <select class="select" v-model="story" v-if="role == 'Повесть'">
            <option v-for="item in typeOfStory" v-bind:value="item">{{ item.name }}</option>
        </select>
        <p>Выберите произведения, которые есть в книге</p>
        <select class="multiple" v-model="works" multiple>
            <option v-for="item in literaryWorks" v-bind:value="item">{{ item.id }} {{ item.name }}</option>
        </select>
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
            book:{
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
            readingrooms:[],
            readingroom:null,
            literaryWorks:[],
            works:[],
            error: ''
        }
    },
    methods:{
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
            if (this.role == 'Статья' && this.isValidArt()){
                result = await axios.post(`http://localhost:8080/libraryFund/add/articles?name=${this.book.name}&shelf=${this.book.shelf}&rack=${this.book.rack}&tohandout=${this.book.tohandout}&given=${this.book.given}&dateofreceipt=${this.book.dateofreceipt}&readingroomsId=${this.readingroom.id}&type=${this.article.id}`)
            }
            else if (this.role == 'Диссертация' && this.isValidDis()){
                result = await axios.post(`http://localhost:8080/libraryFund/add/articles?name=${this.book.name}&shelf=${this.book.shelf}&rack=${this.book.rack}&tohandout=${this.book.tohandout}&given=${this.book.given}&dateofreceipt=${this.book.dateofreceipt}&readingroomsId=${this.readingroom.id}&object=${this.book.object}`)
            }
            else if (this.role == 'Журнал' && this.isValidMag()){
                result = await axios.post(`http://localhost:8080/libraryFund/add/articles?name=${this.book.name}&shelf=${this.book.shelf}&rack=${this.book.rack}&tohandout=${this.book.tohandout}&given=${this.book.given}&dateofreceipt=${this.book.dateofreceipt}&readingroomsId=${this.readingroom.id}&frequency=${this.book.frequency}&format=${this.book.format}&thematics=${this.book.thematics}`)
            }
            else if (this.role == 'Газета' && this.isValidNews()){
                result = await axios.post(`http://localhost:8080/libraryFund/add/articles?name=${this.book.name}&shelf=${this.book.shelf}&rack=${this.book.rack}&tohandout=${this.book.tohandout}&given=${this.book.given}&dateofreceipt=${this.book.dateofreceipt}&readingroomsId=${this.readingroom.id}&frequency=${this.book.frequency}&format=${this.book.format}&thematics=${this.book.thematics}&territory=${this.book.territory}`)
            }
            else if (this.role == 'Роман' && this.isValidNov()){
                result = await axios.post(`http://localhost:8080/libraryFund/add/articles?name=${this.book.name}&shelf=${this.book.shelf}&rack=${this.book.rack}&tohandout=${this.book.tohandout}&given=${this.book.given}&dateofreceipt=${this.book.dateofreceipt}&readingroomsId=${this.readingroom.id}&type=${this.novel.id}`)
            }
            else if (this.role == 'Стихи' && this.isValidPoe()){
                result = await axios.post(`http://localhost:8080/libraryFund/add/articles?name=${this.book.name}&shelf=${this.book.shelf}&rack=${this.book.rack}&tohandout=${this.book.tohandout}&given=${this.book.given}&dateofreceipt=${this.book.dateofreceipt}&readingroomsId=${this.readingroom.id}&theme=${this.book.theme}`)
            }
            else if (this.role == 'Повесть' && this.isValidStory()){
                result = await axios.post(`http://localhost:8080/libraryFund/add/articles?name=${this.book.name}&shelf=${this.book.shelf}&rack=${this.book.rack}&tohandout=${this.book.tohandout}&given=${this.book.given}&dateofreceipt=${this.book.dateofreceipt}&readingroomsId=${this.readingroom.id}&type=${this.story.id}`)
            }
            else{
                this.error = 'Все поля должны быть заполнены'
            }
            console.warn(result);

            if(result.status==200){
                let idFund = result.data.id.toString();
                for (let i=0; i<this.works.length; i++){
                    let idWork = this.works[i].id.toString();
                    await axios.post(`http://localhost:8080/worksInFund/add?libraryfundId=${idFund}&literaryworksId=${idWork}`)
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
            console.warn(result)
            this.readingrooms=result.data;
            result = await axios.get("http://localhost:8080/literaryWorks/getAll");
            console.warn(result)
            this.literaryWorks=result.data;
    
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