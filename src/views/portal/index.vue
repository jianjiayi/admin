<template>
  <Layout>
    <myheader></myheader>
    <div class="container content">
      <h1 class="title">{{$route.meta.name}}</h1>
      <div v-if="$route.path=='/portal'" class="btn-group">
        <Button v-for="(item, index) in path" :key="index" type="ghost" @click="selectChange(item.name)">
          {{item.meta.name}}
        </Button>
      </div>
      <div v-else id="main">
        <router-view></router-view>
      </div>
    </div>
    <myfooter></myfooter>
  </Layout>
</template>
<script>
  import myheader from '@/views/layout/header/header2.vue';
  import myfooter from '@/views/layout/footer/footer.vue';

  import portalPath from '@/router/portal/index.js';

  export default {
    data(){
      return{
        path:portalPath[0].children,
      }
    },
    created(){
      console.log(portalPath[0].children)
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
  .ivu-layout{
    background: #ffffff;
  }
  .content{
    position:absolute;
    top:110px;
    bottom: 110px;
    left:50%;
    margin-left: -500px;
    box-shadow: 0px 0px 15px #cccccc;
    background: #ffffff;
    .btn-group{
      text-align: center;
      button{
        margin: 0 auto;
        margin: 10px 20px;
      }
    }
    .title{
      text-align: center;
      font-size: 20px;
      line-height: 80px;
    }
    #main{
      position: absolute;
      top:90px;
      left:0;
      bottom:0;
      right:0;
      overflow-y: auto;
    }
  }
  .footer{
    position: absolute;
  }
</style>
