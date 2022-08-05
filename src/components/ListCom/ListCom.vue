<script setup lang="ts">
import { Limit } from "@/https/globalConstant";

type IProps = {
  tableData: IListDataItem[];
  tableColumns: ITableColumnsItem[];
  currentPage: number;
  pageTotal: number;
  pageSize: number;
}

interface IEmitHandleCurrentChange {
  (event: string, currentPage: number): void;
}

const props = withDefaults(defineProps<IProps>(), {
  tableData: () => [],
  tableColumns: () => [],
  currentPage: 1,
  pageTotal: 1,
});

const EmitHandleCurrentChange = defineEmits<IEmitHandleCurrentChange>();

const handleCurrentChange = (currentPage: number) => {
  console.log(`EmitHandleCurrentChange: ${currentPage}`);
  EmitHandleCurrentChange('handleCurrentChange', currentPage);
};
</script>

<template>
  <el-card class="box-card mt-2 mb-2 card-wrap" style="height: 100%; overflow: hidden;">
    <el-table
      height="100%"
      :data="props.tableData"
      style="width: 100%"
      :empty-text="'暂无数据'"
    >
      <template v-for="(column, index) in tableColumns" :key="index">
        <!-- 三种  正常展示、slot展示、操作项 -->
        <!-- 正常展示 -->
        <el-table-column
          v-if="!column.slot"
          :label="column.label"
          :prop="column.name"
          v-bind="column.attr || {}"
        />
        <!-- slot展示 -->
        <el-table-column
          v-else
          :label="column.label"
          :prop="column.name"
          v-bind="column.attr || {}"
        >
          <template #default="scope">
            <slot :name="column.name" :scope="scope"></slot>
          </template>
        </el-table-column>
      </template>
      <!-- 操作项 -->
      <slot name="actColumn" />
      <!-- 
      <el-table-column prop="date" label="Date" width="150">
        <template #default="scope">
          <slot name="date" :scope="scope"></slot>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="State" width="120" />
      <el-table-column prop="city" label="City" width="120" />
      <el-table-column prop="address" label="Address" width="600" />
      <el-table-column prop="zip" label="Zip" width="120" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick"
            >Detail</el-button
          >
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
       -->
    </el-table>

    <el-pagination
      class="self-el-pagination"
      :currentPage="currentPage"
      :page-size="Limit"
      background
      layout="prev, pager, next, jumper"
      :total="pageTotal"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<style scoped lang="scss">
.self-el-pagination {
  width: fit-content;
  margin-left: auto;
  margin-top: 10px;
}
.card-wrap {
  > :deep(.el-card__body) {
    height: 100%;
    overflow: hidden;
  }
}
</style>
