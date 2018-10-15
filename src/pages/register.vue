<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="form.confirm" type="password" placeholder="请再次输入密码"></el-input>
    </el-form-item>
    <el-form-item label="身份码">
      <el-input v-model="form.managementCode" placeholder="请输入身份码决定身份"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="RegisterRequest">提交</el-button>
      <el-button type="success" @click="LoginRedirect">登陆</el-button>
      <el-button @click="FormClear">取消</el-button>
    </el-form-item>
  </el-form>

</template>
<script>
import {request_register} from '../httpRequests/api'
export default {
  name: 'register',
  data () {
    return {
      form: {
        username: '',
        password: '',
        confirm: '',
        managementCode: ''
      }
    }
  },
  methods: {
    LoginRedirect () {
      this.$router.push('/login')
    },
    RegisterRequest () {
      console.log('redirect!')
      request_register(this.form)
        .then(res => {
          console.log(res.data)
          this.$store.state.isLogged = true
          this.$store.state.userInfo.username = res.data.username
          this.$store.state.userInfo.id = res.data.id
          this.$router.push('/function')
        })
        .catch(e => {
          // send fail message
          this.$message({
            message: '注册失败',
            type: 'error',
            showClose: true
          })
          console.log('error! register.vue', e.response.data)
        })
    },
    FormClear () {
      console.log('clean!')
      this.form.username = ''
      this.form.password = ''
    }
  },
  created () {
    console.log('register Page!')
  }
}
</script>
