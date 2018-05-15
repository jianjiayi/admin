import forgetPath from './forget.js';//忘记密码路由
import registerPath from './register.js';//注册信息路由

import Portal from '@/views/portal/index.vue';

let originPath = [];
const allowedRouterArray = [//添加路由模块
  forgetPath,
  registerPath,
];

allowedRouterArray.map(router => {
  originPath = originPath.concat(router)
});

export default [
  {
    path:'/portal',
    name:'portal',
    meta:{
      name:'更多服务',
    },
    component:Portal,
    children:originPath
  }
];

