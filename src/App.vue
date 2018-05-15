<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import portalPath from './router/portal/index.js';//门户路由模块
  import leftSliderPath from './router/leftSlider.js';//侧边栏路由模块

  export default {
    name: 'App',
    data(){
      return{
        routerArray:[
          portalPath,
          leftSliderPath,
        ]
      }
    },
    created:function(){
      this.extendRoutes(this.routerArray);
    },
    methods:{
      extendRoutes(allowedRouterArray) {
        let vm = this;
        let originPath = [
          {
            path: '*',
            redirect: '/404'
          }
        ];
        //所有路由整合到一起
        allowedRouterArray.map(router => {
          originPath = originPath.concat(router)
        });
        //注入路由
        vm.$router.addRoutes(originPath);

        console.log(vm.$router)
      },
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a{
    text-decoration: underline;
  }

  i{
    font-style: normal;
  }
  .container1000{
    position: relative;
    width: 1000px;
    margin: 0 auto;
  }
  .ivu-layout-header{
    padding: 0;
  }

</style>
