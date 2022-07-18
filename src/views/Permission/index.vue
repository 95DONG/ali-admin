<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 表单 -->
      <el-table stripe :data="permissionList" border style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-button
              class="permission"
              @click="onPutClick(scope.row)"
              plain
              :type="
                scope.row.level === '0'
                  ? 'primary'
                  : scope.row.level === '1'
                  ? 'success'
                  : 'warning'
              "
              size="mini"
              >等级{{
                scope.row.level === "0"
                  ? "一"
                  : scope.row.level === "1"
                  ? "二"
                  : "三"
              }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
export default {
  created () {
    this.getPermissionInfo()
  },
  data () {
    return {
      activeName: 1,
      permissionList: []

    }
  },
  methods: {
    async getPermissionInfo () {
      const res = await getPermissionList('list')
      this.permissionList = res.data.data
      console.log('permission', res)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
// 按钮样式
.permission {
  border: none;
}
// 卡片样式
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin-top: 20px;
}
</style>
