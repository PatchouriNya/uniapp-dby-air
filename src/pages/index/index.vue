<template>
  <view class="container">
    <view class="header">
      <view class="back-icon"></view>
      <view class="title">卧室的美的空调</view>
      <view class="menu-icon"></view>
    </view>
    <view class="temperature-section">
      <view class="temperature-display">
        <text class="temperature">24</text>
        <view class="degree-and-mode">
          <text class="degree-symbol">℃</text>
          <view class="mode">
            <img class="mode-icon" src="../../static/cold_mode.png" alt="">
            <text>制冷</text>
          </view>
        </view>
      </view>
    </view>
    <view class="status-section">
      <view class="status-item">AUTO 风速 自动</view>
      <view class="status-item">风向 下</view>
      <view class="status-item">手动风向</view>
    </view>
    <view class="control-section">
      <view class="control-row">
        <view class="control-item power" hover-class="bg-click" hover-stay-time="50">
          <img class="power-icon" src="../../static/power_btn.png" alt="">
        </view>
        <view class="control-item" hover-class="bg-click" hover-stay-time="50">模式</view>
      </view>
      <view class="control-row">
        <view class="control-item" hover-class="bg-click" hover-stay-time="50">风速</view>
        <view class="control-item" hover-class="bg-click" hover-stay-time="50">风向</view>
        <view class="control-item" hover-class="bg-click" hover-stay-time="50">扫风</view>
      </view>
      <view class="control-row">
        <view class="control-item minus-icon" hover-class="bg-click" hover-stay-time="50">-</view>
        <view class="control-item adjust-icon">温度</view>
        <view class="control-item plus-icon" hover-class="bg-click" hover-stay-time="50">+</view>
      </view>
      <view class="control-row">
        <view class="control-item btn-disabled">定时</view>
        <view class="control-item btn-disabled">睡眠</view>
        <view class="control-item btn-disabled">...</view>
      </view>
      <view class="send-command">
        <button class="send-button">发送指令</button>
      </view>
    </view>
  </view>
</template>


<script setup>

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 0;
  background-color: #f5f5f5;
  height: 100vh;
  box-sizing: border-box;
}

.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 8rpx 0;
}

.back-icon, .menu-icon {
  width: 48rpx;
  height: 48rpx;
  background-color: #f5f5f5; /* Placeholder for icons */
}

.title {
  font-size: 36rpx;
  font-weight: bold;
}

.temperature-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32rpx 0;
}

.temperature-display {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.temperature {
  font-size: 192rpx;
  font-weight: bold;
}

.degree-and-mode {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 16rpx; /* Adjust the margin as needed */
}

.degree-symbol {
  font-size: 72rpx;
}

.mode {
  display: flex;
  align-items: center;
  margin-top: 8rpx;
}

.mode-icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 8rpx;
}

.status-section {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 32rpx 0;
}

.status-item {
  font-size: 28rpx;
  color: #999;
}

.control-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff; /* White background for control section */
  flex-grow: 1;
  padding-bottom: 16rpx; /* Add padding to bottom */
  box-sizing: border-box;
  border-top: 1rpx solid #f5f5f5; /* Add a border to separate from the above section */
  overflow: hidden;
}

.control-row {
  display: flex;
  justify-content: space-around;
  height: 172rpx;
  align-items: center;
  border-bottom: 1rpx solid #F1F1F1; /* Add bottom border to create lines between rows */
}

.control-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fff;
  font-size: 28rpx;
  color: #333;
  flex: 1;
  border-right: 1rpx solid #F1F1F1; /* Add right border */
  overflow: hidden; /* Hide the scrollbar */
}

.control-item:last-child {
  border-right: none; /* Remove right border for the last item in the row */
}

.control-item.power {
  color: #fff;
}

.control-item.clicked {
  background-color: #4cd964;
}

.power-icon {
  width: 32rpx;
  height: 32rpx;
}

.adjust-icon {
  border-right: none;
}

.minus-icon {
  font-size: 42rpx;
  background-color: white; /* Placeholder for minus icon */
  border-right: none;
}

.plus-icon {
  font-size: 42rpx;
  background-color: white; /* Placeholder for plus icon */
  border-left: none;
}

.send-command {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120rpx;
  background-color: #fff;
  margin-top: 16rpx;
}

.send-button {
  width: 90%;
  height: 70%;
  background-color: #409EFF; /* Blue color for button */
  color: #fff;
  font-size: 32rpx;
  font-weight: bold;
  border-radius: 12rpx;
  border: none;
}
.send-button:active {
  background-color: #66B1FF; /* 按钮点击时变浅的颜色 */
}
.btn-disabled {
  color: #999;
}
.bg-click {
  background: #fafafa;
}
</style>
