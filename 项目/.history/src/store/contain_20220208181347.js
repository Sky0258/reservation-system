import { Promise } from "core-js";
import { reqCreateManager, reqManagerInfo, reqMenu,reqUserChange,reqUserPass } from "../api";


const state = {
    menu:{},
    managerInfo:{}
};
const mutations = {
    MENU(state,menu){
        state.menu = menu;
    },
    MANAGERINFO(state,managerInfo){
        state.managerInfo = managerInfo;
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
    //修改用户信息
    async userChange({commit},{userId,data}){
        let result = await reqUserChange(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            // commit("MENU",result.data.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //修改密码
    async userChangePass({commit},{userId,data}){
        let result = await reqUserPass(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            // commit("MENU",result.data.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //获取全部管理员信息
    async managerInfo({commit},{userId}){
        let result = await reqManagerInfo(userId);
        console.log(result.data);
        if(result.data.code == 200){
            commit("MANAGERINFO",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //添加管理员
    async createManager({commit},{administratorId,userId}){
        let result = await reqCreateManager(administratorId,userId);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //删除管理员
    
};
const getters = {
    menu(state){
        return state.menu.children;
    },
    managerInfo(state){
        return state.managerInfo || {};
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}