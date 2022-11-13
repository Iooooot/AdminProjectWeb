<template>
  <div class="dashboard-container">
    <el-calendar v-model="value">
    </el-calendar>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
