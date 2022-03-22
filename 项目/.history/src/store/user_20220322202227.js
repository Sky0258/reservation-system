import { Promise } from "core-js";
import { reqUserInfo1,reqLogout, reqUserInfo, reqUserLogin, reqUserLoginCheck, reqUserRegister, } from "../api";
import { setToken } from "../utils/auth";
const state = {
    token:localStorage.getItem('TOKEN'),
    userInfo:{},
    userInfo1:{},
    message:"",
};
const mutations = {
    MESSAGE(state,message){
        state.message = message;
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    GETUSERINFO1(state,userInfo1){
        state.userInfo1 = userInfo1;
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
            localStorage.setItem("TOKEN",result.data.data);
            return "ok";
        }else{
            commit("MESSAGE",result.data.msg);
            return Promise.reject(new Error('faile'));
        }
    },
    //注销
    async userLogout({commit},data){
        let result = await reqLogout(data);
        if(result.data.code == 200){
            console.log(result.data + '注销成功');
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

    // 获取用户信息【token】
    async getUserInfo({commit},code){
        let result = await reqUserInfo(code);
        //提交用户信息
        console.log(result);
        if(result.data.code == 200){
            commit("GETUSERINFO",result.data);
        }
        
    },

    // 获取用户信息【userId】
    async getUserInfo1({commit},userId){
        let result = await reqUserInfo1(201841412101);
        //提交用户信息
        console.log(result);
        if(result.data.code == 200){
            commit("GETUSERINFO1",result.data);
        }
    }
};
const getters = {
    token(state){
        return state.token;
    },
    userInfo(state){
        return state.userInfo || {};
    },
    userInfo1(state){
        return state.userInfo1 || {};
    },
    message(state){
        return state.message;
    }
};
export default{
    state,
    mutations,
    actions,
    getters
}