import { ApiGetDataList, ApiGetStatusOptions } from "@/https/api";
import { Limit } from "@/https/globalConstant";
// import { ref, reactive } from "vue";

const getActStatusOptions = async (): Promise<void> => {
  const options = await ApiGetStatusOptions();
  options.forEach(c => {
    c.label = c.name;
    c.value = c.key;
  })
  srchFromConfig.value[2].options = [...options];
}

const getDataList = async (query: ISrchData) => {
  const { dataList, total } = await ApiGetDataList(query);
  tableData.value = [...dataList];
  pageTotal.value = total;
}

const getListData = (query: ISrchFormData | null) => {
  const newQuery = {
    limit: Limit,
    currentPage: currentPage.value,
    ...query,
    ...formSlot,
  };
  getDataList(newQuery as unknown as ISrchData);
};

const querySubmit = (query: ISrchFormData): void => {
  currentPage.value = 1;
  console.log('querySubmit')
  const newQuery = {
    limit: Limit,
    currentPage: currentPage.value,
    ...query,
    ...formSlot,
  };
  Object.assign(curQuery, newQuery)
  getListData(newQuery as unknown as ISrchFormData);
}

const handleCurrentChange = (curPage: number) => {
  currentPage.value = curPage;
  console.log(
    "curQuery",
    curQuery
  );
  getListData(curQuery);
};

const handleTableEdit = (e: any): void => {
  console.log('handleTableEdit', e)
}

const srchFromConfig = ref<ISrchFormConfig[]>([
  {
    label: 'SKU名称',
    type: 'Input',
    key: 'skuName',
    attrs: {
      placeholder: '请输入SKU名称',
      maxlength: 2,
    }
  },
  {
    label: 'SKU代码',
    type: 'Input',
    key: 'skuCode',
    attrs: {
      placeholder: '请输入SKU代码',
      maxlength: 5,
    }
  },
  {
    label: '活动状态',
    type: 'SingleSelect',
    key: 'actStatus',
    options: [],
    attrs: {
      placeholder: '选择活动状态',
    }
  }
])

const curQuery = reactive({});
const tableData = ref<IListDataItem[]>([]);
const tableColumns = ref<ITableColumnsItem[]>([{
  name: 'code',
  label: 'SKU代码',
}, {
  name: 'name',
  label: 'SKU名称',
}, {
  name: 'originPrice',
  label: '原价-现金',
  attr: {
    width: 150,
  },
  slot: true,
}, {
  name: 'salePrice',
  label: '售价-现金',
  attr: {
    width: 150,
  },
  slot: true,
}, {
  name: 'type',
  label: '商品类型',
  attr: {
    width: 100,
  },
  slot: true,
}, {
  name: 'store',
  label: '实际库存',
}, {
  name: 'status',
  label: '状态',
}, {
  name: 'lastEdit',
  label: '最后编辑',
  attr: {
    width: 110,
  },
  slot: true,
}])
const currentPage = ref<number>(1);
const pageTotal = ref<number>(1);

const formSlot = reactive<IFormSlot>({
  name: "",
  region: "",
});

export {
  srchFromConfig,
  currentPage,
  pageTotal,
  tableData,
  tableColumns,
  formSlot,
  curQuery,
  getActStatusOptions,
  getDataList,
  getListData,
  querySubmit,
  handleCurrentChange,
  handleTableEdit,
}

export interface IFormSlot {
  name: string;
  region: string;
}
