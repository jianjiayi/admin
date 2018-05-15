import Vue from 'vue'
import Router from 'vue-router'


import Login from '@/views/login.vue';
import register from '@/views/register/index.vue';
import qualification from '@/views/register/qualification.vue';

import notFound  from '@/views/error/404.vue';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'登录',
      component:Login
    },
    {
      path:'/register',
      name:'register',
      meta:{
        icon:'',
        name:'账号注册',
      },
      component: register,
      children:[
        {
          path:'qualification',
          name:'qualification',
          meta:{
            name:'资质信息'
          },
          component:qualification
        },
      ]
    },
    {
      path:'/404',
      name:'notFound',
      component:notFound
    },
  ]
})
