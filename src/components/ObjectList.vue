<template>
<div>
  <el-table
    :data="items"
    style="width: 60%; margin: 0 auto">
    <el-table-column
      prop="name"
      label="名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格"
      width="180">
    </el-table-column>
    <el-table-column
      prop="description"
      width="180"
      label="描述">
    </el-table-column>
    <el-table-column
      width="180"
      label="修改">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="Edit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row ,deletefunction, items)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div>
    <br>
    <br>
    <el-form ref="form" :inline="true" :model="form" class="demo-form-inline" label-width="80px">
      <el-form-item label="name">
        <el-input v-model="form.name" placeholder="请输入名字"></el-input>
      </el-form-item>
      <el-form-item label="price">
        <el-input v-model="form.price" placeholder="请输入价钱"></el-input>
      </el-form-item>
      <el-form-item label="description">
        <el-input v-model="form.description" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
        size="mini"
        type="success"
        @click="handleInsert(insert, items)">插入</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="名称" >
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格" >
        <el-input v-model="form.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" >
        <el-input v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEdit(update, items)">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
export default {
  name: 'ObjectList',
  data () {
    return {
      form: {
        id: '',
        name: '',
        price: 0,
        description: ''
      },
      dialogFormVisible: false,
      index: -1,
      row: ''
    }
  },
  methods: {
    Edit (index, row) {
      console.log(index, row)
      this.dialogFormVisible = true
      this.index = index
      this.row = row
      this.form.id = row.id
      this.form.name = row.name
      this.form.price = row.price
      this.form.description = row.description
    },
    handleEdit (update, items) {
      update(this.form)
        .then(
          res => {
            items[items.indexOf(this.row)].name = res.data.name
            items[items.indexOf(this.row)].price = res.data.price
            items[items.indexOf(this.row)].description = res.data.description
            this.$message({
              message: '修改成功',
              type: 'success',
              showClose: true
            })
          }
        )
        .catch(
          e => {
            if (e.response.data.code == 102) {
              this.$message({
                message: '没有修改权限',
                type: 'error',
                showClose: true
              })
            } else {
              this.$message({
                message: '修改失败',
                type: 'error',
                showClose: true
              })
            }
          }
        )
      this.dialogFormVisible = false
    },
    handleDelete (index, row, deletefunction, items) {
      deletefunction(row.id)
        .then(() => {
          items.splice(items.indexOf(row), 1)
          this.$message({
            message: '删除成功',
            type: 'success',
            showClose: true
          })
        }
        )
        .catch(
          e => {
            if (e.response.data.code == 102) {
              this.$message({
                message: '没有删除权限',
                type: 'error',
                showClose: true
              })
            } else {
              this.$message({
                message: '已经被删除了或其他错误',
                type: 'error',
                showClose: true
              })
            }
          }
        )
    },
    handleInsert (insert, items) {
      insert(this.form)
        .then(
          res => {
            items = items.push(res.data)
            this.form.description = ''
            this.form.name = ''
            this.form.price = 0
            this.$message({
              message: '添加成功',
              type: 'success',
              showClose: true
            })
          }
        )
        .catch(
          e => {
            if (e.response.data.code == 102) {
              this.$message({
                message: '没有添加权限',
                type: 'error',
                showClose: true
              })
            } else {
              this.$message({
                message: 'name重复',
                type: 'error',
                showClose: true
              })
            }
          }
        )
    }
  },
  computed: {
  },
  created () {
  },
  props: ['items', 'deletefunction', 'update', 'insert']
}
</script>
