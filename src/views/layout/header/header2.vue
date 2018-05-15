<template>
  <section>
    <Header>
      <div class="container1000">
        <router-link to="/">
          <Row type="flex" justify="start" align="middle" class="header">
            <div class="logo">
              <img src="@/assets/logo.png" alt="">
            </div>
            <i class="line">|</i>
            <span class="name">商户后台管理</span>
          </Row>
        </router-link>
      </div>
    </Header>
  </section>
</template>
<script>

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
  }
  .header{
    color: #ffffff;
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
    }
    .name{
      font-size: 16px;
      color: #ffffff;
    }
  }
</style>
