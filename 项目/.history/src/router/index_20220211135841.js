import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import Layout from '../layout'

import home from '../views/home/home.vue'
import login from '../views/login/login.vue'                 
import register from '../views/register/register.vue'
import Main from '../views/Main/Main.vue'
import Welcome from '../views/Main/Welcome.vue'
import eight from '../views/Main/8.vue'
import selfInfo from '../views/Main/20.vue'
import nineteen from '../views/Main/19.vue'
import twentyOne from '../views/Main/21.vue'
import twentyTwo from '../views/Main/22.vue'

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
            path:"/Main",
            component:Main, 
            redirect:'/welcome',
            children: [
                { path: '/welcome', component:Welcome },
                { path: '/8', component: eight},
                { path: '/20', component: selfInfo},
                { path: '/19', component: nineteen},
                { path: '/21', component: twentyOne},
                { path: '/22', component: twentyTwo}
            ]
        },
        // {
        //     path:"*",
        //     redirect:"/home"
        // }
    ]
})

  