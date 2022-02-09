import requests from './request'; 

//注册接口
export const reqUserRegister = (data)=>requests({url:'/account/register',data,method:'post'});

//登录接口
export const reqUserLogin = (data)=>requests({url:'/account/login',data,method:'post'});

//验证码接口
export const reqUserLoginCheck = (data)=>requests({url:'/account/captcha',params:data,method:'get'});

//菜单接口
export const reqMenu = (data)=>requests({url:'/menu/menuList',params:data,method:'get'});


var instance = axios.create({ headers: {'content-type': 'application/x-www-form-urlencoded'} });
instance.post(`url`, params).then(res => res.data);
