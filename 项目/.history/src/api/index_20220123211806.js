import requests from './request'; 

//注册接口
export const reqUserRegister = (data)=>requests({url:'/account/register',data,method:'post'});

//登录接口
export const reqUserLogin = (data)=>requests({url:'/account/login',params:data,method:'post'});

//验证码接口
export const reqUserLoginCheck = (data)=>requests({url:'/account/captcha',params:data,method:'get'});
