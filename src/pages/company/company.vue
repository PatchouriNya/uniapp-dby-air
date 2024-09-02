<template>
  <view class="container">
    <view >
      <view class="title">{{ title }}</view>
    </view> <!-- 添加的标题视图 -->
    <view v-if="!isLogin" class="no-data">
      <button class="center-button btn" @tap="gotoLogin" @click="gotoLogin">登录</button>
    </view>
    <mosowe-tree
        v-if="isLogin"
        ref="mosoweTreeRef"
        v-model="checkValues"
        :data="treeList"
        label="clientname"
        value="id"
        height="85vh"
        children="childs"
        :default-expanded-keys="defaultExpandedKeys"
        :check-on-click-node="true"
        @nodeClick="nodeClick"></mosowe-tree>
    <button v-if="isLogin" class="btn2" @click="logout">切换用户</button>

  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { http } from '../../utils/http'
import {useClientStore} from '../../stores/modules/client'
import {useMemberStore} from '../../stores'

import {onShow} from "@dcloudio/uni-app";
const clientStore = useClientStore()
const memberStore = useMemberStore()
const isLogin = ref(false)
const title = ref('请登录后查看')
const treeList = ref([])
const defaultExpandedKeys = ref([])
const getTreeList = async () => {
  const res = await http({
    method: 'GET',
    url: '/api/dby/client/list/' + memberStore.profile.id
  })
  if (res.code === 200) {
    treeList.value = [res.data]
    defaultExpandedKeys.value.push(res.data.id)
  }else {
    await uni.showToast({
      title: '获取数据失败',
      icon: 'error',
      duration: 2000
    })
  }
}
onShow(()=>{
  if (memberStore.profile.id){
    isLogin.value = true
    title.value = '欢迎，' + memberStore.profile.nickname
    getTreeList()
  }
})
const mosoweTreeRef = ref<any>(null)
const gotoLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login'
  })
}
const logout = () => {
  isLogin.value = false
  title.value = '请登录后查看'
  defaultExpandedKeys.value = []
  treeList.value = []
  memberStore.clearProfile()
  clientStore.clearClient()
  uni.navigateTo({
    url: '/pages/login/login'
  })
}
// 获取半选
const getHalf = () => {
  // console.log(mosoweTreeRef.value.getHalfCheck())
}

// 获取已选节点的数据
const getCheckedNodes = () => {
  // console.log(mosoweTreeRef.value.getCheckedNodes())
}

// 设置节点已选
const setCheckedKeys = () => {
  mosoweTreeRef.value.setCheckedKeys(['64589cd409e29891989bc316', '64589cd409e29891989bc31e'])
}

// 设置节点未选
const setCheckedKeysNone = () => {
  mosoweTreeRef.value.setCheckedKeys(['64589cd409e29891989bc316', '64589cd409e29891989bc31e'], false)
}

// 节点点击
const nodeClick = async (item: any) => {
  if (item.type === 1) {
    // 显示模态框
    uni.showModal({
      title: '确认操作',
      content: '确定要读取数据吗？',
      confirmText: '是',  // 修改确认按钮的名称
      cancelText: '否',   // 修改取消按钮的名称
      success: async (res) => {
        if (res.confirm) {
          // 用户点击确定，执行原有逻辑
          clientStore.setClient({id: item.id, name: item.clientname})
          defaultExpandedKeys.value.push(item.id)
          uni.showLoading({
            title: '读取数据中...'
          })
          const res = await http({
            method: 'GET',
            url: 'http://47.103.60.199:1110/api/dby/air-latest/' + item.id
          })
          uni.hideLoading()
          uni.switchTab({
            url: '/pages/air/index'
          })
          await uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        } else if (res.cancel) {
          clientStore.setClient({id: item.id, name: item.clientname})
          defaultExpandedKeys.value.push(item.id)
          uni.switchTab({
            url: '/pages/air/index'
          })
        }
      }
    })
  }
}

// filter筛选
const searchKey = ref('')
const search = () => {
  mosoweTreeRef.value.filter(searchKey.value)
}

const checkValues = ref([])
watch(
    () => checkValues.value,
    () => {
      // console.log(checkValues.value)
    },
    {
      deep: true
    }
)

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10rpx;
  box-sizing: border-box;
}

.title {
  width: 100%;
  text-align: center;
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.no-data {
  width: 100%;
  display: flex;
  justify-content: center;
}

.center-button {
  font-size: 28rpx;
  padding: 10rpx 20rpx;
  background-color: #007AFF;
  color: #fff;
  border: none;
  border-radius: 5rpx;
}

.btn {
  background-color: #409EFF; /* Blue color for button */
  color: #fff;
  font-size: 28rpx;
  border-radius: 12rpx;
  border: none;
  width: 70%;
}
.btn:active {
  background-color: #66B1FF; /* 按钮点击时变浅的颜色 */
}
.btn2 {
  background-color: #e11d48;
  color: #fff;
  font-size: 28rpx;
  border-radius: 12rpx;
  border: none;
  width: 70%;
}
.btn2:active {
  background-color: #f87171; /* 按钮点击时变浅的颜色 */
}
</style>
