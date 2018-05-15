import abstract from '@/views/layout/common/abstract.vue';//二级路由公用页面，为了三级路由
import register from '@/views/portal/register/index.vue';
import qualification from '@/views/portal/register/qualification.vue';

export default [
  {
    path:'register',
    name:'register',
    meta:{
      icon:'',
      name:'注册账号',
    },
    component: abstract,
    children:[
      {
        path:'/',
        name:'register',
        meta:{
          name:'账号注册'
        },
        component:register
      },
      {
        path:'qualification',
        name:'qualification',
        meta:{
          name:'资质信息'
        },
        component:qualification
      },
    ]
  }
]
