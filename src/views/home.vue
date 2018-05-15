<template>
  <div class="layout">
    <aside-bar :isClosed="isCollapsed" :menuClass="menuClass" @collapsed="collapsed"></aside-bar>
    <div class="main">
      <myheader></myheader>
      <div class="content">
        <div class="tob-bar">
          <Breadcrumb :style="{margin: '5px 0'}">
            <BreadcrumbItem v-for="(item,index) in breadcrumbs" :key="index">{{item.meta.name}}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <Content>
          <router-view></router-view>
        </Content>
      </div>
      <myfooter></myfooter>
    </div>
  </div>
</template>
<script>
  import myheader from '@/views/layout/header/header.vue';
  import asideBar from '@/views/layout/sidebar/aside.vue';
  import myfooter from '@/views/layout/footer/footer.vue';

  export default {
    data () {
      return {
        isCollapsed: false
      }
    },
    computed: {
      menuClass () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
      breadcrumbs(){
        return (this.$route && this.$route.matched) || [];
      }
    },
    methods: {
      collapsed () {
        this.isCollapsed = !this.isCollapsed;
      }
    },
    components:{
      myheader,
      asideBar,
      myfooter
    }
  }
</script>

<style scoped lang="scss">
  .layout{
    position: absolute;
    top:0;
    bottom: 0;
    left:0;
    right: 0;
    display: flex;
    flex: 1 1 auto;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    background: rgb(245, 247, 249);
  }
  .main{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
    height: 100%;
    min-width: 300px;
    background: #f5f7f9;
    overflow-x: hidden;
    position: relative;
    .content{
      position: absolute;
      left:0;
      right: 0%;
      top:64px;
      bottom: 70px;
      overflow-y: auto;
      background: #ffffff;
      .tob-bar{
        height: 38px;
        line-height: 38px;
        padding-left: 32px;
        color: #666;
        cursor: pointer;
        position: relative;
        border-bottom: 1px solid #ccc;
      }
      .ivu-layout-content{
        background: #fff;
      }
    }
  }
  .footer{
    position: absolute;
  }
</style>
