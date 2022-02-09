import { Promise } from "core-js";
import { reqMenu } from "../api";


const state = {};
const mutations = {};
const actions = {
    //菜单
    async userMenu({commit},code){
        let result = await reqMenu(code);
        console.log(result.data.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
};
const getters = {};
export default {
    state,
    actions,
    mutations,
    getters
}