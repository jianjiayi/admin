<template>
  <section class="sider">
    <Sider  breakpoint="md" collapsible :collapsed-width="0" v-model="isCollapsed">
      <Menu width="auto" accordion :active-name="$route.name" :open-names="activeMenu" :class="menuClass" @on-select="selectChange">
        <div class="layout-logo">
          <div class="logo">
            <img src="@/assets/logo.png" alt="">
          </div>
          <!--<div class="text">-->
            <!--商家管理后台-->
          <!--</div>-->
        </div>
        <template v-for="(route, index) in menuList" :keys="index">
          <template v-if="route.children">
            <Submenu :name="route.name">
              <template slot="title">
                <Icon type="ios-paper"></Icon>
                <span>{{route.meta.name}}</span>
              </template>
              <MenuItem v-for="(croute, cindex) in route.children" :key="cindex" :name="croute.name">{{croute.meta.name}}</MenuItem>
            </Submenu>
          </template>
          <template v-else>
            <MenuItem :name="route.name">
              <Icon type="ios-paper"></Icon>
              <span>{{route.meta.name}}</span>
            </MenuItem>
          </template>
        </template>
      </Menu>
      <div slot="trigger" @click.native="collapsedSider"></div>
    </Sider>
  </section>
</template>
<script>
  import leftSliderPath from '@/router/leftSlider.js';

  export default {
    props:['isClosed','menuClass'],

    data(){
      return{
        menuList:leftSliderPath[0].children,//侧边栏路由数组
        openNames:[],//打开的submenu
        isCollapsed:this.isClosed,
      }
    },
    computed:{
      activeMenu(){
        leftSliderPath[0].children.map(route => {
          let active = route.name === this.$route.name;
          if(active){
            return this.openNames.push(route.name);
          }else{
            if(route.children){
              route.children.map(croute => {
                let ac = croute.name === this.$route.name;
                if(ac){
                  return this.openNames.push(route.name);
                }
              })
            }
          }
        });
        console.log(this.openNames)
        return this.openNames
      },
    },
    methods:{
      selectChange(name){
        this.$router.push({name: name});
      },
      collapsedSider(){
        this.$emit('collapsed')
      }
    }
  }
</script>
<style scoped lang="scss">
  .ivu-layout-sider {
    transition: all .2s ease-in-out;
    position: relative;
    min-width: 0;
    height: 100%;
    z-index:99;
    box-shadow: 1px 0px 2px #cccccc;
    .ivu-menu{
      height: 100%;
      overflow-y: auto;
      background-color: #ffffff;
      .layout-logo{
        position: relative;
        width: 100%;
        height: 115px;
        padding-top: 30px;
        color: #ffffff;
        z-index:999;
        margin-bottom: 20px;
        .logo{
          width: 80%;
          height: 50px;
          margin: 0px auto;
          border:1px solid #cccccc;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .text{
          text-align: center;
          font-size: 18px;
          line-height: 50px;
        }
      }
      .layout-logo:after{
        content: '';
        position: absolute;
        height: 1px;
        left:10px;
        right: 10px;
        bottom: 0;
        background: #cccccc;
      }
      .ivu-menu{
        box-shadow: 0 10px 0 #cccccc;
        .ivu-menu-opened{
          background-color: #f5f7f9;
        }
      }
    }
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .ivu-layout-sider-zero-width-trigger{
    z-index: 9999;
  }
</style>
