<template>
  <div class="qualification" :loading="loading">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="真实姓名" prop="vername">
        <Input v-model="formValidate.vername" clearable placeholder="真实姓名"></Input>
      </FormItem>
      <FormItem label="身份证号码" prop="idcard">
        <Input v-model="formValidate.idcard" clearable placeholder="身份证号码"></Input>
      </FormItem>
      <FormItem label="商户类型" prop="role">
        <RadioGroup v-model="formValidate.role">
          <Radio label="1">个人</Radio>
          <Radio label="2">企业</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem v-if="formValidate.role==2" label="营业执照编号" prop="license">
        <Input v-model="formValidate.license" clearable placeholder="身份证号码"></Input>
      </FormItem>
      <FormItem v-if="formValidate.role==2" label="营业执照" prop="verimages">
        <div class="id-card">
          <div class="button">
            <upload-img
              ref="uploadImg0"
              :options="uploadImgOptions"
              title="营业执照"
              name="verimages"
              :src="formValidate.verimages"
              @on-remove="uploadRemove"
              @on-success="uploadSuccess">
            </upload-img>
          </div>
          <div class="model">
            <img src="@/assets/logo.png" alt="">
          </div>
        </div>
        {{formValidate.verimages}}
        <input type="hidden" v-model="formValidate.verimages">
      </FormItem>

      <FormItem label="主营产品" prop="product">
        <Input v-model="formValidate.product" type="textarea" :autosize="{minRows: 2,maxRows: 5}" clearable placeholder="主营产品..."></Input>
      </FormItem>


      <FormItem label="联系电话" prop="phone">
        <Input v-model="formValidate.phone" clearable placeholder="联系电话"></Input>
      </FormItem>
      <FormItem label="联系地址" prop="sheng">
        <city @on-citySuccess="citySuccess" :modelCity="cityModel" v-model="formValidate.sheng"></city>
      </FormItem>
      <FormItem label="详细地址" prop="address">
        <Input v-model="formValidate.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" clearable placeholder="详细地址..."></Input>
      </FormItem>


      <FormItem label="银行账户" prop="bankcard">
        <Input v-model="formValidate.bankcard" clearable placeholder="银行账户"></Input>
      </FormItem>
      <FormItem label="开户行" prop="bankadr">
        <Input v-model="formValidate.bankadr" clearable placeholder="开户行"></Input>
      </FormItem>
      <FormItem label="支付宝账号">
        <Input v-model="formValidate.alipay" clearable placeholder="支付宝账号"></Input>
      </FormItem>
      <FormItem label="微信账号">
        <Input v-model="formValidate.wxpay" clearable placeholder="微信账号"></Input>
      </FormItem>


      <FormItem label="身份证正面" prop="cardimg1">
        <div class="id-card">
          <div class="button">
            <upload-img
              ref="uploadImg1"
              :options="uploadImgOptions"
              title="身份证正面"
              name="cardimg1"
              :src="formValidate.cardimg1"
              @on-remove="uploadRemove"
              @on-success="uploadSuccess">
            </upload-img>
          </div>
          <div class="model">
            <img src="@/assets/logo.png" alt="">
          </div>
        </div>
        <input type="hidden" v-model="formValidate.cardimg1">
      </FormItem>
      <FormItem label="身份证反面" prop="cardimg2">
        <div class="id-card">
          <div class="button">
            <upload-img
              ref="uploadImg2"
              :options="uploadImgOptions"
              title="身份证反面"
              name="cardimg2"
              :src="formValidate.cardimg2"
              @on-remove="uploadRemove"
              @on-success="uploadSuccess">
            </upload-img>
          </div>
          <div class="model">
            <img src="@/assets/logo.png" alt="">
          </div>
        </div>
        <input type="hidden" v-model="formValidate.cardimg2">
      </FormItem>
      <FormItem label="手持身份证" prop="cardimg3">
        <div class="id-card">
          <div class="button">
            <upload-img
              ref="uploadImg3"
              :options="uploadImgOptions"
              title="手持身份证"
              name="cardimg3"
              :src="formValidate.cardimg3"
              @on-remove="uploadRemove"
              @on-success="uploadSuccess">
            </upload-img>
          </div>
          <div class="model">
            <img src="@/assets/logo.png" alt="">
          </div>
        </div>
        <input type="hidden" v-model="formValidate.cardimg3">
      </FormItem>

      <Alert type="warning">
        提交资质即默认阅读并同意
        <router-link :to="{name: 'agreement'}">《商户协议》</router-link>
      </Alert>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交资质</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>

