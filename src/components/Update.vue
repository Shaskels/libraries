<template>
    <Header />
    <h1>
        Hello User, Welcome on Update Page
    </h1>
    <form class="add">
        <input type="text" name="name" placeholder="Введите имя" v-model="resturant.name"/>
        <input type="text" name="address" placeholder="Введите имя" v-model="resturant.address"/>
        <input type="text" name="contact" placeholder="Введите имя" v-model="resturant.contact"/>
        <button type="button" v-on:click="update">Update</button>
    </form>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios'
export default {
    name: 'Update',
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
        async update(){
            const result = await axios.put("http://localhost:3000/resturants/"+this.$route.params.id,{
                name:this.resturant.name,
                address:this.resturant.address,
                contact:this.resturant.contact
            });
            if(result.status==200){
                this.$router.push({name:'Home'})
            }
            console.warn(result);
        }
    },
    async mounted(){
        let user = localStorage.getItem('user-info');
        if(!user){
            this.$router.push({name:'SignUp'})
        }
        const result = await axios.get('http://localhost:3000/resturants/'+this.$route.params.id)
        this.resturant=result.data
    }
}
</script>