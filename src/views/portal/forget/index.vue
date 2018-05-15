<template>
  <div class="main">
    <div class="left-silder">
      <Menu theme="light" width="auto" :active-name="$route.name" :open-names="activeMenu" @on-select="selectChange">
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
    </div>
    <div class="conent">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import myheader from '@/views/layout/header/header2.vue';
  import myfooter from '@/views/layout/footer/footer.vue';

  import forgetPath from '@/router/portal/forget.js';

  export default {
    data(){
      return{
        menuList:forgetPath[0].children,//侧边栏路由数组
        openNames:[],//打开的submenu
      }
    },
    computed: {
      activeMenu() {
        forgetPath[0].children.map(route => {
          let active = route.name === this.$route.name;
          if (active) {
            return this.openNames.push(route.name);
          } else {
            if (route.children) {
              route.children.map(croute => {
                console.log(croute.name)
                let ac = croute.name === this.$route.name;
                if (ac) {
                  return this.openNames.push(route.name);
                }
              })
            }
          }
        });
        return this.openNames
      },
    },
    methods:{
      selectChange(name){
        this.$router.push({name: name});
      },
    },
    components:{
      myheader,
      myfooter
    }
  }
</script>
<style scoped lang="scss">
  .main{
    position: relative;
    width: 800px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    .left-silder{
      width: 200px;
      height: 100%;
      padding: 10px 10px;
      .ivu-menu{
        height: 100%;
      }
    }
    .conent{
      flex: 1;
      -webkit-flex: 1;
      height: 100%;
      padding: 10px 10px;
      overflow-y: auto;
    }
  }
</style>
