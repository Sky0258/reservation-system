import requests from './request'; 

//注册接口
export const reqUserRegister = (data)=>requests({url:'/account/register',data,method:'post'});

//登录接口
export const re