<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item :label="$t('order.order_number')">
          <el-input :placeholder="$t('order.order_number')" v-model="listQuery.order_number" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('order.mobile')">
          <el-input :placeholder="$t('order.mobile')" v-model="listQuery.mobile" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('order.start')" prop="timestamp">
          <el-col :span="10">
              <el-date-picker type="datetime" :placeholder="$t('order.date')"  v-model="listQuery.create_start_time" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1" style="margin-left:30px;margin-right:-10px">-</el-col>
          <el-col :span="10">
              <el-date-picker type="datetime" :placeholder="$t('order.date')" v-model="listQuery.create_end_time" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('order.end_time')" prop="timestamp">
          <el-col :span="10">
              <el-date-picker type="datetime" :placeholder="$t('order.date')"  v-model="listQuery.finish_start_time" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1" style="margin-left:30px;margin-right:-10px">-</el-col>
          <el-col :span="10">
              <el-date-picker type="datetime" :placeholder="$t('order.date')" v-model="listQuery.finish_end_time" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('order.order_status')">
          <el-select :placeholder="$t('order.order_status')" v-model="listQuery.order_status">
            <el-option :label="$t('order.all')" value="-1"></el-option>
            <el-option :label="$t('order.initial')" value="1"></el-option>
            <el-option :label="$t('order.successful')" value="3"></el-option>
            <el-option :label="$t('order.failure')" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadData">{{$t('order.filter')}}</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" :label="$t('order.id')" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.order_number')" align="center">
        <template slot-scope="scope">
          {{ scope.row.order_num }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.phone_number')" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.area_code">{{ scope.row.area_code }}-</span>
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.amount')" align="center">
        <template slot-scope="scope">
          {{ scope.row.coin_amount }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.price')" align="center">
        <template slot-scope="scope">
          {{ scope.row.coin_amount }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" :label="$t('order.order_status')" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter" >{{ scope.row.status  | statusNameFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.start_time')" align="center">
        <template slot-scope="scope">
          {{ scope.row.ctime }}
        </template>Interest date
      </el-table-column>
      <el-table-column :label="$t('order.end_time')" align="center">
        <template slot-scope="scope">
          {{ scope.row.utime }}
        </template>
      </el-table-column>    
    </el-table>

    <pagination v-show="total>0" :total="total" :page="listQuery.page" :pageSize="listQuery.pageSize" @pagination="loadData" />

  </div>
</template>

<script>
import { getRechargeList } from '@/api/order'
import Pagination from '@/components/Pagination'

var _this = null;
export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'primary',
        2: 'primary',
        3: 'success',
        4: 'danger',
        5: 'info',
        6: 'warning',
        7: 'primary',
        8: 'danger',
        9: 'danger',
      }
      return statusMap[status]
    },
    statusNameFilter(status) {
      const statusNameMap = {
        1: _this.$t('order.initial'),
        2: _this.$t('order.recharge'),
        3: _this.$t('order.successful'),
        4: _this.$t('order.failure'),
        5: _this.$t('order.freeze'),
        6: _this.$t('order.stay'),
        7: _this.$t('order.back'),
        8: _this.$t('order.timeout'),
        9: _this.$t('order.cannel'),
      }
      return statusNameMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        order_number: '',
        mobile: '',
        create_start_time: '',
        create_end_time: '',
        finish_start_time: '',
        finish_end_time: '',
        order_status: '',
        page: 1,
        pageSize: 20
      },
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
      getRechargeList(this.listQuery).then(response => {
        if(response.data && response.code == '100010'){
          this.list = response.data.list
          this.total = response.data.total
        }else{
          this.list  = response.data
          this.total  = 0
        }
        this.listLoading = false
      })
    }
  }
}
</script>
