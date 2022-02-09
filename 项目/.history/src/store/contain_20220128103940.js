import { Promise } from "core-js";


const state = {};
const mutations = {};
const actions = {
    //菜单
    async userMenu({commit},code){
        let result = await reqMenu(code);
        console.log(result.data);
        if(result.code == 200){
            // commit("USERLOGIN",result.data.token);
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