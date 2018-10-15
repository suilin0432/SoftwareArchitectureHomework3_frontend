<template>
  <div>
    <el-table
      :data="items"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleList"
        label="角色"
        width="180">
      </el-table-column>
      <el-table-column
        label="修改">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row ,deletefunction, items)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'PersonList',
  data () {
    return {
      index: -1,
      row: ''
    }
  },
  methods: {
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
            } else if (e.response.data.code == 10112) {
              this.$message({
                message: '不能删除自己',
                type: 'error',
                showClose: true
              })
            } else if (e.response.data.code == 10113) {
              this.$message({
                message: '不能删除管理员',
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
    }
  },
  computed: {
  },
  created () {
  },
  props: ['items', 'deletefunction']
}
</script>
