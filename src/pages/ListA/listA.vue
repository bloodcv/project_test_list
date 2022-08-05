<script setup lang="ts">
import ListSrchCom from "@/components/ListSrchCom/ListSrchCom.vue";
import ListCom from "@/components/ListCom/ListCom.vue";
import { Limit } from "@/https/globalConstant";
import {
  srchFromConfig,
  currentPage,
  pageTotal,
  tableData,
  tableColumns,
  formSlot,
  getActStatusOptions,
  handleCurrentChange,
  querySubmit,
  handleTableEdit,
} from "./listA";

getActStatusOptions();
</script>

<template>
  <div class="flex space-x-4">
    <router-link class="ring-4 ring-red-500 ring-opacity-50 pl-2 pr-2" style="width: fit-content" to="/listB"
      >to ListB</router-link
    >
    <router-link class="ring-4 ring-red-500 ring-opacity-50 pl-2 pr-2" style="width: fit-content" to="/formPage"
      >to formPage</router-link
    >
  </div>
  <el-card class="box-card mt-4 mb-4 flex flex-col flex-1 overflow-hidden card-wrap">
    <list-srch-com
      :srchFromConfig="srchFromConfig"
      @onSubmit="querySubmit"
    >
      <template #formSlot>
        <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
          <el-form-item label="Approved by" class="w-full">
            <el-input v-model="formSlot.name" placeholder="name by" />
          </el-form-item>
        </div>
      </template>
      <template #actSlot>
        <el-button type="primary" class="justify-self-end">跳转</el-button>
      </template>
    </list-srch-com>
    <list-com
      @handleCurrentChange="handleCurrentChange"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :currentPage="currentPage"
      :pageTotal="pageTotal"
      :pageSize="Limit"
    >
      <template #originPrice="{ scope }">
        <p v-for="(item, index) in scope.row.originPrice" :key="index">
          {{ item }}
        </p>
      </template>
      <template #salePrice="{ scope }">
        <p v-for="(item, index) in scope.row.salePrice" :key="index">
          {{ item }}
        </p>
      </template>
      <template #type="{ scope }">
        <span>{{ scope.row.type.join("+") }}</span>
      </template>
      <template #lastEdit="{ scope }">
        <p>{{ scope.row.lastEdit.name }}</p>
        <p>{{ scope.row.lastEdit.date }}</p>
        <p>{{}}</p>
      </template>
      <template #actColumn>
        <el-table-column fixed="right" label="操作" :width="150">
          <template #default="scope">
            <el-button link type="primary" size="small">详情</el-button>
            <el-button link type="primary" size="small" @click="handleTableEdit(scope)">编辑</el-button>
          </template>
        </el-table-column>
      </template>
    </list-com>
  </el-card>
</template>

<style scoped lang="scss">
.my-font {
  color: $mBlue;
}
.card-wrap {
  > :deep(.el-card__body) {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
