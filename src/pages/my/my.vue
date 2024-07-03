<template>
  <view>
    <view class="container">
      <view class="content">
        <view v-if="isLoggedIn">
          <uni-list>
            <uni-list-item title="个人信息" show-arrow></uni-list-item>
            <uni-list-item title="订单管理" show-arrow></uni-list-item>
            <uni-list-item title="设置" show-arrow></uni-list-item>
            <uni-list-item title="帮助与反馈" show-arrow></uni-list-item>
            <uni-list-item title="关于我们" show-arrow></uni-list-item>
            <uni-list-item title="退出登录" show-arrow @tap="logout"></uni-list-item>
          </uni-list>
        </view>
        <view v-else>
          <view class="login-prompt">
            <text>您还未登录，请先登录。</text>
            <button type="primary" @click="haha">登录</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref} from 'vue'
import {onShow} from '@dcloudio/uni-app'
import {useMemberStore} from '../../stores'
const memberStore = useMemberStore()
const isLoggedIn = ref()
const haha = () => {
  uni.navigateTo({url: '/pages/login/login'})
}
const logout = () => {
  memberStore.clearProfile()
  uni.navigateTo({url: '/pages/login/login'})
  uni.showToast({title: '退出登录成功', icon: 'none'})
}
onShow(() => {
  isLoggedIn.value = !!memberStore.profile;
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.header {
  background-color: #007aff;
  padding: 20rpx 0;
  text-align: center;
}

.title {
  font-size: 36rpx;
  color: white;
  font-weight: bold;
}

.content {
  flex: 1;
  padding: 20rpx;
  background-color: white;
}

uni-list {
  margin-top: 20rpx;
}

.login-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.login-prompt text {
  font-size: 28rpx;
  margin-bottom: 20rpx;
}
</style>
