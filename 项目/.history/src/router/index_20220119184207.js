import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import home from '../views/home/home.vue'
import login from '../views/login/index.vue'                 // 这两处先用课件的，后面再改组件
import register from '../views/register/register.vue'

//重写push和replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location,resolve,reject) {
    if(resolve && reject) {
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,() => { },() => { });
    }
}

VueRouter.prototype.replace = function(location,resole,reject){
    if(resole && reject){
        originReplace.call(this,location,resole,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}


export default new VueRouter({
    routes:[
        {
            path:"/home",
            component:home
        },
        {
            path:"/login",
            component:login
        },
        {
            path:"/register",
            component:register
        },
        {
            path:"*",
            redirect:"/home"
        }
    ]
})

