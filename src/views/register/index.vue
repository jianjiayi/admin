<template>
  <section>
    <myheader></myheader>
    <div class="container1000 content">
      <div class="register">
        <div class="">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="手机号" prop="phone">
              <Input v-model="formValidate.phone" placeholder="输入手机号"></Input>
            </FormItem>
            <FormItem label="验证码" prop="code">
              <Col span="10">
              <Input v-model="formValidate.code" placeholder="输入验证码"></Input>
              </Col>
              <Col span="12" offset="1">
              <Button type="ghost" :disabled="isDisabled"  @click="handleSendCode()">{{codeText}}</Button>
              </Col>
            </FormItem>

            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
              <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </div>
        <div class="">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <myfooter></myfooter>
  </section>
</template>
<script>
  import myheader from '@/views/layout/header/header2.vue';
  import myfooter from '@/views/layout/footer/footer.vue';

  export default {
    data () {
      let phoneValidate = (rule, value, callback) => {
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (!reg.test(value)) {
          callback(new Error('手机号格式不正确'));
        } else {
          callback();
        };
      };

      return {
        passwordMadal:false,

        isDisabled:false,
        count:'',
        timer:null,
        codeText:'点击发送验证码',

        formValidate: {
          phone: '',
          code: '',
        },
        ruleValidate: {
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: phoneValidate, trigger: 'blur' }
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
            this.passwordMadal = true
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      //重置表单
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      change (status) {
        this.$Message.info(`Status: ${status}`);
      }
    },
    components:{
      myheader,
      myfooter
    }
  }
</script>
<style scoped lang="scss">
  .register{
    width: 400px;
    margin: 0 auto;
  }
  .content{
    margin-top: 100px;
    min-height: 600px;
    box-shadow: 0px 0px 15px #cccccc;
    background: #ffffff;
    .title{
      text-align: center;
      font-size: 20px;
      line-height: 80px;
    }
  }
</style>
