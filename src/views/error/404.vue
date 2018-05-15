<template>
  <Layout>
    <myheader></myheader>
    <div class="container1000 content">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520308333486&di=edfa6ab0ffe7636aeb4710ef3cd156b5&imgtype=0&src=http%3A%2F%2Fbizhi.sogou.com%2Fbizhi%2Fimages%2F404.jpg" alt="">
    </div>
    <myfooter></myfooter>
  </Layout>
</template>
<script>
  import myheader from '@/views/layout/header/header2.vue';
  import myfooter from '@/views/layout/footer/footer.vue';

  export default {
    data(){
      return{}
    },
    methods:{

    },
    components:{
      myheader,
      myfooter
    }
  }
</script>
<style scoped lang="scss">
  .ivu-layout{
    background: #cccccc;
  }
  .content{
    position: absolute;
    top:80px;
    left:0;
    right: 0;
    bottom:80px;
    background: #fff;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content: center;
    -webkit-justify-content: center;
    img{
      max-width: 100%;
    }
  }
</style>
