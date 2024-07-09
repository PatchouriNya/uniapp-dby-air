<template>
  <view class="login-container">
    <image class="logo" src="/static/logo.png" mode="widthFix"></image>
    <view class="form-container">
      <uni-title type="h3" align="center" title="空调集控系统"></uni-title>
      <uni-easyinput
          class="login-input"
          v-model="username"
          placeholder="请输入用户名"
          clearable
      ></uni-easyinput>
      <uni-easyinput
          class="login-input"
          v-model="password"
          placeholder="请输入密码"
          type="password"
          clearable
      ></uni-easyinput>
      <button class="login-btn" type="primary" @click="login">登录</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue"
import {http} from '../../utils/http'
import {useMemberStore} from '../../stores'
const memberStore = useMemberStore()
const username = ref("")
const password = ref("")

const login = async () => {
  const res = await http({
    method: 'POST',
    url:'/api/dby/login',
    data: {
      username: username.value,
      password: password.value
    }
  })
  if (res.code === 200 || res.code === 999) {
    // 处理登录逻辑
    uni.showToast({
      title: res.msg,
      icon: "success",
    })
    memberStore.setProfile({id:res.data.id,username: username.value})
    uni.switchTab({url: '/pages/my/my'})
  } else {
    uni.showToast({
      title: '账号或密码错误',
      icon: "error",
    })
  }
};
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #6ec1e4, #6ec1e4 50%, #409eff 50%);
  padding: 20rpx;
}

.logo {
  width: 150rpx;
  margin-bottom: 50rpx;
}

.form-container {
  width: 80%;
  background-color: #fff;
  padding: 40rpx 20rpx;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.login-input {
  display: block;
  margin-bottom: 20rpx;
  border-radius: 5rpx;
}

.login-btn {
  width: 100%;
  background-color: #409EFF;
  color: #fff;
  border: none;
  border-radius: 5rpx;
  padding: 20rpx;
  font-size: 22rpx;
  margin-top: 20rpx; /* 增加按钮与输入框之间的间距 */
}
</style>
