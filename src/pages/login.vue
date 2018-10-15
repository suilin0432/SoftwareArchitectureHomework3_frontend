<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="LoginRequest">提交</el-button>
      <el-button type="success" @click="RegisterRedirect">注册</el-button>
      <el-button @click="FormClear">取消</el-button>
    </el-form-item>
  </el-form>

</template>
<script>
import {request_login} from '../httpRequests/api'
import {setCookie, getCookie, deleteCookie} from '../cookieOperation'

export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    LoginRequest () {
      console.log(this.form)
      request_login(this.form)
        .then(res => {
          console.log(res.data)
          this.$store.state.isLogged = true
          this.$store.state.userInfo.username = res.data.username
          this.$store.state.userInfo.id = res.data.id
          setCookie('username', res.data.username, 60)
          setCookie('userId', res.data.id, 60)
          this.$message({
            message: '登陆成功',
            type: 'success',
            showClose: true
          })
          this.$router.push('/function')
        }).catch(
          e => {
            // send fail message
            this.$message({
              message: '登陆失败',
              type: 'error',
              showClose: true
            })
            console.log('error! login.vue', e.response.data)
          }
        )
    },
    RegisterRedirect () {
      this.$router.push('/register')
    },
    FormClear () {
      this.form.username = ''
      this.form.password = ''
    }
  },
  created () {
    console.log('login Page!')
  }
}
</script>
