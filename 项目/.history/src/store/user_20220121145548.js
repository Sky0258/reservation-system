import { Promise } from "core-js";
import { reqUserLogin, reqUserRegister } from "../api";
const state = {};
const mutations = {
    USERLOGIN(state,token){
        state.
    }
};
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
        console.log(result);
        if(result.code == 200){
            commit("USERLOGIN",result.data.token);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    }
};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters
}