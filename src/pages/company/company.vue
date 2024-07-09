<template>
  <view class="container">
    <mosowe-tree
        ref="mosoweTreeRef"
        v-model="checkValues"
        :data="treeList"
        label="clientname"
        value="id"
        height="100vh"
        children="childs"
        :default-expanded-keys="[10]"
        :check-on-click-node="true"
        @nodeClick="nodeClick"></mosowe-tree>
    <view class="buttons">
      <mosowe-button @click="getHalf">获取半选</mosowe-button>
      <mosowe-button @click="getCheckedNodes">获取已选节点数据</mosowe-button>
      <mosowe-button @click="setCheckedKeys">设置节点已选</mosowe-button>
      <mosowe-button @click="setCheckedKeysNone">设置节点未选</mosowe-button>
    </view>
    <view class="search">
      <mosowe-text>搜索：</mosowe-text>
      <input class="input" placeholder="请输入" v-model="searchKey" />
      <mosowe-button @click="search">搜索</mosowe-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { http } from '../../utils/http'
const treeList = ref([])

const getTreeList = async () => {
  const res = await http({
    method: 'GET',
    url: '/api/dby/client/list/11'
  })
  treeList.value.push(res.data)
  console.log(res.data)
}
getTreeList()
const mosoweTreeRef = ref<any>(null)

// 获取半选
const getHalf = () => {
  console.log(mosoweTreeRef.value.getHalfCheck())
}

// 获取已选节点的数据
const getCheckedNodes = () => {
  console.log(mosoweTreeRef.value.getCheckedNodes())
}

// 设置节点已选
const setCheckedKeys = () => {
  mosoweTreeRef.value.setCheckedKeys(['64589cd409e29891989bc316', '64589cd409e29891989bc31e'])
}

// 设置节点未选
const setCheckedKeysNone = () => {
  mosoweTreeRef.value.setCheckedKeys(['64589cd409e29891989bc316', '64589cd409e29891989bc31e'], false)
}

// 节点点击
const nodeClick = (item: any) => {
  console.log(item)
}

// filter筛选
const searchKey = ref('')
const search = () => {
  mosoweTreeRef.value.filter(searchKey.value)
}

const checkValues = ref([])
watch(
    () => checkValues.value,
    () => {
      console.log(checkValues.value)
    },
    {
      deep: true
    }
)

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10rpx;
  box-sizing: border-box;
}

.buttons {
  margin: 10rpx 0;
}

.input {
  width: 100%;
  height: 80rpx;
  margin: 10rpx 0;
  border: 1px solid #999;
  border-radius: 6rpx;
  box-sizing: border-box;
}
</style>
