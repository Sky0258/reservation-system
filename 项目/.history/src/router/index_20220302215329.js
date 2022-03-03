import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


import home from '../views/home/home.vue'
import login from '../views/login/login.vue'                 
import register from '../views/register/register.vue'
import Main from '../views/Main/Main.vue'
import Welcome from '../views/Main/Welcome.vue'
import two from '../views/Main/2.vue'
import three from '../views/Main/3.vue'
import seven from '../views/Main/7.vue'
import eight from '../views/Main/8.vue'
import nine from '../views/Main/9.vue'
import ten from '../views/Main/10.vue'
import selfInfo from '../views/Main/20.vue'
import nineteen from '../views/Main/19.vue'
import twentyOne from '../views/Main/21.vue'
import twentyTwo from '../views/Main/22.vue'
import twentyThree from '../views/Main/23.vue'
import twentyFour from '../views/Main/24.vue'
import twentyFive from '../views/Main/25.vue'
import twentySix from '../views/Main/26.vue'


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
            redirect:'/home',
            children: [
                { path: '/home', component:home },
                { path: '/2', component: two},
                { path: '/3', component: three},
                { path: '/7', component: seven},
                { path: '/8', component: eight},
                { path: '/9', component: nine},
                { path: '/10', component: ten},
                { path: '/20', component: selfInfo},
                { path: '/19', component: nineteen},
                { path: '/21', component: twentyOne},
                { path: '/22', component: twentyTwo},
                { path: '/23', component: twentyThree},
                { path: '/24', component: twentyFour},
                { path: '/25', component: twentyFive},
                { path: '/26', component: twentySix}
            ]
        },
        {
            path:"*",
            redirect:"/login"
        }
    ]
})

  