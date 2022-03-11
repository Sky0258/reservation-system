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

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
}

VueRouter.prototype.replace = function (location, resole, reject) {
    if (resole && reject) {
        originReplace.call(this, location, resole, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {});
    }
}


export default new VueRouter({
    routes: [{
            path: "/home",
            component: home
        },
        {
            path: "/login",
            component: login
        },
        {
            path: "/register",
            component: register
        },
        {
            path: "/Main",
            component: Main,
            redirect: '/welcome',
            meta: {
                title: "首页"
            },
            children: [{
                    path: '/welcome',
                    component: Welcome
                },
                {
                    path: '/2',
                    component: two
                },
                {
                    path: '/3',
                    component: three,
                    meta: {
                        title: "器材预约"
                    },
                    name: "器材预约"
                },
                {
                    path: '/7',
                    component: seven,
                    meta: {
                        title: "公告栏管理"
                    },
                    name:"公告栏管理"
                },
                {
                    path: '/8',
                    component: eight,
                    meta: {
                        title: "篮球场"
                    },
                    name: "篮球场"
                },
                {
                    path: '/9',
                    component: nine,
                    meta: {
                        title: "羽毛球场"
                    },
                    name:"羽毛球场"
                },
                {
                    path: '/10',
                    component: ten,
                    meta: {
                        title: "乒乓球场"
                    },
                    name:"乒乓球场"
                },
                {
                    path: '/20',
                    component: selfInfo,
                    meta: {
                        title: "个人信息"
                    },
                    name:"个人信息"
                },
                {
                    path: '/19',
                    component: nineteen,
                    meta: {
                        title: "预约记录"
                    },
                    name:"预约记录"
                },
                {
                    path: '/21',
                    component: twentyOne,
                    meta: {
                        title: "用户信息"
                    },
                    name:"用户信息"
                },
                {
                    path: '/22',
                    component: twentyTwo,
                    meta: {
                        title: "管理员信息"
                    },
                    name:"管理员信息"
                },
                {
                    path: '/23',
                    component: twentyThree,
                    meta: {
                        title: "场地订单"
                    },
                    name:"场地订单"
                },
                {
                    path: '/24',
                    component: twentyFour,
                    meta: {
                        title: "器材订单"
                    },
                    name:"器材订单"
                },
                {
                    path: '/25',
                    component: twentyFive,
                    meta: {
                        title: "场地管理"
                    },
                    name:"场地信息"
                },
                {
                    path: '/26',
                    component: twentySix,
                    meta: {
                        title: "器材管理"
                    },
                    name:"器材管理"
                }
            ]
        },
        {
            path: "*",
            redirect: "/login"
        }
    ]
})