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

//菜单接口
export const reqMenu = (data)=>requests({url:'/menu/menuList',params:data,method:'get'});

//获取用户信息【token】
export const reqUserInfo = (data)=>requests({url:'/account/getUserInfoByToken',headers:data,method:'get'});

//修改用户信息
export const reqUserChange = (userId,data)=>requests({url:`/user/${userId}/updateUserInfo`,data,method:"post"});

//修改密码
export const reqUserPass = (userId,data)=>requests({url:`/user/${userId}updatePassword`,params:data,method:"post"});

//获取全部管理员信息
export const reqManagerInfo = (userId)=>requests({url:`/role/${userId}/manageList`,method:"get"});

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
export const reqSiteOrderList = ()