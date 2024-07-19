import Home from './components/Home.vue'
import Login from './components/Login.vue'
import AddUser from './add/AddUser.vue'
import AddAuthor from './add/AddAuthor.vue'
import AddWork from './add/AddWorks.vue'
import AddCard from './add/AddCards.vue'
import AddFund from './add/AddFund.vue'
import AddLibrarian from './add/AddLibrarian.vue'
import UpdateAuthor from './update/UpdateAuthor.vue'
import UpdateLibrarians from './update/UpdateLibrarians.vue'
import UpdateCard from './update/UpdateCards.vue'
import UpdateWorks from './update/UpdateWorks.vue'
import UpdateFund from './update/UpdateFund.vue'
import UpdateUser from './update/UpdateUser.vue'
import Librarians from './components/Librarians.vue'
import Users from './components/Users.vue'
import Cards from './components/Cards.vue'
import Works from './components/Works.vue'
import Fund from './components/Fund.vue'
import Authors from './components/Author.vue'
import Popular from './components/Popular.vue'
import Best from './components/Best.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: 'Home',
        component: Home,
        path: '/'
    },
    {
        name: 'Login',
        component: Login,
        path: '/login'
    },
    {
        name: 'AddUser',
        component: AddUser,
        path: '/add/user'
    },
    {
        name: 'AddAuthor',
        component: AddAuthor,
        path: '/add/author'
    },
    {
        name: 'AddCard',
        component: AddCard,
        path: '/add/card'
    },
    {
        name: 'AddWork',
        component: AddWork,
        path: '/add/work'
    },
    {
        name: 'AddFund',
        component: AddFund,
        path: '/add/fund'
    },
    {
        name: 'AddLibrarian',
        component: AddLibrarian,
        path: '/add/librarian'
    },
    {
        name: 'UpdateAuthor',
        component: UpdateAuthor,
        path: '/updateAuthor/:id'
    },
    {
        name: 'UpdateLibtatians',
        component: UpdateLibrarians,
        path: '/updateLibrarians/:id'
    },
    {
        name: 'UpdateWorks',
        component: UpdateWorks,
        path: '/updateWorks/:id'
    },
    {
        name: 'UpdateCard',
        component: UpdateCard,
        path: '/updateCard/:id'
    },
    {
        name: 'UpdateFund',
        component: UpdateFund,
        path: '/updateFund/:id'
    },
    {
        name: 'UpdateUser',
        component: UpdateUser,
        path: '/updateUser/:id'
    },
    {
        name: 'Users',
        component: Users,
        path: '/users'
    },
    {
        name: 'Librarians',
        component: Librarians,
        path: '/librarians',
    },
    {
        name: 'Cards',
        component: Cards,
        path: '/cards'
    },
    {
        name: 'Fund',
        component: Fund,
        path: '/fund'
    },
    {
        name: 'Works',
        component: Works,
        path: '/works'
    },
    {
        name: 'Authors',
        component: Authors,
        path: '/authors'
    },
    {
        name: 'Popular',
        component: Popular,
        path: '/popular'
    },
    {
        name: 'Best',
        component: Best,
        path: '/best'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;