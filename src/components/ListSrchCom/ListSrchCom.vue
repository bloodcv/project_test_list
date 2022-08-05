<script setup lang="ts">
import { onMounted, reactive } from "vue";
interface IProps {
  srchFromConfig: ISrchFormConfig[];
}
interface IEmitsOnSubmit {
  (event: string, query: ISrchFormData): void
}

const props = withDefaults(defineProps<IProps>(), {
  srchFromConfig: (): ISrchFormConfig[] => [],
});

const formData: ISrchFormData = reactive({});

onMounted(() => {
  props.srchFromConfig.map(c => {
    if (c.type === 'Input') {
      formData[c.key] = '';
    } else if (c.type === 'SingleSelect') {
      formData[c.key] = '';
    }
  })
  onSubmit();
})

const EmitsOnSubmit = defineEmits<IEmitsOnSubmit>();

const onSubmit = () => {
  EmitsOnSubmit('onSubmit', { ...formData })
};
</script>

<template>
  <el-card class="box-card mt-2 mb-2" style="overflow: unset;">
    <el-form
      :inline="true"
      :label-width="100"
      :model="formData"
      class="srch-form"
    >
      <!-- <div
        class="grid gap-x-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      > -->
      <div class="flex flex-wrap">
        <template v-for="(item, index) in srchFromConfig" :key="index">
          <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5" v-if="item.type === 'Input'">
            <el-form-item :label="item.label" class="w-full">
              <el-input v-model="formData[item.key]" v-bind="item.attrs" />
            </el-form-item>
          </div>
          <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5" v-if="item.type === 'SingleSelect'">
            <el-form-item :label="item.label" class="w-full">
              <el-select v-model="formData[item.key]" v-bind="item.attrs">
                <el-option v-for="(opt, index) in item.options" :key="index" :label="opt.label" :value="opt.value" />
              </el-select>
            </el-form-item>
          </div>
        </template>
        <slot name="formSlot" />
        <div class="act-btn flex-shrink" :style="'padding-left: 100px;'">
          <el-button class="mr-1" type="primary" @click="onSubmit">Query</el-button>
          <slot name="actSlot" />
        </div>
      </div>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
.srch-form {
  .el-select {
    width: 100%;
  }
}
</style>
