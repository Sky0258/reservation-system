import { Promise } from "core-js";
import { reqChangeRole,reqAddRole,reqGiveRoleMenu,reqRoleMenu,reqAllMenu,reqAllRoles,reqOrdered,reqOrderSite,reqUserRole,reqDeleteNotice,reqChangeNotice,reqAddNotice,reqNotice,reqAllNotice,reqAddSite,reqChangeSite,reqDeleteSite,reqAllSite,reqChangeEquipment,reqAddEquipment,reqDeleteEquipment,reqAllEquipment,reqCancelSite,reqCancelEquipment,reqEquipmentAllList,reqSiteAllList,reqSiteOrderList,reqEquipmentOrderList,reqOrderEquipment,reqCreateManager, reqDeleteManager, reqManagerInfo, reqMenu,reqUserChange,reqUserPass, reqUsers } from "../api";


const state = {
    role:{},
    menu:{},
    managerInfo:{},
    allUsersInfo:{},
    equipmentOrderList:{},
    siteOrderList:{},
    siteAllList:{},
    equipmentAllList:{},
    allEquipment:{},
    allSite:{},
    allNotice:{},
    notice:{},
    ordered:{},
    allRoles:{},
    allMenu:{},
    roleMenu:{}
};
const mutations = {
    ROLE(state,role){
        state.role = role;
    },
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
    EQUIPMENTALLLIST(state,equipmentAllList){
        state.equipmentAllList = equipmentAllList;
    },
    ALLEQUIPMENT(state,allEquipment){
        state.allEquipment = allEquipment;
    },
    ALLSITE(state,allSite) {
        state.allSite = allSite;
    },
    ALLNOTICE(state,allNotice) {
        state.allNotice = allNotice;
    },
    NOTICE(state,notice) {
        state.notice = notice;
    },
    ORDERED(state,ordered) {
        state.ordered = ordered;
    },
    ALLROLES(state,allRoles) {
        state.allRoles = allRoles;
    },
    ALLMENU(state,allMenu){
        state.allMenu = allMenu;
    },
    ROLEMENU(state,roleMenu){
        state.roleMenu = roleMenu;
    }
};
const actions = {
    //获取角色
    async userRole({commit},userId){
        let result = await reqUserRole(userId);
        console.log(result.data.data);
        if(result.data.code == 200){
            commit("ROLE",result.data.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
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
    async managerInfo({commit},{userId,data}){
        let result = await reqManagerInfo(userId,data);
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

    // 管理员查询器材订单
    async equipmentAllList({commit},{userId,data}){
        let result = await reqEquipmentAllList(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            commit("EQUIPMENTALLLIST",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //用户取消器材预约
    async cancelEquipment({commit},{userId,equipmentOrderId}){
        let result = await reqCancelEquipment(userId,equipmentOrderId);
        console.log(result.data);
        if(result.data.code == 200){
            // commit("EQUIPMENTALLLIST",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //用户取消场地预约
    async cancelSite({commit},{userId,siteOrderId}){
        let result = await reqCancelSite(userId,siteOrderId);
        console.log(result.data);
        if(result.data.code == 200){
            // commit("EQUIPMENTALLLIST",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //获取全部器材
    async allEquipment({commit},code){
        let result = await reqAllEquipment(code);
        console.log(result.data);
        if(result.data.code == 200){
            commit("ALLEQUIPMENT",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //删除器材
    async deleteEquipment({commit},{userId,equipmentId}){
        let result = await reqDeleteEquipment(userId,equipmentId);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //管理员添加器材
    async addEquipment({commit},{userId,data}){
        let result = await reqAddEquipment(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //管理员修改器材信息
    async changeEquipment({commit},{userId,data}){
        let result = await reqChangeEquipment(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //获取所有场地
    async allSite({commit},{userId,categoryId,data}){
        let result = await reqAllSite(userId,categoryId,data);
        console.log(result.data);
        if(result.data.code == 200){
            commit("ALLSITE",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //删除场地
    async deleteSite({commit},{userId,siteId}){
        let result = await reqDeleteSite(userId,siteId);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //修改场地信息
    async changeSite({commit},{userId,data}){
        let result = await reqChangeSite(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //管理员添加场地
    async addSite({commit},{userId,data}){
        let result = await reqAddSite(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //获取全部公告
    async allNotice({commit},data){
        let result = await reqAllNotice(data);
        console.log(result.data);
        if(result.data.code == 200){
            commit("ALLNOTICE",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //获取公告信息
    async Notice({commit},notificationId){
        let result = await reqNotice(notificationId);
        console.log(result.data);
        if(result.data.code == 200){
            commit("NOTICE",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //添加公告
    async addNotice({commit},{userId,data}){
        let result = await reqAddNotice(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //修改公告信息
    async changeNotice({commit},{userId,data}){
        let result = await reqChangeNotice(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //删除公告
    async deleteNotice({commit},{notificationId}){
        let result = await reqDeleteNotice(notificationId);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //预约场地
    async orderSite({commit},{userId,data}){
        let result = await reqOrderSite(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //被预约过的场地
    async orderedSite({commit},{categoryId,userId}){
        let result = await reqOrdered(categoryId,userId);
        console.log(result.data);
        if(result.data.code == 200){
            commit("ORDERED",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //获取所有角色
    async allRoles({commit},{userId,data}){
        let result = await reqAllRoles(userId,data);
        console.log(result.data);
        if(result.data.code == 200){
            commit("ALLROLES",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //获取所有菜单
    async allMenu({commit}){
        let result = await reqAllMenu();
        console.log(result.data);
        if(result.data.code == 200){
            commit("ALLMENU",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //获取角色拥有菜单
    async roleMenu({commit},data){
        let result = await reqRoleMenu(data);
        console.log(result.data);
        if(result.data.code == 200){
            commit("ROLEMENU",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //给角色赋值菜单
    async giveRoleMenu({commit},{menuIdList,userId,roleId}){
        let result = await reqGiveRoleMenu(menuIdList,userId,roleId);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //添加新角色
    async addRole({commit},{userId,roleName}){
        let result = await reqAddRole(userId,roleName);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

    //修改角色名
    async changeRole({commit},{roleId,roleName}){
        let result = await reqChangeRole(roleId,roleName);
        console.log(result.data);
        if(result.data.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
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
    equipmentAllList(state) {
        return state.equipmentAllList || {};
    },
    allEquipment(state) {
        return state.allEquipment || {};
    },
    allSite(state) {
        return state.allSite || {};
    },
    allNotice(state) {
        return state.allNotice || {};
    },
    notice(state) {
        return state.notice || {};
    },
    role(state) {
        return state.role || {}
    },
    ordered(state) {
        return state.ordered || {};
    },
    allRoles(state) {
        return state.allRoles || {};
    },
    allMenu(state) {
        return state.allMenu || {};
    },
    roleMenu(state) {
        return state.roleMenu || {};
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}