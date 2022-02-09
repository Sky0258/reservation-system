import { Promise } from "core-js";
import { reqUserInfo, reqUserLogin, reqUserLoginCheck, reqUserRegister, } from "../api";
const state = {
    token:'',
    userInfo:{}
};
const mutations = {
    USERLOGIN(state,token){
        state.token = token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
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
            commit("USERLOGIN",result.data.data);
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

    // 获取用户信息
    async getUserInfo({commit},code){
        let result = await reqUserInfo(code);
        //提交用户信息
        console.log(result);
        if(result.code == 200){
            console.log(result);
            commit("GETUSERINFO",result.data);
        }
        
    }
};
const getters = {
    token(state){
        return state.token;
    }
};
export default{
    state,
    mutations,
    actions,
    getters
}