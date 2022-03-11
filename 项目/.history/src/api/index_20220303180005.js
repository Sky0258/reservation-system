import requests from './request'; 
import axios from "axios";

//注册接口
export const reqUserRegister = (data)=>requests({url:'/account/register',data,method:'post'});

//登录接口
export const reqUserLogin = (data)=>requests({url:'/account/login',data,method:'post'});

//注销接口
export const reqLogout = (data)=>requests({url:`/account/logout`,headers:data,method:'get'});

//验证码接口
export const reqUserLoginCheck = (data)=>requests({url:'/account/captcha',params:data,method:'get'});

//用户角色
export const reqUserRole = (userId)=>requests({url:'/role/${userId}/list',method:"get"});

//菜单接口
export const reqMenu = (data)=>requests({url:'/menu/menuList',params:data,method:'get'});

//获取用户信息【token】
export const reqUserInfo = (data)=>requests({url:'/account/getUserInfoByToken',headers:data,method:'get'});

//修改用户信息
export const reqUserChange = (userId,data)=>requests({url:`/user/${userId}/updateUserInfo`,data,method:"post"});

//修改密码
export const reqUserPass = (userId,data)=>requests({url:`/user/${userId}updatePassword`,params:data,method:"post"});

//获取全部管理员信息
export const reqManagerInfo = (userId,data)=>requests({url:`/role/${userId}/manageList`,method:"get",params:data});

//添加管理员
export const reqCreateManager = (administratorId,userId)=>requests({url:`/${administratorId}/administrator/${userId}`,method:"post"});

//删除管理员
export const reqDeleteManager = (administratorId,userId)=>requests({url:`/${administratorId}/administrator/${userId}`,method:"delete"});

//获取全部用户信息
export const reqUsers = (userId,data)=>requests({url:`/user/${userId}/list`,method:"get",params:data});

//预约器材
export const reqOrderEquipment = (userId,data)=>requests({url:`/${userId}/equipment-order`,method:"post",data});

//器材订单
export const reqEquipmentList = (userId,data)=>requests({url:`/${userId}/Equipment-order/list`,method:"get",params:data});

//个人查询器材预约记录
export const reqEquipmentOrderList = (userId,data)=>requests({url:`/${userId}/listEquipmentOrder`,method:"get",params:data});

//个人查询场地预约记录
export const reqSiteOrderList = (userId,data)=>requests({url:`/${userId}/listOwnSiteOrder`,method:"get",params:data});

//管理员查询场地订单
export const reqSiteAllList = (userId,data)=>requests({url:`/${userId}/listAllSiteOrder`,method:"get",params:data});

//管理员查询器材订单
export const reqEquipmentAllList = (userId,data)=>requests({url:`/${userId}/Equipment-order/list`,method:"get",params:data});

//取消预约器材
export const reqCancelEquipment = (userId,equipmentOrderId)=>requests({url:`/${userId}/equipment-order/${equipmentOrderId}`,method:"delete"});

//取消预约场地
export const reqCancelSite = (userId,siteOrderId)=>requests({url:`/${userId}/site-order/${siteOrderId}`,method:"delete"});

//获取所有器材
export const reqAllEquipment = (data)=>requests({url:'/listEquipment',params:data,method:"get"});

//删除器材
export const reqDeleteEquipment = (userId,equipmentId)=>requests({url:`/${userId}/equipment/${equipmentId}`,method:"delete"});

//管理员添加器材
export const reqAddEquipment = (userId,data)=>requests({url:`/${userId}/equipment`,method:"post",data});

//管理员修改器材信息
export const reqChangeEquipment = (userId,data)=>requests({url:`/${userId}/equipment`,method:"put",data});

//获取所有场地
export const reqAllSite = (userId,categoryId,data)=>requests({url:`/${userId}/site/${categoryId}`,method:"get",params:data});   //这里要是分页的话要加数据data!!! parmas:data

//管理员删除场地
export const reqDeleteSite = (userId,siteId)=>requests({url:`/${userId}/site/${siteId}`,method:"delete"});

//修改场地信息
export const reqChangeSite = (userId,data)=>requests({url:`/${userId}/site`,method:"put",data});

//管理员添加场地
export const reqAddSite = (userId,data)=>requests({url:`/${userId}/site`,method:"post",data});

//获取所有公告
export const reqAllNotice = (data)=>requests({url:'/notification',method:"get",params:data});

//获取某条公告的内容
export const reqNotice = (notificationId)=>requests({url:`/notification/${notificationId}`,method:"get"});

//添加公告
export const reqAddNotice = (userId,data)=>requests({url:`/notification/${userId}`,method:"post",data});

//修改公告信息
export const reqChangeNotice = (userId,data)=>requests({url:`/notification/${userId}`,method:"put",data});

//删除公告
export const reqDeleteNotice = (notificationId)=>requests({url:`/notification/${notificationId}`,method:"delete"})