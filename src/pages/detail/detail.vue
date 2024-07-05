<template>
  <view class="container">
    <view class="header">
      <view class="back-icon"></view>
      <view class="title">{{ air.designation }}</view>
      <view class="menu-icon"></view>
    </view>
    <view class="temperature-section" :style="{color:currentMode.color,opacity:powerStyle.opacity}">
      <view class="temperature-display">
        <text class="temperature">{{ air.set_temperature }}</text>
        <view class="degree-and-mode">
          <text class="degree-symbol">℃</text>
          <view class="mode">
            <img style="width: 28rpx;height: 28rpx;" class="mode-icon" :src="currentMode.icon" alt="">
            <text>{{ currentMode.text }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="status-section" :style="{opacity:powerStyle.opacity}">
      <view class="status-item"><img style="width: 22rpx;height: 22rpx;margin-right: 6rpx;" :src="currentWindSpeed.icon" alt="">风速 {{ currentWindSpeed.text }}</view>
      <view class="status-item"><img style="width: 22rpx;height: 22rpx;margin-right: 6rpx;" :src="currentWindDirection.icon" alt="">风向 {{ currentWindDirection.text }}</view>
      <view class="status-item"><img style="width: 22rpx;height: 22rpx;margin-right: 6rpx;" :src="currentWindMode.icon" alt="">风模式 {{ currentWindMode.text }}</view>
    </view>
    <view class="control-section">
      <view class="control-row">
        <view v-if="powerDisabled === false" class="control-item power" hover-class="bg-click" hover-stay-time="50" @tap="changePower" @click="changePower">
          <img class="power-icon" src="../../static/power_btn.png" alt="">
        </view>
        <view v-else class="control-item power bg-click" >
          <img class="power-icon" src="../../static/power_btn.png" alt="">
        </view>

        <view class="control-item" hover-class="bg-click" hover-stay-time="50" @tap="changeMode" @click="changeMode">模式</view>
      </view>
      <view class="control-row">
        <view class="control-item" hover-class="bg-click" hover-stay-time="50" @tap="changeWindSpeed" @click="changeWindSpeed">风速</view>
        <view class="control-item" hover-class="bg-click" hover-stay-time="50" @tap="changeWindDirection" @click="changeWindDirection">风向</view>
        <view class="control-item" hover-class="bg-click" hover-stay-time="50" @tap="changeWindMode" @click="changeWindMode">扫风</view>
      </view>
      <view class="control-row">
        <view class="control-item minus-icon" hover-class="bg-click" hover-stay-time="50" @tap="decreaseTemperature" @click="decreaseTemperature">-</view>
        <view class="control-item adjust-icon">温度</view>
        <view class="control-item plus-icon" hover-class="bg-click" hover-stay-time="50" @tap="increaseTemperature" @click="increaseTemperature">+</view>
      </view>
      <view v-if="air.electrify_state === null || air.electrify_state === ''" class="control-row">
        <view class="control-item btn-disabled">定时</view>
        <view class="control-item btn-disabled">睡眠</view>
        <view class="control-item btn-disabled">...</view>
      </view>
      <view v-else class="control-row">
        <view v-if="isElectricDisabled === false" class="control-item" hover-class="bg-click" hover-stay-time="50" @tap="changeElectric" @click="changeElectric">断电</view>
        <view v-else class="control-item btn-disabled">断电</view>
        <view v-if="isElectricDisabled === true" class="control-item" hover-class="bg-click" hover-stay-time="50"  @tap="changeElectric" @click="changeElectric">通电</view>
        <view v-else class="control-item btn-disabled">通电</view>
        <view class="control-item btn-disabled">...</view>
      </view>
      <view class="send-command">
        <button class="send-button">发送指令</button>
      </view>
    </view>
  </view>
</template>


<script setup>
import {ref, watch, watchEffect} from 'vue'
import {http} from '../../utils/http'
import {onLoad} from '@dcloudio/uni-app'
const air = ref({
        id: 1,
        client_id: 3,
        show_id: 235,
        designation: null,
        responsible_person: null,
        air_brand: "",
        online_state: "离线",
        electrify_state: null,
        power_state: "关机",
        operation_mode: "制冷",
        wind_speed: "中风",
        wind_mode: "扫风",
        set_temperature: 26,
        room_temperature: "25℃",
        voltage: null,
        electric_current: null,
        power: "2",
        electric_quantity: null,
        standby_mode: null,
        is_grouped: 0,
        clientname: "发改委南京项目溧水税务局"
})
// 改模式
const currentMode = ref({ text: air.value.wind_speed, icon: '', color: '' })
const modes = [
  { text: '制冷', icon: '../../static/cold_mode.png', color: '#409EFF' },
  { text: '制热', icon: '../../static/hot_mode.png', color: '#e11d48' },
  { text: '通风', icon: '../../static/wind_mode.png', color: '#000000' },
  { text: '除湿', icon: '../../static/nowater_mode.png', color: '#000000' }
]
const modeIndex = ref(0)
const changeMode = () => {
  modeIndex.value = (modeIndex.value + 1) % modes.length
  currentMode.value = modes[modeIndex.value]
  air.value.operation_mode = currentMode.value.text
  console.log(air.value.operation_mode)
}

// 改状态
const powerStyle = ref({opacity: 0})
const changePower = () => {
  if (powerStyle.value.opacity === 0){
      powerStyle.value.opacity = 1
      air.value.power_state = "开机"
    }
    else if (powerStyle.value.opacity === 1){
      powerStyle.value.opacity = 0
      air.value.power_state = "关机"
    }
}
const powerDisabled = ref( false)

// 设置温度
const increaseTemperature = () => {
  if (air.value.set_temperature < 30) {
    air.value.set_temperature += 1
  }
}
const decreaseTemperature = () => {
  if (air.value.set_temperature > 16) {
    air.value.set_temperature -= 1
  }
}

// 设置风速
// 改模式
const currentWindSpeed = ref({ text: '', icon: '../../static/wind_speed_auto.png'})
const windSpeeds = [
  { text: '自动', icon: '../../static/wind_speed_auto.png' },
  { text: '低风', icon: '../../static/wind_speed_low.png' },
  { text: '中风', icon: '../../static/wind_speed_mid.png'},
  { text: '高风', icon: '../../static/wind_speed_high.png' }
]
const windSpeedIndex = ref(0)
const changeWindSpeed = () => {
  windSpeedIndex.value = (windSpeedIndex.value + 1) % windSpeeds.length
  currentWindSpeed.value = windSpeeds[windSpeedIndex.value]
  air.value.wind_speed = currentWindSpeed.value.text
}

// 设置风向
const currentWindDirection = ref({ text: '上', icon: '../../static/wind_direction_up.png'})
const windDirections = [
  { text: '上', icon: '../../static/wind_direction_up.png' },
  { text: '中', icon: '../../static/wind_direction_mid.png' },
  { text: '下', icon: '../../static/wind_direction_down.png'}
]
const windDirectionIndex = ref(0)
const changeWindDirection = () => {
  windDirectionIndex.value = (windDirectionIndex.value + 1) % windDirections.length
  currentWindDirection.value = windDirections[windDirectionIndex.value]
}

// 设置风模式
const currentWindMode = ref({ text: '', icon: '../../static/wind_mode_swap.png'})
const windModes = [
  { text: '扫风', icon: '../../static/wind_mode_swap.png' },
  { text: '走风', icon: '../../static/wind_mode_walk.png' }
]
const windModeIndex = ref(0)
const changeWindMode = () => {
  windModeIndex.value = (windModeIndex.value + 1) % windModes.length
  currentWindMode.value = windModes[windModeIndex.value]
  air.value.wind_mode = currentWindMode.value.text
}

// 断通电
const isElectricDisabled = ref(false)
const changeElectric = () => {
  if (air.value.electrify_state === '通电')
    {
      air.value.electrify_state = '断电'
      powerStyle.value.opacity = 0
      air.value.power_state = "关机"
      powerDisabled.value = true
      isElectricDisabled.value = true
    }
  else if (air.value.electrify_state === '断电')
    {
      air.value.electrify_state = '通电'
      powerStyle.value.opacity = 1
      powerDisabled.value = false
      isElectricDisabled.value = false
    }
}

const query = defineProps({id:Number})
const getAirDetail = async () => {
  const res = await http({
    method: 'GET',
    url:'/api/dby/air/' + query.id,
  })
  air.value = res.data
  air.value.set_temperature = parseInt(air.value.set_temperature)

  // 设置初始模式
  if (air.value.operation_mode === '制冷')
    modeIndex.value = 0
  else if (air.value.operation_mode === '制热')
    modeIndex.value = 1
  else if (air.value.operation_mode === '通风')
    modeIndex.value = 2
  else if (air.value.operation_mode === '除湿')
    modeIndex.value = 3
  currentMode.value = modes[modeIndex.value]

  // 设置初始状态
  if (air.value.power_state === '开机')
    powerStyle.value.opacity = 1
  else
    powerStyle.value.opacity = 0

  // 设置初始风速
  if (air.value.wind_speed === '中风')
    windSpeedIndex.value = 2
  else if (air.value.wind_speed === '低风')
    windSpeedIndex.value = 1
  else if (air.value.wind_speed === '高风')
    windSpeedIndex.value = 3
  else if (air.value.wind_speed === '自动')
    windSpeedIndex.value = 0
  currentWindSpeed.value = windSpeeds[windSpeedIndex.value]

  // 设置初始风模式
  if (air.value.wind_mode === '扫风')
    windModeIndex.value = 0
  else if (air.value.wind_mode === '走风')
    windModeIndex.value = 1
  currentWindMode.value = windModes[windModeIndex.value]

  // 设置初始通电状态
  if (air.value.electrify_state === '断电'){
    isElectricDisabled.value = true
    powerDisabled.value = true
  }
}



onLoad(() => {
  getAirDetail()
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 0;
  background-color: #EEEEEE;
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
  background-color: #EEEEEE; /* Placeholder for icons */
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
  font-weight: normal;
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  color: #000000;
}

.control-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff; /* White background for control section */
  flex-grow: 1;
  padding-bottom: 16rpx; /* Add padding to bottom */
  box-sizing: border-box;
  border-top: 1rpx solid #EEEEEE; /* Add a border to separate from the above section */
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
  background: #F7F7F7;
}
</style>
