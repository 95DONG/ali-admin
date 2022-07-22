<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>
          <el-input
            placeholder="请输入内容"
            v-model="goodsList.query"
            class="input-with-select"
          >
            <el-button
              @click="onSearchClick"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
          <el-button type="primary" @click="addGoodsList">添加商品</el-button>
        </div>
      </div>
      <!-- 表单 -->
      <el-table stripe :data="userList.goods" border style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间"> </el-table-column>
        <el-table-column prop="zip" label="操作" width="230">
          <template slot-scope="scope">
            <el-button
              @click="onPutClick(scope.row)"
              type="primary"
              size="medium"
              icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="medium"
              class="del"
              @click="delUserClick(scope.row.goods_id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="goodsList.pagenum"
          :page-sizes="[1, 5, 10, 15]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userList.total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getGoodsLists, dleGoodsList } from '@/api/Goods/list'
export default {
  created () {
    this.getGoodsList()
  },
  data () {
    return {
      userList: [],
      // 获取商品列表
      goodsList: {
        query: '',
        pagenum: 1, // 显示第几页
        pagesize: 5
      }
    }
  },
  methods: {
    async getGoodsList () {
      const res = await getGoodsLists(this.goodsList)
      this.userList = res.data.data
      console.log(res)
    },
    // 搜索
    async onSearchClick () {
      const res = await getGoodsLists(this.goodsList)
      this.userList = res.data.data
      console.log(res)
    },
    // 分页
    handleSizeChange (val) {
      this.goodsList.pagesize = val
      this.getGoodsList()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.goodsList.pagenum = val
      this.getGoodsList()
      console.log(`当前页: ${val}`)
    },
    onPutClick () { },
    // 删除商品
    delUserClick (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await dleGoodsList(id)
        console.log(res)
        console.log(id)
        this.getGoodsList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async addGoodsList () {
      this.$router.push('/goodslist/addgoods')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  margin-top: 20px;
}
// 顶部搜索框
.input-with-select {
  width: 400px;
  margin-right: 30px;
}
</style>
