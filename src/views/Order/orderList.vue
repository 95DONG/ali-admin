<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px">
      <el-input
        placeholder="请输入内容"
        v-model="goodsList.query"
        style="width: 400px"
      >
        <el-button
          @click="onSearchClick"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-table :data="goodsList" border style="width: 100%" stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column prop="order_pay" label="是否付款">
          <template v-slot="scope">
            <el-button
              size="small"
              type="success"
              v-if="scope.row.order_pay === '0'"
              >已支付</el-button
            >
            <el-button v-else type="danger" size="small">未支付</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="create_time" label="下单时间"
          ><template v-slot="scope">
            {{ scope.row.create_time | formMateDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作"
          ><template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="修改收货地址" :visible.sync="dialogVisibleShow">
      <el-cascader
        style="margin-left: 30px; margin-top:30px "
        v-model="value"
        :options="cityOptions"
        :props="{
          expandTrigger: 'hover',
          label: 'name',
          children: 'sub',
          value: 'name',
        }"
        @change="handleChange"
      ></el-cascader>
      <template #footer>
        <el-button type="info">取消</el-button>
        <el-button type="primary">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { cityData } from '@/utils/cityData'
import moment from 'moment'
import { getOrderList } from '@/api/order'
export default {
  async created () {
    const res = await getOrderList(this.data)
    console.log(res)
    this.goodsList = res.data.data.goods
    console.log(this.cityOptions)
  },
  data () {
    return {
      goodsList: [],
      data: {
        pagenum: 1,
        pagesize: 999
      },
      dialogVisibleShow: false,
      value: '',
      cityOptions: cityData
    }
  },
  methods: {
    onSearchClick () { },
    handleChange () { }
  },
  computed: {
  },
  watch: {},
  filters: {
    formMateDate (time) {
      return moment(time * 1000).format('YYYY - MM - DD')
    }
  },
  components: {}
}
</script>

<style scoped lang='less'>
</style>
