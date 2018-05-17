<template>
  <div class="upload">
    <div
      v-for="item in uploadList"
      class="upload-list"
      :style='"width:"+options.width+";height:"+options.height'>
      <img :src="item.url" :title="item.name">
      <div class="upload-list-cover">
        <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
      </div>
    </div>
    <Upload
      v-show="uploadList.length==0"
      :name="name"
      :format="options.format"
      :show-upload-list="false"
      :max-size="options.size"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :on-success="handleSuccess"
      :action="action">
      <div
        class="upload-btn"
        :style='"width:"+options.width+";height:"+options.height'>
        <Icon type="camera" size="30"></Icon>
        <i calss="text">{{title}}</i>
      </div>
    </Upload>
    <Modal title="查看大图" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
  export default {
    props:['options','name','src','title'],
    data () {
      return {
        action:'http://192.168.1.111:8082/NewDwShop/profile/fileupload.do',//上传地址

        imgName: '',//查看图片
        visible: false,
        uploadList: []//存放上传图片
      }
    },
    created(){
      this.getImgArray(this.src);//获取传递 图片 string
    },
    methods: {
      getImgArray(string){//格式化成数组
        let array = (string||"").split(',');
        if(array[0]=='') return;
        array.map(n => {
          this.uploadList.push({
            name :this.name,
            url : n
          })
        })
      },
      //查看大图
      handleView (src) {
        this.imgName = src;
        this.visible = true;
      },
      //删除图片
      handleRemove(file) {
        this.uploadList.splice(this.uploadList.indexOf(file), 1);
        console.log(this.uploadList)
        this.$emit('on-remove',file)
      },
      //校验格式
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        })
      },
      //限制大小
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        })
      },
      //上传成功
      handleSuccess (res, file) {
        console.log('res:'+res,file);
        this.uploadList.push({
          name :this.name,
          url : res.replace('[','').replace(']','').split(',')[1]
        });
        this.$emit('on-success',this.uploadList)
      },
      //清理组件数据
      clearData () {
        this.uploadList = [];
        console.log('调用成功');
      }
    },
  }
</script>
<style scoped lang="scss">
  .upload{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .upload-list{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #cccccc;
      img{
        width: 100%;
        height: 100%;
      }
      .upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
        i{
          color: #fff;
          font-size: 20px;
          cursor: pointer;
          margin: 0 10px;
        }
      }
    }
    .upload-list:hover{
      .upload-list-cover{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
    }
    .upload-btn{
      position: absolute;
      top:0;
      left:0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      /*background-color: #cccccc;*/
      border:1px solid #cccccc;
      border-radius: 5px;
      overflow: hidden;
      i{
        margin: 5px;
      }
    }
    .upload-btn:hover{
      border: 1px solid #69b7ed;
    }
  }
</style>




