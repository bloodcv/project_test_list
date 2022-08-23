<script setup lang="ts">
const count = ref<number>(1);
const addCount = () => count.value++;
const num = ref<number>(1);
const addNum = () => num.value++;
</script>

<template>
  <div class="flex space-x-4">
    <router-link class="ring-4 ring-red-500 ring-opacity-50 pl-2 pr-2" style="width: fit-content" to="/listA"
      >to ListA</router-link
    >
    <router-link class="ring-4 ring-red-500 ring-opacity-50 pl-2 pr-2" style="width: fit-content" to="/formPage"
      >to formPage</router-link
    >
  </div>
  <div v-once>
    <h1> v-once-count: {{ count }}</h1>
  </div>
  <h1>count: {{ count }}</h1>
  <h1>num: {{ num }}</h1>
  <h1 v-memo="[num]">memo: {{ count }}</h1>
  <el-button @click="addCount">addCount</el-button>
  <el-button @click="addNum">addNum</el-button>
</template>