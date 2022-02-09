import { Promise } from "core-js";
import { reqMenu } from "../api";


const state = {
    menu:{}
};
const mutations = {
    MENU(state,menu){
        state.menu = menu;
    }
};
const actions = {
    //菜单
    async userMenu({commit},code){
        let result = await reqMenu(code);
        console.log(result.data.data);
        if(result.data.code == 200){
            commit("MENU",result.data.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
};
const getters = {
    menu(state){
        return state.menu;
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}