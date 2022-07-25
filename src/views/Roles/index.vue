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
      <div slot="header" class="clearfix">
        <div>
          <el-button type="primary" @click="setUserForm = true"
            >添加用户</el-button
          >
        </div>
      </div>
      <!-- 表单 -->
      <el-table stripe :data="userList" border style="width: 100%">
        <el-table-column prop="id" label="#" width="50" type="expand">
          <template slot-scope="{ row }">
            <el-row
              v-for="(item, index) in row.children"
              :key="index"
              type="flex"
              align="middle"
              class="border-top"
            >
              <el-col :span="3">
                <el-tag>{{ item.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="21">
                <el-row
                  v-for="(item1, index1) in item.children"
                  :key="index1"
                  type="flex"
                >
                  <el-col :span="6">
                    <el-tag type="success">{{ item1.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col>
                    <el-tag
                      closable
                      :disable-transitions="false"
                      type="success"
                      :span="18"
                      v-for="(item2, index2) in item1.children"
                      :key="index2"
                      @close="handleClose(row.id, item2.id, row)"
                      >{{ item2.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="onPutClick(scope.row)"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              class="del"
              @click="delUserClick(scope.row.id)"
              >删除</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-setting"
              size="mini"
              class="set"
              @click="setRolesControl(scope.row)"
              >分配角色</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配角色弹窗 -->
    <el-dialog title="分配角色" :visible.sync="dialogVisible" width="50%">
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        :default-checked-keys="arr"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getCurrentKey">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增用户信息弹出框 -->
    <el-dialog
      :title="title"
      :visible.sync="setUserForm"
      width="50%"
      v-if="setUserForm"
    >
      <el-form
        :model="addUsers"
        :rules="rules"
        label-width="100px"
        ref="addUserFormRef"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addUsers.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addUsers.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            addUsers = {};
            setUserForm = false;
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="addUserList">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesList, delRolesControl, postRolesControls, postRoleName, delRoleName } from '@/api/roles'
import { getPermissionList } from '@/api/permission'
export default {
  created () {
    this.getRolesInfo()
  },
  data () {
    return {
      type: 'tree',
      userList: [], // 存储角色列表
      dialogVisible: false,
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: { // 修改树的默认属性名
        children: 'children',
        label: 'authName'
      },
      // 新增权限管理
      arr: [], // 存放树选中的id
      str: '',
      id: '',
      // 新增角色 校验
      setUserForm: false,
      addUsers: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }, { min: 3, max: 8, message: '用户名长度3-8', trigger: 'blur' }
        ]
        // roleDesc: [{ required: true, message: '密码不能为空', trigger: 'blur' }, { min: 3, max: 8, message: '密码长度3-8', trigger: 'blur' }
        // ]
      },
      // 判断是新增还是编辑
      isAdd: true
    }
  },
  methods: {
    // 获取角色列表
    async getRolesInfo () {
      const res = await getRolesList()
      this.userList = res.data.data

      // console.log('roles', res)
    },

    handleChange (val) {
      console.log(val)
    },
    onBtn (row) {
      console.log(row)
    },
    // 删除标签
    async handleClose (id1, id2, row) {
      console.log(id1, id2)
      const obj = {
        roleId: id1, rightId: id2
      }
      try {
        const res = await delRolesControl(obj)
        row.children = res.data.data
        // console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    // 分配权限按钮
    async setRolesControl (row) {
      console.log(222)
      this.id = row.id
      this.dialogVisible = true
      const res = await getPermissionList('tree')
      this.data = res.data.data
      // console.log(res)
      this.arr = []
      row.children.forEach(item => {
        item.children.forEach(item1 => {
          item1.children.forEach(item2 => {
            this.arr.push(item2.id)
          })
        })
      })
      console.log(this.arr)
    },
    // 新增权限管理
    async getCurrentKey () {
      // console.log('1', this.$refs.tree.getCheckedKeys())
      // console.log('2', this.$refs.tree.getHalfCheckedKeys())
      this.str = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()].join()
      // console.log(this.str)
      const res = await postRolesControls(this.id, this.str)
      console.log(res)
      this.dialogVisible = false
    },
    // 新增角色
    async addUserList () {
      if (this.addUsers.roleName !== '') {
        const res = await postRoleName(this.addUsers)
        console.log(res)
        this.addUsers = {}
        this.getRolesInfo()
        this.setUserForm = false
      } else {
        this.$message.error('角色名不能为空')
        this.$refs.addUserFormRef.validate()
      }
      // 异步捕获用法
      //   try {
      //   await this.$refs.addUserForm.validate()
      //   const res = await addUserAPI(this.addUserData)
      //   console.log(res)
      //   this.addUserData = {}
      //   this.getUserList()
      //   this.addDialog = false
      // } catch (error) {
      //   console.log(error)
      // }
    },
    // 删除
    async delUserClick (id) {
      console.log(id)
      const res = await delRoleName(id)
      console.log(res)
      this.getRolesInfo()
    },
    // 编辑
    onPutClick (userInfo) {
      this.setUserForm = true
      this.isAdd = false
      this.addUsers = userInfo
    }
  },
  computed: {
    title () {
      return this.isAdd ? '新增角色' : '修改角色'
    }
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
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
// 角色列表下拉布局
.outside {
  display: flex;
  // justify-content: center;
  align-items: center;
  .oneInside {
    // background-color: pink;
    flex: 1;
  }
  .box {
    flex: 9;
  }
  .twoInside {
    // align-items: center;
    display: flex;

    // flex-direction: column;
    flex: 9;
    .left {
      flex: 3;
      // background-color: skyblue;
      // border-bottom: 2px solid #333;
    }
    .right {
      flex: 9;
    }
  }
}
.border-top {
  border-bottom: 1px solid #333;
}
.el-input {
  width: 99%;
}
/deep/ .el-form-item {
  padding: 10px 0;
}
.el-col{
margin: 10px;
.el-tag{
margin-right: 10px;
margin-bottom: 10px;
}
}
</style>
