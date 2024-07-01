<template>
  <view>
    <view>会员信息:{{memberStore.profile}}</view>
    <button @tap="memberStore.setProfile({
    nickname:'123',
    })" size="mini" plain="true" type="primary">保存用户信息</button>
    <button @tap="memberStore.clearProfile()" size="mini" plain="true" type="warn">清除用户信息</button>
  </view>
</template>

<script setup>
import {useMemberStore} from '../../stores'
const memberStore = useMemberStore()
console.log(memberStore.profile)
</script>


<style scoped lang="scss">

</style>
