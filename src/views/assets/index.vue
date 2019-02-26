<template>
<div> 
  <div class="assets-container">
    <el-row :gutter="20" class="box" v-loading="listLoading">
      <el-col :span="24" style="height: 55%">
        <el-card class="box-card" style="height: 100%">
          <div class="title">
            <span>{{ $t('assets.assets_total') }}</span>
          </div>
          <div class="assets-item">
            <div class="assets-amount">{{ assets }}</div>
            <div class="assets-detail">
              <span>{{ $t('assets.available') }}：{{ available }}</span>
              <span class="detail-right">{{ $t('assets.frozen') }}：{{ freezeAssets }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div class="assets-container">
    <el-form :inline="true" class="demo-form-inline" label-width="110px" label-position="left">
     <el-form-item prop="timestamp">
        <el-col :span="10">
            <el-date-picker type="datetime" :placeholder="$t('order.start_time')"  v-model="listQuery.start_time" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1" style="margin-left:30px;margin-right:-10px;">-</el-col>
        <el-col :span="10">
            <el-date-picker type="datetime" :placeholder="$t('order.end_time')" v-model="listQuery.end_time" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-col>
      </el-form-item> 
    <el-button type="primary" style="margin-left:50px;"  @click="loadData" >{{$t('order.filter')}}</el-button>
    </el-form> 
  </div>
  <div class="assets-container" style="width:50%;margin-top:-20px" >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('assets.all_types')" name=""></el-tab-pane>
      <el-tab-pane :label="$t('assets.sell_usdx')" name="Recharge"></el-tab-pane>
      <el-tab-pane :label="$t('assets.buy_usdx')" name="Pay"></el-tab-pane>
      <el-tab-pane :label="$t('assets.commodity_sale')" name="Pay"></el-tab-pane>
      <el-tab-pane :label="$t('assets.rewards')" name="Issue rewards"></el-tab-pane>
    </el-tabs>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      highlight-current-row>
      <el-table-column :label="$t('assets.time')" align="center">
        <template slot-scope="scope">
          {{ scope.row.creatTime | timeFormat }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('assets.type')" align="center">
        <template slot-scope="scope">
          {{ scope.row.remark | typeFilter }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('assets.amount')" align="center">
        <template slot-scope="scope" >
          <span :style="{'color': scope.row.operationType == 40 ? 'green' : 'red'}">
            {{ scope.row.waterMoney }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('assets.balance')" align="center">
        <template slot-scope="scope">
          {{ scope.row.assets }}
        </template>
      </el-table-column> 
    </el-table>
    <pagination v-show="total>0" :total="total" :page="listQuery.page" :limit="listQuery.pageSize" @pagination="changePagation" style="text-align:center" />
  </div>   
</div> 
</template>
<script>
import api from '@/api/assets'
import Pagination from '@/components/Pagination'

var _this = null;
export default {
  name: 'assets',
  components: { Pagination },
  filters: {
    typeFilter(status) {
      const typeFilter = {
        'Issue rewards': _this.$t('assets.issue'),
        'Recharge': _this.$t('assets.recharge'),
        'Pay': _this.$t('assets.pay'),
        'Accounting': _this.$t('assets.accounting'),
        'Refund': _this.$t('assets.refund'),
        'Transfer out': _this.$t('assets.transfer_out'),
        'Transfer in': _this.$t('assets.transfer_in'),
      }
      return typeFilter[status]
    },
    timeFormat(unixtime) {
      let unixTimestamp = new Date(unixtime)
      return unixTimestamp.toLocaleDateString().replace(/\//g, "-") + " " + unixTimestamp.toTimeString().substr(0, 8)
    }
  },  
  data() {
    return {
      list: null,
      total: 0,
      assets: '',
      available: '',
      freezeAssets: '',
      listLoading: false,
      activeName: '',
      listQuery: {
        type: '',
        page: 1,
        pageSize: 20,
        start_time: '',
        end_time: ''
      }
    }
  },
  created() {
    _this = this
    this.loadData()
  },
  methods: {
    loadData() {
      this.listLoading = true
      for (let item in this.listQuery) {
        if (this.listQuery[item] === null){
          this.listQuery[item] = ''
        }
      }
      api.getAssetsList().then(response => {
        if(response.data && response.success == true){
          this.assets = response.data.assets
          this.available = response.data.available
          this.freezeAssets = response.data.freezeAssets
        }
        this.listLoading = false
      }),
      api.getWaterList(this.listQuery).then(response => {
        if(response.data && response.success == true){
          this.list = response.data.list
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    handleClick() {
      this.listQuery.type = this.activeName
      this.loadData()
    },
    changePagation(page, pageSize) {
      this.listQuery.page = page
      this.listQuery.pageSize = pageSize
      this.loadData()
    }
  }
}
</script>
<style>
.assets-container {
  min-width: 800px;
  padding: 20px;
}
.title {
  width:40%;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
  padding: 0 0 10px 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.assets-item {
  min-height: 100px;
}
.assets-amount{
  line-height: 60px;
  font-weight: bold;
  font-size: 20px;
  margin-left:10px;
}
.assets-detail{
  line-height: 50px;
  margin-left:10px;
}
.detail-right{
  margin-left: 30px;
}
.el-tabs__nav-scroll {
  background-color: #eee
}
.el-tabs__item {
  text-align: center;
  width: 150px;
  height: 55px;
  line-height: 55px
}
</style>

