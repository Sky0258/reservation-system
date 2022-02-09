import requests from './request'; 
import axios from "axios";

//注册接口
export const reqUserRegister = (data)=>requests({url:'/account/register',data,method:'post'});

//登录接口
export const reqUserLogin = (data)=>requests({url:'/account/login',data,method:'post'});

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