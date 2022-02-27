import { Promise } from "core-js";
import { reqSiteAllList,reqSiteOrderList,reqEquipmentOrderList,reqOrderEquipment,reqCreateManager, reqDeleteManager, reqManagerInfo, reqMenu,reqUserChange,reqUserPass, reqUsers } from "../api";


const state = {
    menu:{},
    managerInfo:{},
    allUsersInfo:{},
    equipmentOrderList:{},
    siteOrderList:{},
    siteAllList:{},
    // equipmentAllList:{}
};
const mutations = {
    MENU(state,menu){
        state.menu = menu;
    },
    MANAGERINFO(state,managerInfo){
        state.managerInfo = managerInfo;
    },
    ALLUSERSINFO(state,allUsersInfo){
        state.allUsersInfo = allUsersInfo;
    },
    EQUIPMENTORDERLIST(state,equipmentOrderList){
        state.equipmentOrderList = equipmentOrderList;
    },
    SITEORDERLIST(state,siteOrderList){
        state.siteOrderList = siteOrderList;
    },
    SITEALLLIST(state,siteAllList){
        state.siteAllList = siteAllList;
    },
    // EQUIPMENTALLLIST(state,equipmentAllList){
    //     state.equipmentAllList = equipmentAllList;
    // }
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
    async deleteManager({commit},{administratorId,userId}){
        let result = await reqDeleteManager(administratorId,userId);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //获取全部用户信息
    async allUsersInfo({commit},{userId,data}){
        let result = await reqUsers(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            commit("ALLUSERSINFO",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //预约器材
    async orderEquipment({commit},{userId,data}){
        let result = await reqOrderEquipment(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //个人查询器材预约记录
    async equipmentOrderList({commit},{userId,data}){
        let result = await reqEquipmentOrderList(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            commit("EQUIPMENTORDERLIST",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

     //个人查询场地预约记录
     async siteOrderList({commit},{userId,data}){
        let result = await reqSiteOrderList(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            commit("SITEORDERLIST",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //管理员查询场地订单
    async siteAllList({commit},{userId,data}){
        let result = await reqSiteAllList(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            commit("SITEALLLIST",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //管理员查询器材订单
    // async equipmentAllList({commit},{userId,data}){
    //     let result = await reqEquipmentAllList(userId,data);
    //     console.log(result.data);
    //     if(result.data.code == 200){
    //         commit("EQUIPMENTALLLIST",result.data);
    //         return "ok";
    //     }else{
    //         return Promise.reject(new Error("faile"));
    //     }
    // },
};
const getters = {
    menu(state){
        return state.menu.children;
    },
    managerInfo(state){
        return state.managerInfo || {};
    },
    allUsersInfo(state){
        return state.allUsersInfo || {};
    },
    equipmentOrderList(state) {
        return state.equipmentOrderList || {};
    },
    siteOrderList(state) {
        return state.siteOrderList || {};
    },
    siteAllList(state) {
        return state.siteAllList || {};
    },
    // equipmentAllList(state) {
    //     return state.equipmentAllList || {};
    // }
};
export default {
    state,
    actions,
    mutations,
    getters
}