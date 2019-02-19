<template>
  <div class="config-container" >
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div class="title">
            <span>Merchant Login Password Setting</span>
          </div>
          <div class="config-item" style="">
            <el-form width="80px" style="margin-top:20px">
              <el-form-item>
                <el-input :placeholder="$t('setting.enter_pwd')"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="Confirm password"></el-input>
              </el-form-item>
              <el-form-item>
                <span>Phone Number: 86-13100000001</span>
              </el-form-item>
              <el-form-item>
                  <el-input placeholder="SMS verification code" class="input-with-select">
                    <el-button slot="append" style="background-color:#fff">send</el-button>
                  </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="margin-bottom:7.5%">Confirm</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div class="title">
            <span>Merchant key</span>
          </div>
          <div class="config-item" style="height:50%">
            <el-input :disabled="true" style="margin-top:30px;width:70%" placeholder="hzbnqFkDAAeDauqzdkqGDaIHFHjrcdhtwCacebBvqxqowJElgo">
            </el-input>  
            <span class="show-pwd" @click="showPwd">
              <svg-icon icon-class="eye-open" />
            </span>
            <span class="show-pwd" style="margin-left:10%">
              copy
            </span>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top:10px">
          <div class="title">
            <span>Interface switch</span>
          </div>
          <div class="config-item" style="height:50%">
              <el-form width="80px" style="margin-top:20px;margin-left:20px">
                <el-form-item label="Sell USDX:">
                  <el-switch class="sell-buy"></el-switch>
                </el-form-item>
                <el-form-item label="Buy USDX:">
                  <el-switch class="sell-buy"></el-switch>
                </el-form-item>
                <el-form-item label="Commodity sale:">
                  <el-switch style="margin-left:12px"></el-switch>
                </el-form-item>
              </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>  
</template>

<style scoped>
.config-container {
  padding: 30px;
}
.title {
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


