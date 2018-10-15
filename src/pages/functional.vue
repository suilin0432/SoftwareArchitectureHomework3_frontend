<template>
  <div class="function" v-if="this.$store.state.isLogged">
    <el-menu :default-active="this.activeIndex" mode="vertical">
      <el-menu-item index="car" @click="setCarActive">
        汽车
      </el-menu-item>
      <el-menu-item index="commodity" @click="setCommodityActive">
        货物
      </el-menu-item>
      <el-menu-item index="user" @click="setUserActive">
        用户
      </el-menu-item>
    </el-menu>
    <div v-if="carActive">
      <ObjectList v-if="carAuth" v-bind:items="carList" :update="request_car_update" :insert="request_car_insert" :deletefunction="request_car_delete"></ObjectList>
      <div v-if="!carAuth">对不起你没有Car的浏览权限</div>
    </div>
    <div v-if="commodityActive">
      <ObjectList v-if="commodityAuth" v-bind:items="commodityList" :update="request_commodity_update" :insert="request_commodity_insert" :deletefunction="request_commodity_delete"></ObjectList>
      <div v-if="!commodityAuth">对不起你没有Commodity的浏览权限</div>
    </div>
    <div v-if="userActive">
      <PersonList v-if="userAuth" v-bind:items="userList" :deletefunction="request_user_delete"></PersonList>
      <div v-if="!userAuth">对不起你没有User的浏览权限</div>
    </div>
  </div>
</template>
<script>
import ObjectList from '../components/ObjectList'
import PersonList from '../components/PersonList'
import {request_car_find, request_car_update, request_car_delete, request_car_insert, request_commodity_find, request_commodity_update, request_commodity_delete, request_commodity_insert, request_user_find, request_user_delete} from '../httpRequests/api'
export default {
  name: 'functional',
  data () {
    return {
      carActive: true,
      commodityActive: false,
      userActive: false,
      carAuth: false,
      commodityAuth: false,
      userAuth: false,
      activeIndex: '1',
      carList: [],
      commodityList: [],
      userList: []
    }
  },
  methods: {
    setCarActive () {
      this.carActive = true
      this.commodityActive = false
      this.userActive = false
    },
    setCommodityActive () {
      this.carActive = false
      this.commodityActive = true
      this.userActive = false
    },
    setUserActive () {
      this.carActive = false
      this.commodityActive = false
      this.userActive = true
    },
    request_car_update: request_car_update,
    request_car_insert: request_car_insert,
    request_car_delete: request_car_delete,
    request_commodity_update: request_commodity_update,
    request_commodity_insert: request_commodity_insert,
    request_commodity_delete: request_commodity_delete,
    request_user_delete: request_user_delete
  },
  computed: {
  },
  created () {
  },
  beforeCreate () {
    request_car_find()
      .then(
        res => {
          this.carAuth = true
          this.carList = res.data
        }
      )
      .catch(
        e => {
          this.carAuth = false
        }
      )
    request_commodity_find()
      .then(
        res => {
          this.commodityAuth = true
          this.commodityList = res.data
        }
      )
      .catch(
        e => {
          this.commodityAuth = false
        }
      )
    request_user_find()
      .then(
        res => {
          this.userAuth = true
          this.userList = res.data
          console.log(this.userList)
        }
      )
      .catch(
        e => {
          this.userAuth = false
        }
      )
  },
  components: {
    ObjectList,
    PersonList
  }
}
</script>
