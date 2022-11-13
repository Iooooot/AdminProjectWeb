<template>
  <div class="app-container">
    <div>
      <span>MarkDown编辑器</span>
      <el-divider></el-divider>
    </div>
    <mavon-editor ref="md" :style="'height:' + height" @imgAdd="imgAdd" />
  </div>
</template>

<script>
import { upload } from '@/utils/upload'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'Markdown',
  components: {
    mavonEditor
  },
  data() {
    return {
      height: document.documentElement.clientHeight - 200 + 'px',
      imagesUploadApi: 'http://127.0.0.1:8088/upload/pictures'
    }
  },
  mounted() {
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 200 + 'px'
    }
  },
  methods: {
    imgAdd(pos, $file) {
      upload(this.imagesUploadApi, $file).then(res => {
        this.$refs.md.$img2Url(pos, res.data.data)
      })
    }
  }
}
</script>

<style scoped>
  .v-note-wrapper.shadow {
    z-index: 5;
  }
</style>
