<script setup lang="ts">
import { onMounted, onUpdated, ref, VNodeRef, watch } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { ElLoading } from "element-plus";

type IProps = {
  modelValue: IGoodsOptionsItem[];
  goodsOptions: IGoodsOptionsItem[];
};

const props = withDefaults(defineProps<IProps>(), {
  modelValue: () => [],
  goodsOptions: () => [],
});

const comGoodsOptions = ref<IGoodsOptionsItem[]>([]);
const selectOptions = ref([]);
const emit = defineEmits(["update:modelValue"]);
const handleCheckSelect = (): void => {
  if (selectOptions.value.length < 1) return;
  // console.log(selectOptions.value)
  let checkOptions: IGoodsOptionsItem[] = [];
  selectOptions.value.forEach((i) => {
    // console.log('selectOptions.value', i)
    checkOptions.push({
      ...comGoodsOptions.value[i],
    });
    comGoodsOptions.value[i].disabled = true;
  });
  checkOptions = [...props.modelValue, ...checkOptions];
  emit("update:modelValue", checkOptions);
  selectOptions.value = [];
};

const handleDeleteItem = ({
  id,
  index,
}: {
  id: number;
  index: number;
}): void => {
  console.log("id:", id);
  // 修改选择项中disabled为false
  for (let i = 0; i < comGoodsOptions.value.length; i++) {
    if (comGoodsOptions.value[i].id === id) {
      comGoodsOptions.value[i].disabled = false;
      break;
    }
  }
  // 删除选中项
  let checkOptions: IGoodsOptionsItem[] = [...props.modelValue];
  checkOptions.splice(index, 1);
  emit("update:modelValue", checkOptions);
};

watch(
  () => props.goodsOptions,
  () => {

    comGoodsOptions.value = [...props.goodsOptions.map(c => {
      c.goodAmount = c.goodAmount || 1
      return c;
    })];
  }
);
</script>

<template>
  <div class="flex flex-col sale-goods-com-wrap">
    <div class="select-wrap flex space-x-4">
      <el-select
        v-model="selectOptions"
        multiple
        clearable
        placeholder="请选择"
        style="flex: 1"
      >
        <el-option
          v-for="(item, index) in goodsOptions"
          :key="item.id"
          :label="item.name"
          :value="index"
          :disabled="item.disabled"
        />
      </el-select>
      <el-button type="primary" @click="handleCheckSelect">确认</el-button>
    </div>
    <div class="result-wrap" v-if="modelValue.length > 0">
      <el-scrollbar max-height="300px">
        <div class="scroll-wrap flex flex-col mt-2 space-y-2">
          <template v-for="(item, index) in modelValue" :key="item.id">
            <div class="item flex space-x-4">
              <el-popover placement="right" width="unset">
                <template #reference>
                  <div class="content flex-grow flex">
                    <div class="img-wrap">
                      <el-image style="width: 46px; height: 46px" :src="item.cover" :fit="'fill'">
                      </el-image>
                    </div>
                    <div class="info flex pl-4 pr-4 justify-between flex-grow">
                      <span>{{ item.name }}</span>
                      <span>x{{ item.goodAmount}}</span>
                    </div>
                  </div>
                </template>
                <div class="tooltip-wrap flex flex-col">
                  <div class="title flex justify-between">
                    <h1 class="flex-grow">{{ item.name }}</h1>
                    <el-icon @click="handleDeleteItem({ id: item.id, index })">
                      <Delete style="width: 1em; height: 1em" />
                    </el-icon>
                  </div>
                  <div class="tooltip-content flex">
                    <div class="left-tooltip flex flex-col space-y-6">
                      <el-image style="width: 100px; height: 100px" :src="item.cover" :fit="'fill'" />
                      <el-input-number
                        v-model="item.goodAmount"
                        :min="1"
                        controls-position="right"
                        style="width: 100px;"
                      />
                    </div>
                    <div class="right-info flex flex-col space-y-3">
                      <div>
                        <span>商品名称：</span>
                        <span>{{ item.name }}</span>
                      </div>
                      <div>
                        <span>商品类型：</span>
                        <span>{{ item.type }}</span>
                      </div>
                      <div>
                        <span>原价：</span>
                        <div class="flex flex-col space-y-2">
                          <span v-for="(originPriceItem, index) in item.originPrice" :key="index">{{ originPriceItem }}</span>
                        </div>
                      </div>
                      <div>
                        <span>原始库存：</span>
                        <span>{{ item.originStore }}</span>
                      </div>
                      <div>
                        <span>实际库存：</span>
                        <span>{{ item.realStore }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-popover>
              <div class="act flex items-center">
                <el-icon @click="handleDeleteItem({ id: item.id, index })">
                  <Delete style="width: 1em; height: 1em" />
                </el-icon>
              </div>
            </div>
          </template>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sale-goods-com-wrap {
  width: 100%;
  .result-wrap {
    background-color: #f8f9fc;
    margin-top: 16px;
    .scroll-wrap {
      padding: 16px;
    }
    .item {
      .content {
        cursor: pointer;
        background: #ffffff;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        align-items: center;
        .img-wrap {
          width: 46px;
          height: 46px;
        }
      }
      .act {
        cursor: pointer;
      }
    }
  }
}
.tooltip-wrap {
  padding: 10px;
  padding-top: 0;
  .title {
    padding-bottom: 12px;
    border-bottom: 1px solid #F0F0F0;
    h1 {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      color: #262626;
    }
  }
  .tooltip-content {
    margin-top: 16px;
    .right-info {
      margin-left: 16px;
      > div {
        display: flex;
        > span:nth-child(1) {
          display: inline-block;
          width: 80px;
          text-align: right;
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
