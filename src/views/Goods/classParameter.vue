<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
        closable
        style="margin-bottom: 10px"
      >
      </el-alert>

      <div class="block">
        <span>选择商品分类：</span>
        <el-cascader
          v-model="value"
          :options="options"
          :props="{
            expandTrigger: 'hover',
            label: 'cat_name',
            value: 'cat_id',
          }"
          @change="handleChange"
        ></el-cascader>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button size="small" type="primary">添加参数</el-button>
          <el-table
            stripe
            :data="manyCategoriesList"
            border
            style="width: 100%"
          >
            <el-table-column prop="id" width="50" type="expand">
              <template v-slot="scope">
                <el-tag
                  :key="index"
                  v-for="(tag, index) in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row, tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"> </el-table-column>
            <el-table-column prop="attr_name" label="分类名称">
            </el-table-column>
            <el-table-column prop="roleName" label="操作">
              <template v-slot="scope">
                <el-button
                  @click="onPutClick(scope.row)"
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  class="del"
                  @click="delUserClick(scope.row)"
                  >删除</el-button
                ></template
              >
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
          <el-button size="small" type="primary">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/Goods/class'
import { getCategoriesList, postCategoriesTag, delCategoriesTag } from '@/api/Goods/parameter'
export default {
  async created () {
    const res = await getGoodsList({ type: '', pagenum: '', pagesize: '' })
    // console.log(res)
    this.options = res.data.data
  },
  data () {
    return {
      value: [],
      options: [],
      activeName: 'first',
      manyCategoriesList: [],
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      data: {
      }
    }
  },
  methods: {
    async handleChange (value) {
      console.log(value)
      if (value.length !== 3) {
        this.$message.error('请选择三级分类')
        this.value = []
      } else {
        const res = await getCategoriesList(value[2], 'many')
        this.manyCategoriesList = res.data.data
        // console.log(res.data.data)
        this.manyCategoriesList.forEach(item => {
          if (item.attr_vals.length > 1) {
            item.attr_vals = item.attr_vals.split(' ')
            // console.log(item.attr_vals)
          } else {
            item.attr_vals = []
          }
        })
        // console.log(this.manyCategoriesList)
      }
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },

    // 删除按钮
    onPutClick () { },
    async delUserClick (row) {
      const res = await delCategoriesTag(row.cat_id, row.attr_id)
      console.log(res)
    },
    // 删除标签
    async handleClose (row, tag) {
      console.log('row', row, tag)
      row.attr_vals.splice(row.attr_vals.indexOf(tag), 1)
      this.data = {
        attr_name: row.attr_name,
        attr_sel: 'many',
        attr_vals: row.attr_vals.join(' '),
        attrId: row.attr_id,
        id: row.cat_id
      }
      const res = await postCategoriesTag(this.data)
      console.log(res)
      this.data = {}
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    async handleInputConfirm (str) {
      const inputValue = this.inputValue
      // console.log(str)
      if (inputValue) {
        str.attr_vals.push(inputValue)
      }
      this.data = {
        attr_name: str.attr_name,
        attr_sel: 'many',
        attr_vals: str.attr_vals.join(' '),
        attrId: str.attr_id,
        id: str.cat_id
      }
      const res = await postCategoriesTag(this.data)
      console.log(res)
      this.data = {}
      this.inputVisible = false
      this.inputValue = ''
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.box-card {
  margin-top: 20px;
}
/deep/ .el-table__expanded-cell {
  padding-left: 50px;
  .el-tag {
    margin-right: 15px;
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
