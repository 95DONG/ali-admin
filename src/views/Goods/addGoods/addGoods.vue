<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-alert
        title="消息提示的文案"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-tabs tab-position="left" @tab-click="tabClick">
        <el-tab-pane label="基本信息">
          <el-form :model="goodsInfo" :rules="rules">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input
                v-model="goodsInfo.goods_name"
                autocomplete="off"
                size="large"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input
                :min="0"
                type="number"
                controls-position="right"
                v-model="goodsInfo.goods_price"
                size="large"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input
                v-model="goodsInfo.goods_weight"
                size="large"
                :min="0"
                type="number"
                controls-position="right"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input
                v-model="goodsInfo.goods_number"
                size="large"
                type="number"
                :min="0"
                controls-position="right"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="value"
                :options="options"
                clearable
                ref="clearRef"
                :props="{
                  expandTrigger: 'hover',
                  label: 'cat_name',
                  value: 'cat_id',
                }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" style="margin-top: 30px">
          <el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
          <el-checkbox v-model="checked2" label="备选项2" border></el-checkbox>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form :model="goodsInfo" :rules="rules">
            <el-form-item label="商品名称" prop="username">
              <el-input
                v-model="goodsInfo.goods_name"
                autocomplete="off"
                size="large"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <div style="border: 1px solid #ccc">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editor"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
            <Editor
              style="height: 300px; overflow-y: hidden"
              v-model="html"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="onCreated"
            />
          </div>
          <el-button type="primary" style="margin-top: 30px"
            >添加商品</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { getGoodsList } from '@/api/Goods/class'
export default {
  async created () {
    const res = await getGoodsList({ type: '', pagenum: '', pagesize: '' })
    this.options = res.data.data
    console.log(res)
  },
  data () {
    return {
      active: 0,
      value: '',
      goodsInfo: {
        goods_name: '',
        goods_cat: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: ''
      },
      // 规则
      rules: {
        goods_name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }, { min: 3, max: 8, message: '用户名长度3-8', trigger: 'blur' }
        ],
        goods_price: [{ required: true, message: '商品价格不能为空', trigger: 'blur' }, { min: 1, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_number: [{ required: true, message: '商品价格不能为空', trigger: 'blur' }, { min: 1, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [{ required: true, message: '商品价格不能为空', trigger: 'blur' }, { min: 1, message: '请输入商品价格', trigger: 'blur' }
        ]
      },
      checked1: true,
      checked2: false,
      fileList: [],
      // 富文本编辑器
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
      options: []
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    // 富文本编辑器
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    tabClick (e) {
      this.active = e.index * 1
    },
    handleChange (value) {
      this.$refs.clearRef.$refs.panel.clearCheckedNodes()
      console.log(this.$refs.clearRef)
      console.log(value)
      console.log(this.goodsInfo)
    }
  },
  mounted () {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    }, 1500)
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  computed: {},
  watch: {},
  filters: {},
  components: { Editor, Toolbar }
}
</script>

<style scoped lang="less">
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  margin-top: 20px;
}

.el-steps {
  margin: 10px 0;
}
</style>
