<template>
  <view class="content">
    <view class="card" v-for="(airConditioner) in airConditioners" :key="airConditioner.id" @tap="gotoDetail(airConditioner.id)" @click="gotoDetail(airConditioner.id)">
      <image v-if="regex1.test(airConditioner.air_brand)" class="icon" src="/static/guaji.png"></image>
      <image v-else class="icon" src="/static/guiji.png"></image>
      <text class="name">{{ airConditioner.designation }}</text>
      <text class="brand">{{ airConditioner.air_brand }}</text>
    </view>
  </view>
</template>



<script setup>
import { ref } from 'vue'
import {http} from '../../utils/http'

const airConditioners = ref()
const regex1 = /挂机/
const getAirData = async ()=>{
  const res = await http({
    method: 'GET',
    url:'/api/dby/airs/1?size=99999',
  })

  if (res.code === 200)
    airConditioners.value = res.data.data

}
getAirData()

const gotoDetail = (id) => {
  uni.navigateTo({
    url:'/pages/detail/detail?id=' + id
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
</style>
