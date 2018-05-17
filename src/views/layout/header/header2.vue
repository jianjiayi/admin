<template>
  <section>
    <Affix :offset-top="0" @on-change="scrollChange">
      <Header>
        <div class="container">
            <Row type="flex" justify="start" align="middle">
              <Col span="6">
                <router-link to="/">
                  <Row type="flex" justify="start" align="middle">
                    <div class="logo">
                      <img src="@/assets/logo.png" alt="">
                    </div>
                    <i class="line">|</i>
                    <span class="name">商户后台管理</span>
                  </Row>
                </router-link>
              </Col>
              <Col span="12">
                <h2 :class="active == true ? 'title on' : 'title'">{{$route.meta.name}}</h2>
              </Col>
              <Col span="6"></Col>
            </Row>
        </div>
      </Header>
    </Affix>
  </section>
</template>
<script>
  export default {
    data(){
      return{
        active:false,
      }
    },
    methods:{
      scrollChange (status) {
        this.active = status;
      }
    }
  }
</script>
<style scoped lang="scss">
  a{
    text-decoration: none;
  }
  .ivu-layout-header{
    position: fixed;
    top:0;
    left:0;
    right:0;
    z-index: 999;
    .logo{
      width: 100px;
      height: 50px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    i.line{
      font-size: 20px;
      padding: 0 10px;
      color: #ffffff;
    }
    .name{
      font-size: 16px;
      color: #ffffff;
    }
    .title{
      text-align: center;
      color: #fff5e6;
      opacity: 0;
      transition: opacity 0.5s;
      -moz-transition: opacity 0.5s; /* Firefox 4 */
      -webkit-transition: opacity 0.5s; /* Safari 和 Chrome */
      -o-transition: opacity 0.5s; /* Opera */
    }
    .title.on{
      opacity: 1;
    }
  }
  @media screen and (min-width: 992px){
    .ivu-layout-header {}
  }
</style>
