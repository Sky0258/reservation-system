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
import four from '../views/Main/4.vue'
import five from '../views/Main/5.vue'
import six from '../views/Main/6.vue'
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
            component: home,
            meta: {
                title: "首页"
            }
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
            redirect: '/Welcome',
            children: [{
                    path: '/Welcome',
                    component: Welcome,
                    meta: {
                        title: "首页"
                    },
                    {
                            path: '/2',
                            component: two,
                            meta: {
                                title: "场地预约"
                            },
                            children:[
                                {
                                    path: '/8',
                                    component: eight,
                                    meta: {
                                        title: "篮球场"
                                    }
                                },
                                {
                                    path: '/9',
                                    component: nine,
                                    meta: {
                                        title: "羽毛球场"
                                    }
                                },
                                {
                                    path: '/10',
                                    component: ten,
                                    meta: {
                                        title: "乒乓球场"
                                    }
                                },
                            ]
                        },
                        {
                            path: '/3',
                            component: three,
                            meta: {
                                title: "器材预约"
                            }
                        },
                        {
                            path: '/4',
                            component: four,
                            meta: {
                                title: "个人中心"
                            },
                            children:[
                                {
                                    path: '/19',
                                    component: nineteen,
                                    meta: {
                                        title: "预约记录"
                                    },
                                },
                                {
                                    path: '/20',
                                    component: selfInfo,
                                    meta: {
                                        title: "个人信息"
                                    },
                                },
                            ]
                        },
                        {
                            path: '/5',
                            component: five,
                            meta: {
                                title: "用户管理"
                            },
                            children:[
                                {
                                    path: '/21',
                                    component: twentyOne,
                                    meta: {
                                        title: "用户信息"
                                    },
                                },
                                {
                                    path: '/22',
                                    component: twentyTwo,
                                    meta: {
                                        title: "管理员信息"
                                    },
                                },
                            ]
                        },
                        {
                            path: '/7',
                            component: seven,
                            meta: {
                                title: "公告栏管理"
                            },
                        },
                        {
                            path: '/6',
                            component: six,
                            meta: {
                                title: "订单管理"
                            },
                            children:[
                                {
                                    path: '/23',
                                    component: twentyThree,
                                    meta: {
                                        title: "场地订单"
                                    },
                                },
                                {
                                    path: '/24',
                                    component: twentyFour,
                                    meta: {
                                        title: "器材订单"
                                    },
                                },
                            ]
                        },
                        {
                            path: '/25',
                            component: twentyFive,
                            meta: {
                                title: "场地管理"
                            },
                        },
                        {
                            path: '/26',
                            component: twentySix,
                            meta: {
                                title: "器材管理"
                            },
                        }
                    
                },

            ]
        },
        {
            path: "*",
            redirect: "/login"
        }
    ]
})