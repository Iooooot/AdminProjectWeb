<template>
  <div class="login" :style="'background-image:url('+ Background +');'">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
      <h3 class="title">
        MyAdmin后台管理系统
      </h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" :type="passwordType" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          <svg-icon slot="suffix" :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" class="el-input__icon input-icon show-pwd" @click="showPwd"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl"  @click="getCode">
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" name="rememberMe" style="margin:0 0 25px 0;">
        记住我
      </el-checkbox>
      <span class="findPwd" @click="findPwdDialogVisible = !findPwdDialogVisible">忘记密码？</span>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      v-el-drag-dialog
      title="忘记密码"
      :visible.sync="findPwdDialogVisible"
      width="30%"
      center
      @close="active = 0">
      <el-steps :active="active" finish-status="success">
        <el-step title="输入账号"></el-step>
        <el-step title="验证邮箱"></el-step>
        <el-step title="重置密码"></el-step>
      </el-steps>
      <div v-show="active === 0" style="margin-top: 10px;margin-bottom: -25px;">
        <el-alert
          title="输入需要找回密码的账号"
          type="info"
          :closable="false"
          show-icon>
        </el-alert>
        <el-form ref="findPwdFormS1" :model="findPwdFrom" :rules="findPwdRules" label-width="80px" style="margin-top: 30px;width: 300px" size="small">
          <el-form-item label="用户名：" prop="account">
            <el-input v-model="findPwdFrom.account"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="active === 1" style="margin-top: 10px;margin-bottom: -25px;">
        <el-alert
          title="输入用户名绑定邮箱收到的验证码"
          type="info"
          :closable="false"
          show-icon>
        </el-alert>
        <el-form ref="findPwdFormS2" :rules="findPwdRules" :model="findPwdFrom" label-width="100px" style="margin-top: 30px;width: 200px" size="small">
          <el-form-item label="验证码：" prop="code">
            <el-input v-model="findPwdFrom.code"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="active === 2" style="margin-top: 10px;margin-bottom: -25px;">
        <el-alert
          title="请进行密码重置"
          type="info"
          :closable="false"
          show-icon>
        </el-alert>
        <el-form ref="findPwdFormS3" :rules="findPwdRules" :model="findPwdFrom" label-width="140px" style="margin-top: 30px;width: 280px" size="small">
          <el-form-item label="新密码：" prop="pwd01">
            <el-input v-model="findPwdFrom.pwd01"></el-input>
          </el-form-item>
          <el-form-item label="再次输入新密码：" prop="pwd02">
            <el-input v-model="findPwdFrom.pwd02"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-row v-show="active === 3">
        <el-col>
          <el-result icon="success" title="成功重置密码">
            <template slot="extra">
              <el-button type="primary" size="medium" @click="findPwdDialogVisible = false">返回登录</el-button>
            </template>
          </el-result>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer" v-if="active !== 3">
        <el-button @click="pre()">{{preText}}</el-button>
        <el-button type="primary" @click="next()">{{nextText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Background from '@/assets/images/background.jpeg'
import { loginRules, findPwdRules } from '@/utils/formRules'
import { sendEmail, getCodeImg, verifyEmail, resetPwd } from '@/api/user.js'
import { Message } from 'element-ui'
import elDragDialog from '@/utils/directive/el-dragDialog'
export default {
  name: 'Login',
  directives: {
    elDragDialog
  },
  data() {
    return {
      Background: Background,
      codeUrl: '',
      loginForm: {
        username: 'admin',
        password: '123456',
        rememberMe: true,
        code: 'abc',
        uuid: null
      },
      loginRules,
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      findPwdDialogVisible: false,
      active: 0,
      findPwdRules,
      findPwdFrom: {
        account: null,
        uuid: null,
        id: null,
        code: null,
        pwd01: null,
        pwd02: null
      }
    }
  },
  computed: {
    preText() {
      let str = '返回'
      if (this.active !== 0) {
        str = '上一步'
      }
      return str
    },
    nextText() {
      let str = '下一步'
      if (this.active === 2) {
        str = '确定修改'
      }
      return str
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // 获取验证码
    this.getCode()
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = res.data.img
        // 将uuid存下，验证时带上
        this.loginForm.uuid = res.data.uuid
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
            this.getCode()
          })
        } else {
          Message.error('校验不通过')
          return false
        }
      })
    },
    pre() {
      if (this.active === 0) {
        this.findPwdDialogVisible = false
      }
      if (this.active > 0) {
        this.active--
      }
    },
    next() {
      if (this.active < 3) {

        this.$refs['findPwdFormS' + (this.active + 1)].validate(valid => {
          // 判断校验是否通过
          if (!valid) return
          if (this.active === 0) {
            // 发送验证码
            sendEmail({ 'account': this.findPwdFrom.account }).then(res => {
              this.findPwdFrom.uuid = res.data
              this.active++
            })
          } else if (this.active === 1) {
            // 验证验证码
            verifyEmail({ 'code': this.findPwdFrom.code, 'uuid': this.findPwdFrom.uuid, 'username': this.findPwdFrom.account }).then(res => {
              this.findPwdFrom.id = res.data
              Message.success('验证成功！')
              this.active++
            })
          } else {
            // 判断两次密码是否一致
            if (this.findPwdFrom.pwd01 !== this.findPwdFrom.pwd02) {
              Message.error('两次密码不一致!')
            } else {
              // 更新密码
              resetPwd({ 'password': this.findPwdFrom.pwd01, 'id': this.findPwdFrom.id.toString() }).then(res => {
                Message.success('更新密码成功！')
                this.active++
              })
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon{
    height: 39px;width: 14px;margin-left: 2px;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 2px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }

  .findPwd{
    float: right;
    padding-top: 2px;
    margin-right: 10px;
    font-size: 14px;
    cursor: pointer;
    &:hover{
      color: #409EFF;
    }
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  float: right;
  img{
    cursor: pointer;
    vertical-align:middle
  }
}
</style>

