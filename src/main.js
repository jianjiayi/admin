// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';

import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
Vue.use(iView);



Vue.config.productionTip = false;

//路由拦截器
router.beforeEach(({meta, path}, from, next) => {
  let { auth = true } = meta;//该路由是否需要登录
  let $user = JSON.parse(sessionStorage.getItem('$user')) || {};
  let isLogin = Boolean($user.auth);//true用户已登录， false用户未登录

  if (!auth && !isLogin && path != '/login') {
    return next({ path: '/login' })
  }else{
    iView.LoadingBar.start();
    next()
  }
})
router.afterEach(route => {
  iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
