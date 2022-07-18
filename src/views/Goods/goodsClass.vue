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
          <!-- <el-input
            placeholder="请输入内容"
            v-model="input"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
          <el-button type="primary" @click="setUserForm = true"
            >添加用户</el-button
          > -->
        </div>
      </div>
      <!-- 表单 -->
      <el-table stripe :data="userList" border style="width: 100%">
        <el-table-column prop="id" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <!-- <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="putStateChange(scope.row.id, scope.row.mg_state)"
            >
            </el-switch>
          </template> -->
        </el-table-column>
        <el-table-column prop="zip" label="操作" width="230">
          <!-- <template slot-scope="scope">
            <el-button
              @click="onPutClick(scope.row)"
              type="primary"
              size="small"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="small"
              class="del"
              @click="delUserClick(scope.row.id)"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-setting"
              size="small"
              class="set"
              @click="settingNoun = !settingNoun"
            ></el-button>
          </template> -->
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listObj.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination> -->
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      userList: ''
    }
  },
  methods: {},
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
</style>
