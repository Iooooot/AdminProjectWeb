<template>
  <div class="app-container">
    <div>
      <span>富文本编辑器</span>
      <el-divider></el-divider>
    </div>
    <div ref="editor" class="text" />
  </div>
</template>

<script>
import { upload } from '@/utils/upload'
import E from 'wangeditor'
export default {
  name: 'Editor',
  data() {
    return {
      imagesUploadApi: 'http://127.0.0.1:8088/upload/pictures'
    }
  },
  mounted() {
    const _this = this
    var editor = new E(this.$refs.editor)
    // 自定义菜单配置
    editor.config.zIndex = 5
    // 文件上传
    editor.config.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      files.forEach(image => {
        upload(_this.imagesUploadApi, image).then(res => {
          console.log(res)
          // 后端直接返回url
          insert(res.data.data)
        })
      })
    }
    editor.config.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()
  }
}
</script>

<style scoped>
  .text {
    text-align:left;
  }
 ::v-deep .w-e-text-container {
    height: 420px !important;
  }
</style>
