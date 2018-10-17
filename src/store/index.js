import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态

const state = {
  // 默认数据
  isLogged: false,
  userInfo: {'username': 'test', 'id': ''},
  userOnline: 0
}

const store = new Vuex.Store({
  state,
  mutations: {
  }
})

export default store
