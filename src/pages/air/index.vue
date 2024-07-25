<template>
  <view class="content">
    <view class="title">{{ title }}</view> <!-- 添加的标题视图 -->
    <view v-if="!isSelected" class="no-data">
      <button class="center-button btn" @tap="gotoChoose" @click="gotoChoose">选择单位</button>
    </view>
    <view class="card" v-if="isSelected" v-for="(airConditioner) in airConditioners" :key="airConditioner.id" @tap="gotoDetail(airConditioner.id)" @click="gotoDetail(airConditioner.id)">
      <image v-if="regex1.test(airConditioner.air_brand)" class="icon" src="/static/guaji.png"></image>
      <image v-else class="icon" src="/static/guiji.png"></image>
      <text class="name">{{ airConditioner.designation }}</text>
      <text class="brand">{{ airConditioner.air_brand }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { http } from '../../utils/http'
import { useClientStore } from '../../stores/modules/client'
import { onShow } from '@dcloudio/uni-app'

const clientStore = useClientStore()
const airConditioners = ref()
const regex1 = /挂机/
const title = ref('请选择一个实际单位')
const isSelected = ref(false)
const getAirData = async () => {
  const res = await http({
    method: 'GET',
    url: '/api/dby/airs/' + clientStore.client.id + '?size=99999',
  })

  if (res.code === 200)
    airConditioners.value = res.data.data
}

onShow(() => {
  if (clientStore.client){
    title.value = clientStore.client.name
    isSelected.value = true
    getAirData()
  }else{
    isSelected.value = false
    title.value = '请选择一个实际单位'
  }

})
const gotoChoose = () => {
  uni.switchTab({
    url: '/pages/company/company'
  })
}

const gotoDetail = (id) => {
  uni.navigateTo({
    url: '/pages/detail/detail?id=' + id
  })
}
</script>

<style scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20rpx;
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

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-basis: 43%;
  max-width: 100%;
  background-color: #fff;
  margin-bottom: 20rpx;
  padding: 20rpx;
  border-radius: 10rpx;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon {
  width: 64rpx;
  height: 64rpx;
  margin-bottom: 10rpx;
}

.name {
  font-size: 24rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 5rpx;
}

.brand {
  font-size: 28rpx;
  color: #888;
}
.btn {
  background-color: #409EFF; /* Blue color for button */
  color: #fff;
  font-size: 32rpx;
  border-radius: 12rpx;
  border: none;
}
.btn:active {
  background-color: #66B1FF; /* 按钮点击时变浅的颜色 */
}
</style>
