import abstract from '@/views/layout/common/abstract.vue';//二级路由公用页面，为了三级路由
import Home from '@/views/home.vue';//主页


import UserCenter from '@/views/user/index.vue';//个人中心
import GoodsList from '@/views/goods/list.vue';//商品列表

import OrdersList from '@/views/orders/list.vue';//订单列表

export default [
  {
    path: '/',
    name: '首页',
    meta:{
      name:'首页',
      auth:false
    },
    component: Home,
    children:[
      {
        path:'/user',
        name:'user',
        meta:{
          icon:'',
          name:'基本设置',
          auth:false
        },
        component:abstract,
        children:[
          {
            path:'center',
            name:'userCenter',
            meta:{
              name:'个人中心',
              auth:false
            },
            component:UserCenter,
          }
        ]
      },
      {
        path:'/goods',
        name:'goods',
        meta:{
          icon:'',
          name:'商品管理',
          auth:false
        },
        component:abstract,
        children:[
          {
            path:'list',
            name:'goodslist',
            meta:{
              name:'商品列表',
              auth:false
            },
            component:GoodsList,
          }
        ]
      },
      {
        path:'/orders',
        name:'orders',
        meta:{
          icon:'',
          name:'订单管理',
          auth:true
        },
        component:abstract,
        children:[
          {
            path:'list',
            name:'orderslist',
            meta:{
              name:'订单列表',
              auth:true
            },
            component:OrdersList,
          }
        ]
      },
    ]
  },
]
