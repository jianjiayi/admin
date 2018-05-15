<template>
  <section class="form">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="邮箱" prop="mail">
        <Input v-model="formValidate.mail" placeholder="输入邮箱"></Input>
      </FormItem>
      <FormItem label="验证码" prop="imgCode">
        <Input v-model="formValidate.imgCode" placeholder="输入验证码"></Input>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        formValidate: {
          mail: '',
          imgCode: '',
        },
        ruleValidate: {
          mail: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ],
          imgCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
<style scoped lang="scss">
  .form{
    width: 300px;
  }
</style>
