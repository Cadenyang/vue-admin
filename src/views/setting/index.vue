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
        <el-card class="box-card" style="height: 40%">
          <div class="title">
            <span>{{ $t('setting.merchant_key') }}</span>
          </div>
          <div class="config-item" >
            <el-input 
              :type="key"
              v-model="userKey"
              name="appsecrect"
              :disabled="true" style="margin-top:30px;width:70%" >
            </el-input>  
            <span class="show-pwd" @click="showAppsecrect" >
              <svg-icon :icon-class="appsecrect === 1 ? 'eye-open' : 'eye'" />
            </span>
            <el-button type="primary" style="margin-left:5%"
              v-clipboard:copy="userKey"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError">{{ $t('setting.copy') }}
            </el-button>
          </div>
        </el-card>
        <el-card class="box-card" style="height: 58%">
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
                  <el-switch  v-if="language==='zh-CN'" style="margin-left:60px" v-model="switchs.sale"></el-switch>
                  <el-switch  v-if="language==='en-US'" style="margin-left:12px" v-model="switchs.sale"></el-switch>
                </el-form-item>
              </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>  
</template>
<script>
import api from '@/api/user'

var _this = null
export default {
  name: 'setting',
  data(){
    return {
      switchs: {
        sell: false,
        buy: false,
        sale: false
      },
      areaCode: '',
      phone: '',
      userKey: '',
      key: '', 
      appsecrect: '',
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
      }
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
        this.phone = response.data.phone
        this.userKey = response.data.appsecrect
      })
    },  
    showAppsecrect() { 
      if (this.key == 'password') {
        this.key = 'key'
        this.appsecrect = 1
      } else {
        this.appsecrect = 0
        this.key = 'password'
      }
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
.config-item{
  min-height: 100px;
}
.show-pwd {
    position: relative;
    left: 10px;
    top: 1px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
.sell-buy {
  margin-left: 50px;
}
</style>


