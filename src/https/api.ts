
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { Limit } from './globalConstant';

export const ApiGetStatusOptions = (): Promise<any[]> => {
  let resArr: any[] = [];
  for (let index = 0; index < 5; index++) {
    resArr.push({
      key: faker.name.firstName(),
      name: faker.music.songName(),
      id: faker.random.numeric(3),
    })
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(resArr)
    }, 2000);
  })
}

export const ApiGetDataList = (query: ISrchData): Promise<{
  dataList: IListDataItem[];
  total: number;
}> => {
  console.log('ApiGetDataList', query)
  let dataList: IListDataItem[] = [];
  let { skuCode, skuName } = query;
  for (let index = 0; index < Limit; index++) {
    dataList.push({
      code: `${skuCode || 'none'}_${faker.name.firstName()}`,
      name: skuName as string || 'none',
      originPrice: [`中国大陆/${faker.random.numeric(3)}元`, `中国台湾/${faker.random.numeric(3)}台币`, `泰国/${faker.random.numeric(3)}泰铢`],
      salePrice: [`中国大陆/${faker.random.numeric(3)}元`, `中国台湾/${faker.random.numeric(3)}台币`, `泰国/${faker.random.numeric(3)}泰铢`],
      type: ['实物', '虚拟'],
      store: Math.ceil(Math.random() * Number(faker.random.numeric(5))),
      status: Number(faker.random.numeric(2)) > 50 ? true : false,
      lastEdit: {
        name: faker.name.firstName(),
        date: dayjs(faker.date.past().toString()).format('YYYY-MM-DD HH:mm:ss')
      }
    })
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        dataList,
        total: 200,
      })
    }, 1000);
  })
}

const goodsType = ['课程', '思维', '英语', '科学', '自然', '语文'];

export const ApiGetGoodsOptions = (): Promise<{
  options: IGoodsOptionsItem[]
}> => {
  let options: IGoodsOptionsItem[] = [];
  for (let i = 0; i < Number(faker.random.numeric(2)); i++) {
    options.push({
      id: Number(`${i + 1}${faker.random.numeric(2)}`),
      name: faker.name.firstName(),
      type: `${goodsType[Math.floor(Math.random() * 6)]}1, ${goodsType[Math.floor(Math.random() * 6)]}2`,
      originPrice: [
        '168元 (中国大陆)', '268台币 (中国台湾)', '368台币 (泰国)'
      ],
      originStore: Number(faker.random.numeric(3)),
      cover: faker.image.image(),
      realStore: Number(faker.random.numeric(2))
    })
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        options
      })
    }, 2000);
  })
}
