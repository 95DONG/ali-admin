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
              <template>
                <el-tag
                  :key="tag"
                  v-for="tag in manyCategoriesList.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
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
              <template slot-scope="scope">
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
                  @click="delUserClick(scope.row.id)"
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
import { getCategoriesList } from '@/api/Goods/parameter'
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
      tag: []
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
        console.log(res)
        if (this.manyCategoriesList.attr_vals !== '') {
          this.tag = this.manyCategoriesList.attr_vals.split(' ')
        }
      }
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    onPutClick () { },
    delUserClick () { },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  },
  computed: {
    // tag () {
    //   return console.log(); (this.manyCategoriesList.attr_vals.split())
    // }
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
</style>
