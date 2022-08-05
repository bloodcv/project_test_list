<script setup lang="ts">

interface IModelValueItem {
  originPrice: number;
  salePrice: number;
}
interface IPriceInfoItem {
  name: string;
  priceType: string;
}
type IProps = {
  modelValue: IModelValueItem[];
  disable?: boolean;
  priceInfo: IPriceInfoItem[];
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: () => [],
  disable: false,
  priceInfo: () => []
})

</script>

<template>
  <div class="flex flex-col space-y-4 price-com-wrap">
    <div v-for="(item, index) in props.priceInfo" :key="index" class="flex space-x-4 item-wrap">
      <span>{{ item.name }}:</span>
      <div class="item-price-wrap flex">
        <span>原价（{{ item.priceType }}）</span>
        <el-input-number v-model="modelValue[index].originPrice"></el-input-number>
      </div>
      <div class="item-price-wrap flex">
        <span>指定售价</span>
        <el-input-number v-model="modelValue[index].salePrice"></el-input-number>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.price-com-wrap {
  min-width: 600px;
}
.item-wrap {
  > span {
    width: 100px;
    text-align: right;
    display: inline-block;
  }
  .item-price-wrap {
    width: 300px;
    > span {
      white-space: nowrap;
      width: 90px;
      display: inline-block;
      text-align: right;
      padding-right: 10px;
    }
  }
}
</style>