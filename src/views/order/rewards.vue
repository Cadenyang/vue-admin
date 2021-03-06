<template>
  <div class="app-container">
    <query-header :listQuery="listQuery" @loadData="loadData" />
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>

      <el-table-column type="expand" style="background-color:#eee">
        <template slot-scope="scope">
          <el-table :data="scope.row.sub_list">
            <el-table-column :label="$t('order.reward_id')" align="center">
              <template slot-scope="scope">
                {{ scope.row.reward_id }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.out_order_num')" align="center">
              <template slot-scope="scope">
                {{ scope.row.out_order_num }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.phone')" align="center">
              <template slot-scope="scope">
                {{ scope.row.phone }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.receive_type')" align="center">
              <template slot-scope="scope">
                {{ scope.row.receive_type | receiveType}}
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.coin_amount')" align="center">
              <template slot-scope="scope">
                {{ scope.row.coin_amount }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.reward_status')" align="center">
              <template slot-scope="scope">
                {{ scope.row.reward_status | rewardStatus }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.create_time')" align="center">
              <template slot-scope="scope">
                {{ scope.row.create_time }}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('order.id')" width="95">
        <template slot-scope="scope">
          {{ scope.row.transaction_order_id }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.order_number')" align="center">
        <template slot-scope="scope">
          {{ scope.row.order_num }}
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('order.phone_number')" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.area_code">{{ scope.row.area_code }}-</span>
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('order.tag')" align="center">
        <template slot-scope="scope">
          {{ scope.row.tag }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('order.amount')" align="center">
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
          {{ scope.row.ctime | timeZone }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.end_time')" align="center">
        <template slot-scope="scope" v-if="scope.row.status != 1 && scope.row.status != 2 && scope.row.status != 6 ">
          {{ scope.row.utime | timeZone }}
        </template>
      </el-table-column>    
    </el-table>
    <pagination v-show="total>0" :total="total" :page="listQuery.page" :limit="listQuery.pageSize" @pagination="changePagation" style="text-align:center" />
  </div>
</template>

<script>
import queryHeader from './components/Header'
import { getRewardList } from '@/api/order'
import Pagination from '@/components/Pagination'

var _this = null;
export default {
  name: 'Rewards',
  components: { Pagination, queryHeader },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'primary',
        2: 'primary',
        3: 'success',
        4: 'danger',
        5: 'danger',
        6: 'danger',
        7: 'danger',
        8: 'danger',
        9: 'danger',
      }
      return statusMap[status]
    },
    //1:初始化 2:已确认 3:确认失败 4:取消 5:超时
    statusNameFilter(status) {
      const statusNameMap = {
        1: _this.$t('order.initial'),
        2: _this.$t('order.initial'),
        3: _this.$t('order.successful'),
        4: _this.$t('order.failure'),
        5: _this.$t('order.failure'),
        6: _this.$t('order.failure'),
        7: _this.$t('order.failure'),
        8: _this.$t('order.failure'),
        9: _this.$t('order.failure'),
      }
      return statusNameMap[status]
    },
    receiveType(status) {
      const accountType = {
        1: _this.$t('order.receive_account'),
        2: _this.$t('order.account'),
      }
      return accountType[status]
    },
    rewardStatus(status) {
      const rewards = {
        1: _this.$t('order.initial'),
        2: _this.$t('order.confirm'),
        3: _this.$t('order.confirm_error'),
        4: _this.$t('order.error'),
        5: _this.$t('order.time_out')
      }
      return rewards[status]
    }

  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        order_number: '',
        areaCode: '86',
        mobile: '',
        create_start_time: '',
        create_end_time: '',
        finish_start_time: '',
        finish_end_time: '',
        order_status: '',
        page: 1,
        pageSize: 20
      }
    }
  },
  created() {
    _this = this
    this.loadData()
  },
  methods: {
    // 将字符串转换为首字母大写的形式
    firstUpperCase (str) {
      if (str && str.length) {
        let first = str.charAt(0).toUpperCase()
        let others = []
        for (const i of str.slice(1)) {
          others.push(i.toLowerCase())
        }
        return first + others.join('')
      } else {
        return ''
      }
    },
    loadData() {
      this.listLoading = true
      for (let item in this.listQuery) {
        if (this.listQuery[item] === null){
          this.listQuery[item] = ''
        }
      }
      getRewardList(this.listQuery).then(response => {
        if(response.data && response.code == '100010'){
          this.list = response.data.list
          for (const item of this.list) {
            item.tag = this.firstUpperCase(item.tag)
          }
          this.total = response.data.total
        }else{
          this.list  = response.data
          this.total  = 0
        }
        this.listLoading = false
      })
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
