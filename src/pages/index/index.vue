<template>
  <view class="container">
    <view class="full-card">
      <text class="title">东佰源空调集控系统</text>
    </view>
    <view class="company-card">
      <text class="company-info">{{ info }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import {http} from '../../utils/http'
const info = ref('')
const getData = async () => {
  const res = await http({
    method: 'GET',
    url: '/api/dby/system/client'
  })
  info.value = res.data.info
}
getData()
</script>

<style scoped>
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  height: 100vh;
}

.full-card {
  height: 40%;
  width: 100%;
  flex: 1;
  margin-bottom: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  border-radius: 10rpx;
}

.title {
  text-align: center;
  font-size: 70rpx;
  font-weight: bold;
}

.company-card {
  height: 55%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  border-radius: 10rpx;
}

.company-info {
  font-size: 28rpx;
  white-space: pre-line;
}
</style>
