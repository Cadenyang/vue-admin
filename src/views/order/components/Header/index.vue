<template>
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline" label-width="110px" label-position="left">
      <el-row class="box">
        <el-col :span="10" style="height: 55%;" >
          <el-card class="box-card" style="">
            <el-form-item :label="$t('order.order_number')">
              <el-input :placeholder="$t('order.order_number')" v-model="listQuery.order_number" clearable class="input-width"></el-input>
            </el-form-item>
            <el-form-item :label="$t('order.start')" prop="timestamp">
              <el-col :span="10">
                  <el-date-picker type="datetime" :placeholder="$t('order.date')"  v-model="listQuery.create_start_time" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-col>
              <el-col class="line" :span="1" style="margin-left:30px;margin-right:-10px;">-</el-col>
              <el-col :span="10">
                  <el-date-picker type="datetime" :placeholder="$t('order.date')" v-model="listQuery.create_end_time" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="limitPicker"></el-date-picker>
              </el-col>
            </el-form-item>  
            <el-form-item :label="$t('order.order_status')">
              <el-radio-group v-model="listQuery.order_status">
                <el-radio-button :label="''">{{ $t('order.all') }}</el-radio-button>
                <el-radio-button :label="1">{{ $t('order.initial') }}</el-radio-button>
                <el-radio-button :label="3">{{ $t('order.successful') }}</el-radio-button>
                <el-radio-button :label="4">{{ $t('order.failure') }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-card>
        </el-col>

        <el-col :span="9" style="height: 55%;">
          <el-card class="box-card">
              <el-form-item :label="$t('order.mobile')">
                <el-input :placeholder="$t('order.mobile')" v-model="listQuery.mobile" clearable class="input-with-select input-width">
                  <el-select v-model="listQuery.areaCode" slot="prepend" :placeholder="$t('order.code')" class="el-code">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
                  </el-select>
                </el-input>  
              </el-form-item>
              <el-form-item :label="$t('order.end_time')" prop="timestamp">
                <el-col :span="10">
                    <el-date-picker type="datetime" :placeholder="$t('order.date')"  v-model="listQuery.finish_start_time" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-col>
                <el-col class="line" :span="1" style="margin-left:30px;margin-right:-10px;">-</el-col>
                <el-col :span="10">
                    <el-date-picker type="datetime" :placeholder="$t('order.date')" v-model="listQuery.finish_end_time" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="limitPicker"></el-date-picker>
                </el-col>
              </el-form-item>  
              <br /> 
              <div>
              <el-form-item>
                <el-button type="primary" @click="loadData" style="">{{$t('order.filter')}}</el-button>
              </el-form-item>
              </div>
          </el-card>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import codeSlect from '~/config/code'  //加载语言配置文件

export default {
  name: 'Header',
  props: {
      listQuery: {
        type: Object,
        default() {
            return {}
        }
      }
  },
  data() {
    return {
      options: codeSlect.code,
      limitPicker: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    }
  },
  methods: {
    loadData() {
      this.$emit('loadData')
    }
  } 
}
</script>

<style>
  .app-container {
    padding: 10px;
  }
  .box {
    min-width: 1260px;
  }
  .el-code {
    width: 100px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .input-width {
    width: 453px;
  }
  .box-card {
    border:none;
  }
  .el-card.is-always-shadow {
    -webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 1);
  }
  .sell-buy {
    margin-left: 50px;
  }
</style>