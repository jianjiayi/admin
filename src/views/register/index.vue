<template>
  <section>
    <myheader></myheader>
    <div class="container content">

      <h1 class="title">{{$route.meta.name}}</h1>

      <div v-if="$route.name =='register'" class="register">
        <div class="form">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="用户名" prop="name">
              <Input v-model="formValidate.name" placeholder="输入用户名"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
              <Input v-model="formValidate.password" placeholder="输入密码"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="password2">
              <Input v-model="formValidate.password2" placeholder="确认密码"></Input>
            </FormItem>
            <FormItem label="手机号" prop="phone">
              <Input v-model="formValidate.phone" placeholder="绑定手机号"></Input>
            </FormItem>
            <FormItem label="验证码" prop="code">
              <Row>
                <Col span="10">
                  <Input v-model="formValidate.code" placeholder="输入验证码"></Input>
                </Col>
                <Col span="12" offset="1">
                  <Button type="ghost" :disabled="isDisabled"  @click="handleSendCode()">{{codeText}}</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">注册</Button>
              <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
            <FormItem>
              <router-link to="/login">已有账号？登录</router-link>
            </FormItem>
          </Form>
        </div>
      </div>
      <div v-else>
        <router-view></router-view>
      </div>
    </div>
    <myfooter></myfooter>
    <back-top></back-top>
  </section>
</template>
<script>
  import myheader from '@/views/layout/header/header2.vue';
  import myfooter from '@/views/layout/footer/footer.vue';

  import backTop from '@/components/back-top.vue'

  export default {
    data () {
      let validatePass2 = (rule, value, callback) => {
        if (value !== this.formValidate.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      let phoneValidate = (rule, value, callback) => {
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (!reg.test(value)) {
          callback(new Error('手机号格式不正确'));
        } else {
          this.isDisabled=false,
          callback();
        };
      };

      return {
        passwordMadal:false,

        isDisabled:true,
        count:'',
        timer:null,
        codeText:'点击发送验证码',

        formValidate: {
          name:'',
          password:'',
          password2:'',
          phone: '',
          code: '',
        },
        ruleValidate: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '请设置至少6位密码', trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'change' },
            { validator: phoneValidate, trigger: 'change' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        }
      }
    },
    methods:{
      //获取验证码倒计时
      handleSendCode(){
        const TIME_COUNT = 30;
        if (!this.timer){
          this.count = TIME_COUNT;
          this.isDisabled = true;

          this.timer = setInterval(() =>{
            if(this.count > 0 && this.count <= TIME_COUNT){
              this.count--;
              this.codeText = this.count+"秒后重新发送";

              this.getMessageCode();//调用获取验证码

            }else{
              this.codeText = "点击发送验证码"
              this.isDisabled = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          },1000)
        }
      },
      //获取短信验证码
      getMessageCode(){

      },
      //提交表单
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            this.$router.push({name:'qualification'});
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      //重置表单
      handleReset (name) {
        this.$refs[name].resetFields();
      },

    },
    components:{
      myheader,
      myfooter,
      backTop
    }
  }
</script>
<style scoped lang="scss">
  .content{
    margin: 100px auto 40px auto;
    min-height: 600px;
    box-shadow: 0px 0px 15px #cccccc;
    background: #ffffff;
    padding-bottom: 40px;
  }
  .title{
    text-align: center;
    font-size: 20px;
    line-height: 80px;
  }
  .register{
    width: 300px;
    margin: 0 auto;
    .form{
      width: auto;
    }
  }

</style>
