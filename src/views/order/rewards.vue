<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item :label="$t('order.order_number')">
          <el-input :placeholder="$t('order.order_number')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('order.mobile')">
          <el-input :placeholder="$t('order.mobile')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('order.start_time')" prop="timestamp">
          <el-date-picker  type="datetime" :placeholder="$t('order.date')"/>
        </el-form-item>
        <el-form-item :label="$t('order.end_time')" prop="timestamp">
          <el-date-picker type="datetime" :placeholder="$t('order.date')"/>
        </el-form-item>
        <el-form-item :label="$t('order.order_status')">
          <el-select :placeholder="$t('order.order_status')" v-model="status">
            <el-option :label="$t('order.all')" value="All"></el-option>
            <el-option :label="$t('order.initial')" value="Initial"></el-option>
            <el-option :label="$t('order.successful')" value="Successful"></el-option>
            <el-option :label="$t('order.failure')" value="Failure"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{$t('order.filter')}}</el-button>
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
        <template slot-scope="scope" >
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
import { getRewardList } from '@/api/order'
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
        page: 1,
        pageSize: 20
      },
      status: 'All'
    }
  },
  created() {
    _this = this
    this.loadData()
  },
  methods: {
    loadData(val) {
      if (val) {
        this.listQuery = val
      }
      this.listLoading = true
      getRewardList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    onSubmit(){}
  }
}
</script>
