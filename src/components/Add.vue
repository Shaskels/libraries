<template>
    <Header />
    <h1>
        Hello User, Welcome on Add Page
    </h1>
    <form class="add">
        <input type="text" name="name" placeholder="Введите имя" v-model="resturant.name"/>
        <input type="text" name="address" placeholder="Введите имя" v-model="resturant.address"/>
        <input type="text" name="contact" placeholder="Введите имя" v-model="resturant.contact"/>
        <button type="button" v-on:click="add">Add new</button>
    </form>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios'
export default {
    name: 'Add',
    components:{
        Header
    },
    data(){
        return{
            resturant:{
                name:'',
                address:'',
                contact:'',
            }
        }
    },
    methods:{
        async add(){
            const result = await axios.post("http://localhost:3000/resturants",{
                name:this.resturant.name,
                address:this.resturant.address,
                contact:this.resturant.contact
            });
            if(result.status==201){
                this.$router.push({name:'Home'})
            }
            console.warn(result);
        }
    },
    mounted(){
        let user = localStorage.getItem('user-info');
        if(!user){
            this.$router.push({name:'SignUp'})
        }
    }
}
</script>