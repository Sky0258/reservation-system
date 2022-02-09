import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import home from '../views/home.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'

//重写push和replace



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

