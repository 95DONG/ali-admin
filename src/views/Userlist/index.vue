<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>
          <el-input
            placeholder="请输入内容"
            v-model="input"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="primary" @click="setUserForm = true"
            >添加用户</el-button
          >
        </div>
      </div>
      <!-- 表单 -->
      <el-table stripe :data="userList" border style="width: 100%">
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="230">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="230">
        </el-table-column>
        <el-table-column prop="role_name" label="角色" width="230">
        </el-table-column>
        <el-table-column prop="mg_state" label="状态" width="230">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="putStateChange(scope.row.id, scope.row.mg_state)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="zip" label="操作" width="230">
          <template slot-scope="scope">
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
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-setting"
              size="small"
              class="set"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listObj.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>

    <!-- 新增用户信息弹出框 -->
    <el-dialog title="添加用户对话框" :visible.sync="setUserForm">
      <el-form :model="addUsers" :rules="rules">
        <el-form-item
          label="用户名"
          prop="username"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addUsers.username"
            autocomplete="off"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addUsers.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="addUsers.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="mobile"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addUsers.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setUserForm = false">取 消</el-button>
        <el-button type="primary" @click="addUserList">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户信息 -->
    <el-dialog title="添加用户对话框" :visible.sync="putUserForm">
      <el-form :model="addUsers" :rules="rules">
        <el-form-item
          label="用户名"
          prop="username"
          :label-width="formLabelWidth"
        >
          <el-input
            disabled
            v-model="addUsers.username"
            autocomplete="off"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="addUsers.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="mobile"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addUsers.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="putUserForm = false">取 消</el-button>
        <el-button type="primary" @click="putUserForm = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, setUserList, putUserList } from '@/api/user'
export default {
  name: 'Userlist',
  created () {
    this.getUserList()
  },
  data () {
    return {
      value: true,
      userList: [], // 存储用户数据
      total: null, // 存储总用户数据数量
      // 获取用户列表
      listObj: {
        pagenum: 1, // 显示第几页
        pagesize: 5
      },
      input: '',
      // 弹窗内容
      setUserForm: false, // 添加弹出层关闭
      putUserForm: false, // 修改用户信息弹出层关闭
      // form: {
      //   name: '',
      //   region: '',
      //   date1: '',
      //   date2: '',
      //   delivery: false,
      //   type: [],
      //   resource: '',
      //   desc: ''
      // },
      formLabelWidth: '80px',

      // 校验
      addUsers: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }, { min: 3, max: 8, message: '用户名长度3-8', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }, { min: 3, max: 8, message: '密码长度3-8', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    // 修改每页显示的条数
    handleSizeChange (val) {
      this.listObj.pagesize = val
      this.getUserList()
      console.log(`每页 ${val} 条`)
    },
    // 修改当前的页码
    handleCurrentChange (val) {
      console.log(this.total)
      this.listObj.pagenum = val
      this.getUserList()
      console.log(`当前页: ${val}`)
    },
    // 获取用户列表
    async getUserList () {
      console.log(1)
      try {
        const res = await getUserList(this.listObj)
        console.log(123, res)
        this.userList = res.data.data.users
        this.total = res.data.data.total
        console.log('get', this.userList)
      } catch (error) {
        console.log(error)
      }
    },

    // 添加用户
    async addUserList () {
      try {
        const res = await setUserList(this.addUsers)
        console.log('set', res)
      } catch (error) {
        console.log(error)
      }
      // 清空添加的输入框
      this.addUsers = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
      // 调用函数，刷新数据
      this.getUserList()
      // 关闭弹出框
      this.setUserForm = false
    },
    // 修改用户信息
    onPutClick (message) {
      console.log('put', message)
      this.putUserForm = !this.putUserForm
      this.addUsers = message
    },
    // 修改用户状态
    async putStateChange (id, state) {
      console.log('set', id, state)
      const res = await putUserList({ uId: id, type: state })
      console.log('putt', res)
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
  height: 500px;
  margin-top: 20px;
}
.el-input {
  width: 400px;
  margin-right: 30px;
}
/deep/ .el-card__header {
  border-bottom: none;
}
// 表单
.block {
  margin-top: 30px;
}
/deep/ .el-table__row {
  max-height: 30px;
}
.el-form-item {
  .el-input {
    width: 99%;
  }
}
.del {
  background-color: rgb(228, 116, 112);
  border: none;
}
.set {
  background-color: rgb(220, 165, 80);
  border: none;
}
</style>
