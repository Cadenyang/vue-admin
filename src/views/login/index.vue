<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">Merchant - admin</h3>
      <!-- <img src="@/assets/images/logo.jpg" class="logo"> -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" maxlength="11" auto-complete="on" placeholder="Username" class="input-with-select login-input"/>
        <span>
          <el-select v-model="loginForm.areaCode" slot="prepend" :placeholder="$t('order.code')" style="width:85px;text-align:right;" class="select-code">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </span>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="Password"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="code">
        <div class="code">
          <div style="width: 75%">
            <span class="svg-container">
              <svg-icon icon-class="code" />
            </span>
            <el-input v-model="loginForm.authcode" name="authcode" maxlength="11" auto-complete="on" placeholder="Verification code" >
            </el-input>
          </div>
          <img :src="codeUrl" @click="refreshCode" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          Login
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import codeSlect from '~/config/code'  //加载语言配置文件

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('Please enter correct username'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('Password greater than 6 digits'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value.length == '') {
        callback(new Error('Password enter verification code'))
      } else {
        callback()
      }
    }
    return {
      options: codeSlect.code,
      loginForm: {
        username: '',
        password: '',
        areaCode: '86',
        authcode: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        authcode: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      rerefresh: false
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
  computed: {
    codeUrl() {
      if (this.rerefresh) {
        return ''
      }
      return this.$codeURL + '/user/login/image'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    refreshCode(){
      this.rerefresh = true
      setTimeout(() => {
        this.rerefresh = false
      }, 50)
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 75%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .select-code .el-input {
    width:100%
  }
  .logo {
    display: block;
    width: 200px;
    height: 150px;
    margin: 0 auto;
    margin-bottom: 20px;
  }
}

.code {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  img {
    height: 45px;
    border-radius: 0 5px 5px 0;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .login-input {
    width:72%
   }
}

</style>
