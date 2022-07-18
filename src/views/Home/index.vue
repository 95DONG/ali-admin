<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <el-row type="flex" justify="space-between" :gutter="20">
        <el-col :span="1"
          ><div class="grid-content bg-purple">
            <img src="@/assets/logo1.png" alt="" /></div
        ></el-col>
        <el-col :span="20"
          ><div class="grid-content bg-purple-light">
            北极熊俱乐部管理系统
          </div></el-col
        >
        <el-col :span="2"
          ><div class="grid-content bg-purple">
            <el-button @click="goBack">退出</el-button>
          </div></el-col
        >
      </el-row>
    </el-header>
    <!-- 侧边栏 -->
    <el-container>
      <el-aside :width="isSideWidth ? '200px' : '64px'">
        <div class="topside" @click="isSideWidth = !isSideWidth">
          |&nbsp;&nbsp;|&nbsp;&nbsp;|
        </div>

        <!-- 侧边栏列表 -->
        <el-menu
          :default-active="this.$route.path"
          router
          :collapse-transition="false"
          background-color="#373d41"
          text-color="#fff"
          unique-opened
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="!isSideWidth"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-loading"></i>
              <span>俱乐部管理</span>
            </template>
            <el-menu-item index="/userlist"
              ><i class="el-icon-cpu"></i>俱乐部成员</el-menu-item
            >
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-loading"></i>
              <span>权限管理</span>
            </template>
            <!-- 角色管理列表 -->
            <el-menu-item index="/roles"
              ><i class="el-icon-cpu"></i>角色列表</el-menu-item
            >
            <el-menu-item index="/permission"
              ><i class="el-icon-cpu"></i>权限列表</el-menu-item
            >
          </el-submenu>
          <!-- 商品 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-loading"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/goodslist"
              ><i class="el-icon-cpu"></i>商品列表</el-menu-item
            >
            <el-menu-item index="/classparameter"
              ><i class="el-icon-cpu"></i>分类参数</el-menu-item
            >
            <el-menu-item index="/goodsclass"
              ><i class="el-icon-cpu"></i>商品分类</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getPermissionList } from '@/api/permission'
export default {
  created () {
    this.getPermissionTree(0)
  },
  data () {
    return {
      isSideWidth: true,
      isShow: true,
      isCollapse: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    goBack () {
      this.$store.commit('setUser', {})
      this.$router.push('/login')
    },
    // 获取树状列表
    async getPermissionTree () {
      const res = await getPermissionList('tree')
      console.log('tree', res)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;
  .el-header {
    background-color: #475a75;
  }
  .el-aside {
    .topside {
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: rgb(217, 220, 223);
      width: 100%;
      color: #fff;
    }
    background-color: #475a75;
  }
  .el-main {
    background-color: rgb(235, 230, 230);
  }
  .el-menu {
    border-right: none;
  }
}

// /deep/ .grid-content {
// background-color: pink;
//  height: 60px;
//  line-height: 60px;
// }
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  height: 60px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  // background: #d3dce6;
  color: #fff;
}
.bg-purple-light {
  // background: #e5e9f2;
  color: #fff;
}
.grid-content {
  border-radius: 4px;
  min-height: 60px;
  line-height: 60px;
  img {
    width: 60px;
    height: 60px;
  }
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
/deep/ .el-dialog__body {
  padding: 0;
  .el-form-item {
    margin: 0;
  }
}
</style>
