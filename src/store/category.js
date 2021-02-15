import firebase from "firebase/app"
export default {
    state: {
        category: []
    },
    mutations: {
    },
    actions: {
        async createCategory({dispatch,commit},{name,limit}) {
            try{ 
                const uid = await dispatch("getUserId");
                const category = await firebase.database().ref(`/users/${uid}/categories`).push({name,limit})

                return {name, limit, id: category.key}
            }catch(e) {
                commit("setError",e)
                throw e;
            }
        },
        async fetchCategories({dispatch,commit}) {
            try{ 
                const uid = await dispatch("getUserId");
                const categories = (await firebase.database().ref(`/users/${uid}/categories`).once("value")).val() || {};
                return Object.keys(categories).map(key => ({...categories[key], id: key}))
            }catch(e) {
                commit("setError",e)
                throw e;
            }
        },
        async fetchCategoryById({dispatch,commit},id) {
            try{ 
                const uid = await dispatch("getUserId");
                const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once("value")).val() || {};
                return {...category,id}
            }catch(e) {
                commit("setError",e)
                throw e;
            }
        },
        async categoryUpdate({dispatch,commit},{name,limit,id}) {
            try{ 
                const uid = await dispatch("getUserId");
                await firebase.database().ref(`/users/${uid}/categories`).child(id).update({name,limit})
            }catch(e) {
                commit("setError",e)
                throw e;
            }
        }
    },
    getters: {

    }
}