</template>
<script>
  import city from '@/components/city.vue';
  import uploadImg from '@/components/upload-img.vue';

  export default {
    data () {
      return {
        loading: true,
        cityModel:[],
        formValidate: {
          adminId:'',//商户Id
          vername:'',//真实姓名
          idcard:'',//身份证号码
          role:'1',//商户类型 1 个人-2 企业
          license:'',//营业执照编号
          product:'',//主营产品
          phone:'',//联系电话
          sheng:'',//省
          shi:'',//市
          quxian:'',//区县
          address:'',//详细地址
          bankcard:'',//银行账户
          bankadr:'',//开户行
          alipay:'',//支付宝
          wxpay:'',//微信
          verimages:'',//营业执照
          cardimg1:'',//身份证1
          cardimg2:'',//身份证2
          cardimg3:'',//身份证3
        },
        ruleValidate: {
          vername: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' }
          ],
          idcard: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' }
          ],
          license: [
            { required: true, message: '请输入营业执照编号', trigger: 'blur' }
          ],
          product: [
            { required: true, message: '请输入主营产品', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' }
          ],
          sheng: [
            { required: true, message: '请选择省市区县', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
          bankcard: [
            { required: true, message: '请输入银行账户', trigger: 'blur' }
          ],
          bankadr: [
            { required: true, message: '请输入开户行', trigger: 'blur' }
          ],
          verimages: [
            { required: true, message: '请输入营业执照', trigger: 'blur' }
          ],
          cardimg1: [
            { required: true, message: '请输入身份证正面', trigger: 'blur' }
          ],
          cardimg2: [
            { required: true, message: '请输入身份证反面', trigger: 'blur' }
          ],
          cardimg3: [
            { required: true, message: '请输入手持身份证', trigger: 'blur' }
          ],
        },
        uploadImgOptions:{
          width:'100%',//宽度
          height:'100px',//高度

          length:0,//上传文件数量
          format:['jpg','jpeg','png'],//上传文件类型
          size:2048,//上传文件大小
        },
      }
    },
    watch:{
      modelCity(val,oldval){
        console.log(val,oldval);
      }
    },
    methods: {
      //删除上传图片
      uploadRemove(data){
        console.log(data);
        this.formValidate[data.name] = '';
      },
      //上传成功
      uploadSuccess(data){
        console.log(data[0])

        this.formValidate[data[0].name] = data[0].url;
      },
      citySuccess(val){
        this.cityModel = val;
        this.formValidate.sheng = val[0];
        this.formValidate.shi = val[1];
        this.formValidate.quxian = val[2];

      },
      //提交
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            console.log(this.formValidate)
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      //重置
      handleReset (name) {
        this.$refs[name].resetFields();
        this.$refs.uploadImg0.clearData(); // 调用子组件方法
        this.$refs.uploadImg1.clearData(); // 调用子组件方法
        this.$refs.uploadImg2.clearData(); // 调用子组件方法
        this.$refs.uploadImg3.clearData(); // 调用子组件方法
      }
    },
    components:{
      city,
      uploadImg
    }
  }
</script>
<style scoped lang="scss">
  .qualification{
    width: 500px;
    margin: 0 auto;
    .id-card{
      display: flex;
      justify-content: space-between;
      > div{
        width: 45%;
      }
      .button{
        overflow: hidden;
      }
      .model{
        img{
          width: 100%;
          height: 100px;
        }
      }
    }
  }
</style>
