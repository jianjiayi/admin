<template>
  <section class="form">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="手机号" prop="phone">
        <Input v-model="formValidate.phone" placeholder="输入手机号"></Input>
      </FormItem>
      <FormItem label="短信验证码" prop="code">
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
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>

    <set-password :setModel="passwordMadal" @onOk="submitPassword" @onCancel="cancel"></set-password>
  </section>
</template>
<script>
  import  setPassword from '@/components/set-password.vue'
  export default {
    data () {
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
          phone: '',
          code: '',
        },
        ruleValidate: {
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
    methods: {
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
      //设置密码
      submitPassword(form){
        console.log(form)
      },
      cancel(){
        this.passwordMadal = false
      }
    },
    components:{
      setPassword
    }
  }
</script>
<style scoped lang="scss">
  .form{
    width: 310px;
  }

</style>
