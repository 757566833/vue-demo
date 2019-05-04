// 路由文件
// 导入 vue
import Vue from 'vue'
// 导入 vue-router包
import VueRouter from 'vue-router'
// 手动安装 vue-router
Vue.use(VueRouter)

//导入 account 和 goodslist 组件
import account from './test/account.vue'
import goodslist from './test/goodslist.vue'
import login from './test/login.vue'
import register from './test/register.vue'

import Test1 from '../components/test1.vue';

// 创建路由对象
let router = new VueRouter({
    mode: 'history',
    routes: [
        // account goodslist
        {
            path: '/Test1',
            component: Test1
        },
        {
            path: '/test2',
            component: goodslist
        },
        {
            path: '/test3',
            component: goodslist
        },
        {
            path: '/account',
            component: account,
            children: [{
                    path: 'login',
                    component: login
                },
                {
                    path: 'register',
                    component: register
                },
            ]
        },
        {
            path: '/goodslist',
            component: goodslist
        },
    ],
});

// 导出 router 对象
export default router;