import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import home from '../views/home.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'

//重写push和replace
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location,resolve,reject) {
    if(resolve && reject) {
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,() => { },() => { });
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

