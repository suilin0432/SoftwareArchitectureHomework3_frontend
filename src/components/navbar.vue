<template>
  <div class="navbar">
    <el-menu :default-active="activeIndex" mode="horizontal">
      <el-menu-item index="home" @click="$router.push('/')">
        主页
      </el-menu-item>
      <el-menu-item v-if="!isLogged" index="activity" @click="$router.push('/login')">
        登陆
      </el-menu-item>
      <el-menu-item v-if="!isLogged" index="resource" @click="$router.push('/register')">
        注册
      </el-menu-item>
      <el-menu-item index="function" @click="$router.push('/function')">
        功能界面
      </el-menu-item>
      <el-menu-item v-if="isLogged" index="logout" @click="logout">
        登出
      </el-menu-item>
      <el-menu-item index="online">当前在线人数: {{this.$store.state.userOnline}} (5秒刷新一次)</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {request_logout, request_get_info, request_get_useronline} from '../httpRequests/api'
import {setCookie, getCookie, deleteCookie} from '../cookieOperation'
export default {
  name: 'navbar',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    logout () {
      console.log('logout')
      request_logout()
        .then(res => {
          deleteCookie('username')
          deleteCookie('userId')
          this.$message({
            message: '注销成功',
            type: 'success',
            showClose: true
          })
          this.$store.state.isLogged = false
          this.$router.push('/')
        }).catch(e => {
          console.log('error! login.vue', e.response.data)
        })
    }
  },
  computed: {
    isLogged () {
      return this.$store.state.isLogged
    }
  },
  created () {
  },
  mounted () {
    request_get_info()
      .then(
        res => {
          this.$store.state.isLogged = true
          this.$store.state.userInfo.username = res.data.username
          this.$store.state.userInfo.id = res.data.id
        }
      )
      .catch()
    request_get_useronline()
      .then(
        res => {
          this.$store.state.userOnline = res.data
        }
      ).catch()
    var this_ = this
    setInterval(function () {
      request_get_useronline()
        .then(
          res => {
            this_.$store.state.userOnline = res.data
          }
        )
    }, 5000)
  }
}
</script>
