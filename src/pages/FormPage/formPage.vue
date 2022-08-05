<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import PriceCom from "@/components/PriceCom/priceCom.vue";
import SaleGoodsCom from '@/components/SaleGoodsCom/saleGoodsCom.vue';
import { ApiGetGoodsOptions } from "@/https/api.js";

interface IPriceInfoItem {
  name: string;
  priceType: string;
}

interface IPriceDataItem {
  originPrice: number;
  salePrice: number;
}

const formRef = ref<FormInstance>();

const formData = reactive<{
  priceData: IPriceDataItem[];
  goodsInclude: IGoodsOptionsItem[];
}>({
  priceData: [
    {
      originPrice: 0,
      salePrice: 0,
    },
    {
      originPrice: 0,
      salePrice: 0,
    },
    {
      originPrice: 0,
      salePrice: 0,
    },
  ],
  goodsInclude: []
});

const priceInfo: IPriceInfoItem[] = [
  {
    name: "中国大陆",
    priceType: "元",
  },
  {
    name: "中国台湾",
    priceType: "台币",
  },
  {
    name: "泰国",
    priceType: "泰铢",
  },
];

const goodsOptions = ref<IGoodsOptionsItem[]>([]);

const getGoodsOptions = async (): Promise<void> => {
  const  { options } = await ApiGetGoodsOptions();
  goodsOptions.value = [...options];
}

getGoodsOptions();

const validatePassPriceData = (
  rule: object,
  value: IPriceDataItem[],
  callback: any
): void => {
  for (let i = 0; i < value.length; i++) {
    console.log(i);
    if (value[i].originPrice > 5) {
      callback(new Error("原价不能大于5"));
      break;
    } else if (value[i].salePrice > value[i].originPrice) {
      callback(new Error("售价不能大于原价"));
      break;
    }
  }
  callback();
};

const validatePassGoodsInclude = (
  rule: object,
  value: IGoodsOptionsItem[],
  callback: any
): void => {
  if (value.length < 1) {
    callback(new Error("必选"));
  } else {
  callback();
  }
};

const rules = reactive({
  priceData: [
    { required: true, message: "必填", trigger: "change" },
    { validator: validatePassPriceData, trigger: "change" },
  ],
  goodsInclude: [
    { required: true, message: "必选", trigger: "change" },
    { validator: validatePassGoodsInclude, trigger: "change" },
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // console.log("submit!", formData);
      console.log('sub', formData.goodsInclude)
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {};
</script>

<template>
  <div class="flex space-x-4">
    <router-link
      class="ring-4 ring-red-500 ring-opacity-50 pl-2 pr-2"
      style="width: fit-content"
      to="/listB"
      >to ListB</router-link
    >
    <router-link
      class="ring-4 ring-red-500 ring-opacity-50 pl-2 pr-2"
      style="width: fit-content"
      to="/formPage"
      >to formPage</router-link
    >
  </div>
  <el-card class="box-card mt-4 mb-4 flex flex-col flex-1">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="各地区定价" prop="priceData">
        <el-card class="box-card">
          <price-com
            v-model="formData.priceData"
            :priceInfo="priceInfo"
          />
        </el-card>
      </el-form-item>
      <el-form-item label="包含商品" prop="goodsInclude">
        <el-card class="box-card" style="width: 50vw;">
          <sale-goods-com v-model="formData.goodsInclude" :goodsOptions="goodsOptions"></sale-goods-com>
        </el-card>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)"
          >Submit</el-button
        >
        <el-button @click="resetForm(formRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
