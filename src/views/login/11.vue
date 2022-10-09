<template>
  <div>
  </div>
</template>

<script>
export default {
  name: '11',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {
    //以属性名作为此种方法名对此进行监听
  },
  methods: {},
  beforeCreate() {
    console.log('数据模型未加载：方法未加载：html模板未加载：')
  },
  created() {
    console.log('数据模型已加载：方法已加载：html模板已加载：html模板未渲染：')
  },
  beforeMount() {
    console.log('html模板未渲染：')
  },
  mounted() {
    console.log('html模板已渲染：')
  },
  beforeUpdate() {
    console.log('数据模型已更新：html模板未更新：')
  },
  updated() {
    console.log('数据模型已更新：html模板已更新：')
  }
}
</script>

<style lang="scss" scoped>

</style>
