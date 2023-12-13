import { defineStore } from 'pinia';
export const useuserInfoStore = defineStore('userInfoStore',{
    state:() =>{
        return {
            isLogin : false,
            userInfo : null,
        }
    },
    getters:{
        
    },
    actions:{

    }
})