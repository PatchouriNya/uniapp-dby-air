<template>
  <view class="content">
    <view class="logo-area">
      <image class="logo" src="/static/logo.png"></image>
    </view>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <view class="form-area">
      <input class="input" type="text" placeholder="请输入用户名" />
      <input class="input" type="password" placeholder="请输入密码" />
      <button class="login-button" bindtap="onLogin">登录</button>
      <button class="login-button" @click="gogo">走</button>

    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
const title = ref('欢迎登录')
const onLogin = () => {
  console.log('登录成功')
}
const gogo = () => {
  // 跳转到air页面
  uni.navigateTo({ url: '/pages/air/index' }
  )
}
onLogin()
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: lightskyblue;
  background-size: cover;
}

.logo-area {
  margin-top: -300rpx;
  margin-bottom: 50rpx;
}

.logo {
  height: 200rpx;
  width: 200rpx;
}

.text-area {
  margin-bottom: 50rpx;
}

.title {
  font-size: 36rpx;
  color: #ffffff;
}

.form-area {
  display: flex;
  flex-direction: column;
  width: 80%;
}

.input {
  margin-bottom: 20rpx;
  padding: 20rpx;
  border: 1px solid #ddd;
  border-radius: 10rpx;
  font-size: 30rpx;
}

.login-button {
  margin-top: 30rpx;
  padding: 20rpx;
  background-color: #4CAF50;
  color: #fff;
  font-size: 36rpx;
  text-align: center;
  border-radius: 10rpx;
}
</style>