import forgetPath from './forget.js';//忘记密码路由

import Portal from '@/views/portal/index.vue';
import Agreement from '@/views/portal/agreement.vue'


const allowedRouterArray = [//添加路由模块
  forgetPath,
];
let originPath = [
  {
    path:'agreement',
    name:'agreement',
    meta:{
      name:'商户协议',
    },
    component:Agreement,
  }
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

