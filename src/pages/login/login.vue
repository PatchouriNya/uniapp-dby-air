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
      title: res.msg,
      icon: "none",
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
  background-color: #f5f5f5;
}

.logo {
  width: 150rpx;
  margin-bottom: 50rpx;
}

.form-container {
  width: 80%;
}

.login-input {
  margin-bottom: 17rpx;
}
.login-btn {
  width: 100%;
}
</style>
