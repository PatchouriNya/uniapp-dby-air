<!-- components/TreeNode.vue -->
<template>
  <view class="tree-node">
    <view @tap="toggle" @click="toggle">
      <text>{{ node.name }}</text>
    </view>
    <view v-if="isOpen" class="children">
      <TreeNode
          v-for="child in node.children"
          :key="child.id"
          :node="child"
      />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import TreeNode from './TreeNode.vue';

const props = defineProps({
  node: Object
});

const isOpen = ref(false);

const toggle = () => {
  if (props.node.children) {
    isOpen.value = !isOpen.value;
  }
};
</script>

<style scoped>
.tree-node {
  margin-left: 20px;
}
.children {
  margin-left: 20px;
}
</style>
