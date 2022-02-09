import { Promise } from "core-js";
import { reqMenu, reqUserLogin, reqUserLoginCheck, reqUserRegister, } from "../api";
const state = {
    token:''
};
const mutations = {
    USERLOGIN(state,token){
        state.token = token;
    }
};
const actions = {
    //注册
    async userRegister({commit},user){
       let result = await reqUserRegister(user);
       console.log(result.data);
       console.log(result.data.code + '@11111111111111');
       if(result.data.code == 200){
           return 'ok';
       }else{
        //    return Promise.reject(new Error('faile'));
        return Promise.reject(new Error("faile"));
       }
    },
    //登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        console.log(result.data);
        console.log(result.data.code + '@11111111111111');
        if(result.data.code == 200){
            // commit("USERLOGIN",result.data.token);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    //验证码
    async userLoginCheck({commit},code){
        let result = await reqUserLoginCheck(code);
        console.log(result.data);
        if(result.code == 200){
            // commit("USERLOGIN",result.data.token);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

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
export default{
    state,
    mutations,
    actions,
    getters
}