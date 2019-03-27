<template>
  <div class="config-container">
    <el-row :gutter="20" class="box">
      <el-col :span="12" style="height: 55%">
        <el-card class="box-card" style="height: 100%">
          <div class="title">
            <span>{{ $t('setting.login_pwd') }}</span>
          </div>
          <div class="config-item">
            <el-form width="80px" style="margin-top:20px">
              <el-form-item>
                <el-input :placeholder="$t('setting.enter_pwd')" v-model="pwd.newPwd"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input :placeholder="$t('setting.confirm_pwd')" v-model="pwd.pwdComfirm"></el-input>
              </el-form-item>
              <el-form-item>
                <span>{{ $t('setting.phone_number') }}</span>: <span>{{ areaCode }}-{{ phone }}</span>
              </el-form-item>
              <el-form-item>
                  <el-input :placeholder="$t('setting.code')" class="input-with-select" v-model="pwd.code">
                    <el-button slot="append" @click="sendMsg" style="background-color:#fff">{{ sendText }}</el-button>
                  </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="margin-bottom:7.5%" @click="changePassword">{{ $t('setting.confirm') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12" style="height: 55%; display: flex; flex-direction: column; justify-content: space-between">
        <el-card class="box-card" style="height: 60%">
          <div class="title">
            <span>{{ $t('setting.security') }}</span>
            <span class="toggle-info" @click="toggleSecurityInfo" >
              <svg-icon :icon-class="appsecrect === 1 ? 'eye-open' : 'eye'" />
            </span>
          </div>
          <!-- APPID -->
          <el-row class="config-item" :gutter="15">
            <el-col :span="6">
              <span class="name">APPID</span>
            </el-col>
            <ElCol :span="14">
              <el-input :type="key" v-model="appId" name="appId" :disabled="true"></el-input>
            </ElCol>
            <ElCol :span="4">
              <el-button type="primary"
                class="config-btn"
                v-clipboard:copy="appId"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError">{{ $t('setting.copy') }}
              </el-button>
            </ElCol>
          </el-row>
          <!-- 密钥 -->
          <el-row class="config-item" :gutter="15">
            <el-col :span="6">
              <span class="name">{{ $t('setting.merchant_key') }}</span>
            </el-col>
            <ElCol :span="14">
            <el-input :type="key" v-model="userKey" name="appsecrect" :disabled="true"></el-input>  
            </ElCol>
            <ElCol :span="4">
              <el-button type="primary"
                class="config-btn"
                v-clipboard:copy="userKey"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError">{{ $t('setting.copy') }}
              </el-button>
            </ElCol>
          </el-row>
        </el-card>
        <el-card class="box-card" style="height: 38%">
          <div class="title">
            <span>{{ $t('setting.switch') }}</span>
          </div>
          <div class="config-item" >
              <el-form ref="switchs" :model="switchs" width="80px" style="margin-top:20px;margin-left:20px">
                <!-- <el-form-item :label="$t('route.Sell')">
                  <el-switch class="sell-buy" v-model="switchs.sell"></el-switch>
                </el-form-item>
                <el-form-item :label="$t('route.Buy')">
                  <el-switch class="sell-buy" v-model="switchs.buy"></el-switch>
                </el-form-item> -->
                <el-form-item :label="$t('route.Commodity_Sale')">
                  <el-switch
                    v-if="language==='zh-CN'" :disabled="loading"
                    style="margin-left:60px"
                    v-model="switchs.sale"
                    :active-value="1"
                    :inactive-value="2"
                    @change="tradeSwitch"></el-switch>
                  <el-switch
                    v-if="language==='en-US'" :disabled="loading"
                    style="margin-left:12px"
                    v-model="switchs.sale"
                    :active-value="1"
                    :inactive-value="2"
                    @change="tradeSwitch"></el-switch>
                </el-form-item>
              </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 手机验证码 -->
    <el-dialog :visible.sync="showDialog" width="30%" center>
      <div style="padding-bottom: 20px;">{{ $t('setting.tip') }}</div>
      <el-form :model="dialogForm" ref="dialogForm" :rules="dialogRules">
        <el-form-item prop="authCode">
          <el-input :placeholder="$t('setting.code')" class="input-with-select" v-model="dialogForm.authCode">
            <template slot="append">
              <el-button @click="sendMsg" style="background-color:#fff;width:70px;">{{sendText}}</el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">{{ $t('setting.cancel') }}</el-button>
        <el-button type="primary" @click="confirmAuthCode">{{ $t('setting.confirm') }}</el-button>
      </span>
    </el-dialog>

  </div>  
</template>
<script>
import api from '@/api/user'
import set_api from '@/api/setting'

var _this = null
export default {
  name: 'setting',
  data(){
    return {
      switchs: {
        // sell: false,
        // buy: false,
        sale: ''
      },
      areaCode: '',
      phone: '',
      userKey: '',
      key: '',
      appsecrect: '',
      appId: '',
      sending: false,
      msgColdDown: true,
      msgColdCount: 60,
      msgCildTimer: null,
      msg: {
        template: '3',
        category: '1'
      },
      pwd: {
        newPwd: '',
        pwdComfirm: '',
        code: ''
      },
      showDialog: false,
      dialogForm: {
        authCode: ''
      },
      loading: false
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    },
    sendText() {
      if (this.msgColdDown) {
        return this.$t('setting.send')
      }
      return this.msgColdCount + 's'
    },
    dialogRules () {
      let rules = {
        authCode: [
          {required: true, message: this.$t('setting.message'), trigger: 'blur'}
        ]
      }
      return rules
    }
  },
  created() {
    _this = this
    this.loadData()
    this.key = 'password'
  },
  methods: {
    loadData() {
      api.getUserList().then(response => {
        if(response.data.areaCode){
            this.areaCode = response.data.areaCode
        }
        this.switchs.sale = response.data.status - 0
        this.phone = response.data.phone
        this.userKey = response.data.appsecrect
        this.appId = response.data.appid
      })
    },
    // 显示/隐藏安全码
    toggleSecurityInfo() { 
      if (this.key == 'password') {
        this.showDialog = true
        this.$nextTick(() => {
          this.$refs.dialogForm.resetFields()
        })
      } else {
        this.appsecrect = 0
        this.key = 'password'
      }
    },
    // 提交手机验证码
    confirmAuthCode () {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          const data = {code: this.dialogForm.authCode}
          api.matchPhoneAuthCode(data).then(res => {
            if (res.success) {
              this.key = 'key'
              this.appsecrect = 1
              this.showDialog = false
            } else {
              this.$message.error({
                message: res.msg,
                duration: 2000,
                onClose: () => {
                  this.showDialog = false
                }
              })
            }
          })
        } else {
          return false
        }
      })
    },
    onCopy: function (e) {
      this.$message({
        message: _this.$t('setting.copy_success'),
        type: 'success'
      });
    },
    onError: function (e) {
      this.$message.error(_this.$t('setting.copy_error'));
    },
    sendMsg() {
      if (!this.msgColdDown) {
        return
      }
      if (this.sending) {
        return
      }
      this.sending = true
      api.getMessage(this.msg).then(response => {
        this.sending = false
        this.msgCold()
      }).catch(err => {
        this.sending = false
      })
    },
    msgCold() {
      this.msgColdDown = false
      this.msgCildTimer = setInterval(() => {
        this.msgColdCount--
        if (this.msgColdCount <= 0) {
           clearInterval(this.msgCildTimer)
           this.msgColdCount = 60
           this.msgColdDown = true
        }
      }, 1000)
    },
    changePassword() {
      if (this.sending) {
        return
      }
      api.changPassword(this.pwd).then(response => { 
        if(true == response.success){
           this.$message({
            message: _this.$t('setting.success'),
            type: 'success'
          })
          this.pwd = ''
          this.msgColdCount = ''
        }else{
          this.$message.error(_this.$t('setting.error'))
          loadData()
        }
      })
    },
    // 改变商品出售开关
    tradeSwitch () {
      if (!this.loading) {
        this.loading = true
        set_api.tradeSwitch({
          status: this.switchs.sale * 1
        }).then(res => {
          this.loadData()
        })
        this.loading = false
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.box {
  min-width: 500px;
  height: 800px;
}
.config-container {
  padding: 30px;
}
.title {
  width: 100%;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
  padding: 0 0 10px 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.config-item {
  margin: 20px 0;
}
.config-item .name {
  padding-left: 10px;
  line-height: 36px;
  font-size: 14px;
  color: #333;
}
.config-item .config-btn {
  display: block;
  width: 100%;
}
.toggle-info {
  padding: 0 10px;
  float: right;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}
.sell-buy {
  margin-left: 50px;
}
</style>


