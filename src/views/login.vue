<template>
  <section class="layout-login">
    <div class="main">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="密 码">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <p class="forget-password">
          <router-link to="/portal/forget">忘记密码</router-link>
        </p>
        <FormItem>
          <Row type="flex" justify="space-between" class="btn-group">
            <Button type="ghost" @click="register()">注册</Button>
            <Button type="primary" @click="login('formInline')">登录</Button>
          </Row>
        </FormItem>
      </Form>
    </div>
  </section>
</template>
<script>
  import { mapMutations } from 'vuex';

  export default {
    data () {
      return {
        formInline: {
          user: 'admin',
          password: '111111'
        },
        ruleInline: {
          user: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      ...mapMutations(['setUser']),
      register(){
        this.$router.push({path:'/register'})
      },
      login(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            let user = {
              name : 'jsp',
              pawd : '111111',
              auth : 'sfdjknabsjdbnflsjdfjk'
            };
            this.setUser(user);
            this.$router.push({path: '/'});
          } else {
            this.$Message.error('Fail!');
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .layout-login{
    position: absolute;
    width:100%;
    height: 100%;
    background-color: darkcyan;
    .main{
      width: 300px;
      padding: 50px 50px;
      background: #ffffff;
      border-radius: 10px;
      margin: 300px auto;
      text-align: center;
      .forget-password{
        text-align: right;
        margin: -10px 10px 10px 10px;

      }
      .btn-group{
        button{
          width: 45%;
        }
      }
    }
  }
</style>
