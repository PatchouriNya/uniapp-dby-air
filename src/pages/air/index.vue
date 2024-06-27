<template>
  <view class="content">
    <view class="card" v-for="(airConditioner, index) in airConditioners" :key="index">
      <image class="icon" :src="airConditioner.icon"></image>
      <text class="name">{{ airConditioner.name }}</text>
      <text class="brand">{{ airConditioner.brand }}</text>
    </view>
  </view>
</template>



<script>
  export default {
    data() {
      return {
        airConditioners: [
          {
            icon: '../../static/ac1.png',
            name: '空调1',
            brand: '品牌A'
          },
          {
            icon: '../../static/ac2.png',
            name: '空调2',
            brand: '品牌B'
          },
          {
            icon: '../../static/ac3.png',
            name: '空调3',
            brand: '品牌C'
          },
          {
            icon: '../../static/ac4.png',
            name: '空调4',
            brand: '品牌D'
          },
          {
            icon: '../../static/ac4.png',
            name: '空调4',
            brand: '品牌D'
          },
          {
            icon: '../../static/ac4.png',
            name: '空调4',
            brand: '品牌D'
          },
          {
            icon: '../../static/ac4.png',
            name: '空调4',
            brand: '品牌D'
          },
          {
            icon: '../../static/ac4.png',
            name: '空调4',
            brand: '品牌D'
          },
          {
            icon: '../../static/ac4.png',
            name: '空调4',
            brand: '品牌D'
          },
          {
            icon: '../../static/ac4.png',
            name: '空调4',
            brand: '品牌D'
          },
          {
            icon: '../../static/ac4.png',
            name: '空调4',
            brand: '品牌D'
          },
          {
            icon: '../../static/ac4.png',
            name: '空调4',
            brand: '品牌D'
          },
          {
            icon: '../../static/ac4.png',
            name: '空调4',
            brand: '品牌D'
          },
          {
            icon: '../../static/ac4.png',
            name: '空调4',
            brand: '品牌D'
          }
        ]
      }
    }
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
    width: 100rpx;
    height: 100rpx;
    margin-bottom: 10rpx;
  }

  .name {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 5rpx;
  }

  .brand {
    font-size: 28rpx;
    color: #888;
  }
</style>
