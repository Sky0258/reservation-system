import { Promise } from "core-js";
import { reqUserLogin, reqUserRegister } from "../api";
const state = {};
const mutations = {};
const actions = {
    //注册
    async userRegister({ commit },user){
       let result = await reqUserRegister(user);
       if(result.code == 200){
           return 'ok';
       }else{
           return Promise.reject(new Error('faile'));
       }
    },
    //登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
    }
};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters
}