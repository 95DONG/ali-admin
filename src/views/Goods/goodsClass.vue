<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>
          <el-button type="primary" @click="addGoods">添加商品分类</el-button>
        </div>
      </div>
      <zk-table
        class="tb-cate"
        index-text="#"
        show-index
        stripe
        border
        :data="userList"
        :columns="colum"
        :expand-type="false"
        :selection-type="false"
      >
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === !1"
            style="color: green"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <template slot="level" scope="scope">
          <el-tag type="primary" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
        <template slot="opt">
          <el-button type="primary" icon="el-icon-edit" size="mini"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </zk-table>
      <!-- 表单 -->
      <!-- <el-table
        stripe
        :data="userList"
        border
        style="width: 100%"
        row-key="cat_id"
      >
        <template #icon>
          <i class="el-icon-time"></i>
        </template>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
        <el-table-column prop="mobile" label="是否有效">
          <template>
            <el-radio v-model="radio"></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="role_name" label="排序">
          <template v-slot="scope">
            <el-button
              plain
              :type="
                scope.row.cat_level === 0
                  ? 'primary'
                  : scope.row.cat_level === 1
                  ? 'success'
                  : 'warning'
              "
              size="small"
              >{{
                scope.row.cat_level === 0
                  ? "一级"
                  : scope.row.cat_level === 1
                  ? "二级"
                  : "三级"
              }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="zip" label="操作" width="230">
          <template slot-scope="scope">
            <el-button
              @click="onPutClick(scope.row)"
              type="primary"
              size="small"
              icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="small"
              class="del"
              @click="delUserClick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table> -->
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="userList.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 新增弹出层 -->

    <el-dialog
      title="添加商品分类"
      :visible.sync="dialogFormVisible"
      width="50%"
    >
      <el-form
        label-width="100px"
        :model="form"
        :rules="rules"
        ref="addGoodsRef"
      >
        <el-form-item
          label="分类名称："
          style="margin-bottom: 20px"
          prop="name"
        >
          <el-input style="width: 90%" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类：">
          <el-cascader
            clearable
            v-model="value"
            :options="options"
            :props="{
              expandTrigger: 'hover',
              label: 'cat_name',
              value: 'cat_id',
              checkStrictly: true,
            }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postGoods">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsList, postAddGoods } from '@/api/Goods/class'
export default {
  created () {
    this.getGoodsList()
  },
  data () {
    return {
      userList: [], // 存放商品分类列表
      colum: [
        { label: '分类名称', prop: 'cat_name' },
        {
          label: '是否有效',
          type: 'template',
          template: 'isok'
        },
        {
          label: '分类等级',
          type: 'template',
          template: 'level'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt'
        }
      ],
      total: null,
      type: [1, 2, 3],
      pagenum: 1,
      pagesize: 5,
      // 添加弹出
      dialogFormVisible: false,
      // 级联选择器
      value: [],
      options: [],
      addObj: {
        cat_pid: '',
        cat_name: '',
        cat_level: ''
      },
      // 校验
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    async getGoodsList () {
      const res = await getGoodsList({ pagenum: this.pagenum, pagesize: this.pagesize })
      this.userList = res.data.data.result
      this.total = res.data.data.total
      console.log('123', res)
    },
    // 增
    async addGoods () {
      const res = await getGoodsList({ type: [2] })
      console.log('res', res)
      this.options = res.data.data
      this.dialogFormVisible = true
    },
    postGoods () {
      this.$refs.addGoodsRef.validate(async Boolean => {
        if (Boolean) {
          this.addObj.cat_name = this.form.name
          this.dialogFormVisible = false
          const res = await postAddGoods(this.addObj)
          console.log(this.addObj)
          console.log(res)
        } else {
          this.$message.error('表单验证错误')
        }
      })
    },
    // 分页
    handleCurrentChange (value) {
      this.pagenum = value
      this.getGoodsList()
    },
    // 每页数量
    handleSizeChange (value) {
      this.pagesize = value
      this.getGoodsList()
    },
    onPutClick () {
      console.log(this.type)
    },
    handleChange (value) {
      console.log(value)
      this.addObj.cat_pid = value[value.length - 1]
      this.addObj.cat_level = value.length > 2 ? 3 : value.length + 1
      console.log(this.addObj)
    }
  },
  computed: {
    radio () {
      return this.userList.cat_deleted
    }
  },
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
</style>
