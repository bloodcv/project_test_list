type ISrchFormConfigKey = 'Input' | 'SingleSelect';

interface ISrchFormConfig {
  label: string;
  type: ISrchFormConfigKey;
  key: string;
  options?: any[];
  attrs?: {
    [key: string]: string | boolean | number
  };
}

interface ISrchFormData {
  [key: string]: string | []
}

interface ISrchData {
  limit: number;
  currentPage: number;
  [key: string]: string | [];
}

interface ILastEdit {
  name: string;
  date: string;
}

interface IListDataItem {
  code: string;
  name: string;
  originPrice: string[];
  salePrice: string[];
  type: string[];
  store: number;
  status: boolean;
  lastEdit: ILastEdit;
}

interface ITableColumnsItem {
  name: string;
  label: string;
  attr?: any;
  slot?: boolean;
}

interface IGoodsOptionsItem {
  id: number;
  name: string;
  type: string;
  cover: string;
  originPrice: string[];
  originStore: number;
  realStore: number;
  goodAmount?: number;
  disabled?: boolean;
}

