import { createStore } from 'vuex'
import axios from 'axios';
import createPersistedState from "vuex-persistedstate"


const store = createStore({
    state () {
      return {
        librarians: [],
        works: [],
        cards: [],
        fund: [],
        users: [],
        populars: [],
        best: []
      }
    },
    plugins: [createPersistedState()],
    mutations: {
      setLibrarians(state, payload) {
        state.librarians = payload
      },
      setWorks(state, works){
        state.works = works;
      },
      setCards(state, cards){
        state.cards = cards;
      },
      setFund(state,fund){
        state.fund = fund;
      },
      setUsers(state,users){
        state.users = users;
      },
      setPopulars(state,populars){
        state.populars = populars.reverse()
      },
      setBest(state,best){
        state.best = best.reverse()
      }

    },
    getters: {
        getLibrarians(state){
            return state.librarians
        },
        getWorks(state){
            return state.works
        },
        getCards(state){
            return state.cards
        },
        getFund(state){
            return state.fund
        },
        getUsers(state){
            return state.users
        },
        getPopulars(state){
            return state.populars
        },
        getBests(state){
            return state.best
        }
    },
    actions : {
        async getAllLibrarians(context){
            let res = await axios.get("http://localhost:8080/librarian/getAll");
            context.commit('setLibrarians', res.data)
        },
        async getLibrariansRR(context, payload){
            console.warn(payload)
            let res = await axios.get(`http://localhost:8080/librarian/workInRR?readingRoomId=${payload}`);
            console.warn(res.data)
            context.commit('setLibrarians', res.data)
        },
        async getAllWorks(context){
            let result = await axios.get("http://localhost:8080/literaryWorks/getAll");
            context.commit('setWorks', result.data)
        },
        async getWorksShelf(context, data){
            let result = await axios.get(`http://localhost:8080/literaryWorks/onShelf?shelf=${data.shelf}&readingRoomId=${data.id}`);
            context.commit('setWorks', result.data)
        },
        async getAllCards(context){
            let result = await axios.get("http://localhost:8080/libraryCard/getAll");
            context.commit('setCards', result.data)
        },
        async getCardsEdition(context, data){
            let result = await axios.get(`http://localhost:8080/libraryCard/getUsersWithCard?id=${data.id}&startDate=${data.start}&endDate=${data.end}`);
            console.warn(result.data)
            context.commit('setCards', result.data)
        },
        async getAllFund(context){
            let result = await axios.get("http://localhost:8080/libraryFund/getAll");
            context.commit('setFund', result.data)
        },
        async getFundAuthor(context, id){
            let result = await axios.get(`http://localhost:8080/libraryFund/hasAuthor?authorId=${id}`);
            context.commit('setFund', result.data)
        },
        async getFundWork(context, id){
            let result = await axios.get(`http://localhost:8080/libraryFund/hasLiteraryWork?workId=${id}`);
            context.commit('setFund', result.data)
        },
        async getFundReciept(context, data){
            let result = await axios.get(`http://localhost:8080/libraryFund/receiptDate?startDate=${data.start}&endDate=${data.end}`);
            context.commit('setFund', result.data)
        },
        async getFundUsed(context, id){
            let result = await axios.get(`http://localhost:8080/libraryFund/usedByUser?userId=${id}`);
            context.commit('setFund', result.data)
        },
        async getFundGiven(context, id){
            let result = await axios.get(`http://localhost:8080/libraryFund/givenToUser?userId=${id}`);
            context.commit('setFund', result.data)
        },
        async getAllUsers(context){
            let result = await axios.get("http://localhost:8080/user/getAll");
            context.commit('setUsers', result.data)
        },
        async getUserBook(context, id){
            let result = await axios.get(`http://localhost:8080/user/haveEdition?id=${id}`);
            context.commit('setUsers', [result.data])
        },
        async getUserLibrarian(context, data){
            let result = await axios.get(`http://localhost:8080/user/servicedLibrarian?id=${data.id}&startDate=${data.start}&endDate=${data.end}`);
            context.commit('setUsers', result.data)
        },
        async getOverdue(context){
            let result = await axios.get("http://localhost:8080/user/overdue");
            context.commit('setUsers', result.data)
        },
        async getUserNotVisit(context, data){
            let result = await axios.get(`http://localhost:8080/user/notVisit?startDate=${data.start}&endDate=${data.end}`);
            
            context.commit('setUsers', result.data)
        },
        async getUserWork(context, id){
            let result = await axios.get(`http://localhost:8080/user/haveLiteraryWork?id=${id}`);
            context.commit('setUsers', [result.data])
        },
        async getPupils(context, data){
            let result = await axios.get(`http://localhost:8080/user/pupils?surname=${data.surname}&name=${data.name}&patronymic=${data.patronymic}&libraryId=${data.id}&schoolname=${data.schoolname}&classNum=${data.classNum}&letter=${data.letter}`);
            context.commit('setUsers', result.data)
        },
        async getPensioners(context, data){
            let result = await axios.get(`http://localhost:8080/user/pensioners?surname=${data.surname}&name=${data.name}&patronymic=${data.patronymic}&libraryId=${data.id}&pensioncertificatenumber=${data.pensioncertificatenumber}&age=${data.age}`);
            context.commit('setUsers', result.data)
        },
        async getScience(context,data){
            let result = await axios.get(`http://localhost:8080/user/scientificWorkers?surname=${data.surname}&name=${data.name}&patronymic=${data.patronymic}&libraryId=${data.id}&organizationname=${data.organizationname}&scientifictopic=${data.scientifictopic}&post=${data.post}`);
            context.commit('setUsers', result.data)
        },
        async getWorker(context,data){
            let result = await axios.get(`http://localhost:8080/user/workers?surname=${data.surname}&name=${data.name}&patronymic=${data.patronymic}&libraryId=${data.id}&organizationname=${data.organizationname}&specialization=${data.specialization}`);
            context.commit('setUsers', result.data)
        },
        async getTeacher(context,data){
            let result = await axios.get(`http://localhost:8080/user/teachers?surname=${data.surname}&name=${data.name}&patronymic=${data.patronymic}&libraryId=${data.id}&nameoftheeducationalintitution=${data.nameoftheeducationalintitution}&subject=${data.subject}&post=${data.post}`);
            context.commit('setUsers', result.data)
        },
        async getStudent(context,data){
            let result = await axios.get(`http://localhost:8080/user/students?surname=${data.surname}&name=${data.name}&patronymic=${data.patronymic}&libraryId=${data.id}&nameoftheeducationalintitution=${data.nameoftheeducationalintitution}&faculty=${data.faculty}&course=${data.course}&groupnumber=${data.groupnumber}`);
            context.commit('setUsers', result.data)
        },
        async getOther(context,data){
            let result = await axios.get(`http://localhost:8080/user/otherResidents?surname=${data.surname}&name=${data.name}&patronymic=${data.patronymic}&libraryId=${data.id}&fieldofactivity=${data.fieldofactivity}`);
            context.commit('setUsers', result.data)
        },
        async getUsers(context, data){
            let result = await axios.get(`http://localhost:8080/user/get?surname=${data.surname}&name=${data.name}&patronymic=${data.patronymic}&libraryId=${data.id}`);
            context.commit('setUsers', result.data)
        },
        async getPopular(context){
            let result = await axios.get("http://localhost:8080/literaryWorks/popular");
            console.warn(result.data)
            context.commit('setPopulars', result.data)
        },
        async getBest(context){
            let res = await axios.get("http://localhost:8080/librarian/productions");
            console.warn(res.data)
            context.commit('setBest', res.data)
        }
    },
  })

  export default store;