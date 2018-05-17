<template>
  <section class="header">
    <Header :style="{padding: 0}" class="layout-header-bar">
      <Row type="flex" justify="space-between" align="middle" class="code-row-bg">
        <Col span="4"></Col>
        <Col span="20">
          <Row type="flex" justify="end" align="middle" class="code-row-bg">
            <!--<ul class="icon-menu">-->
              <!--<li>-->
                <!--<router-link to="/">-->
                  <!--<Icon type="ios-home"></Icon>-->
                <!--</router-link>-->
              <!--</li>-->
              <!--<li>-->
                <!--<Icon type="ios-bell"></Icon>-->
              <!--</li>-->
            <!--</ul>-->
            <div class="welcome">
              欢迎
              <Dropdown>
                <a href="javascript:void(0)">
                  菅双鹏
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <!--<DropdownItem @click.native="$router.push({name:'userCenter'})">个人中心</DropdownItem>-->
                  <DropdownItem @click.native="logoutModal = true">安全退出</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="avatar">
              <Badge>
                <Avatar icon="person" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
              </Badge>
            </div>
          </Row>
        </Col>
      </Row>
    </Header>
    <Modal
      title="Title"
      v-model="logoutModal"
      class-name="vertical-center-modal"
      @on-ok="asyncOK">
      <p>确定退出登录？</p>
    </Modal>
  </section>
</template>
<script>
  import { mapMutations } from 'vuex';
  export default {
    props:['rotateIcon'],
    data(){
      return{
        logoutModal:false,
      }
    },
    methods:{
      ...mapMutations(['clearUser']),
      asyncOK () {
        this.logout()
      },
      logout(){
        this.clearUser();
        this.$router.push({path: '/login'});
      }
    }
  }
</script>
<style scoped lang="scss">
  .ivu-layout-header{
    .icon-menu{
      list-style: none;
      display: flex;
      display: -webkit-flex;
      li{
        margin-right: 20px;
        .ivu-icon{
          color: #ffffff;
          font-size: 20px;
        }
        .ivu-icon:hover{
          color: brown;
        }
      }
    }
    .welcome{
      margin: 0 10px;
      color: #ffffff;
      a{
        font-size: 14px;
        text-decoration: none;
      }
    }
    .avatar{
      margin-right: 30px;
    }
  }
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
      top: 0;
    }
  }
</style>
