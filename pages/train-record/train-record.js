import { request } from './../../lib/request.js';

const app = getApp();

/**
 * 训练记录的颜色
 */
const colors = [
  'rgb(87,184,172)',
  'rgb(166,166,166)',
  'rgb(68,117,199)',
  'rgb(88,158,219)',
  'rgb(230,130,53)',
  'rgb(110,174,70)',
  'rgb(115,51,153)',
];

Page({

  data: {
    /**
     * 训练记录
     */
    trainRecord: [
      {
        date: '2022年5月1日',
        type: '手指训练',
        time: 34,
        id: 0,
      },
      {
        date: '2022年5月5日',
        type: '失认症训练',
        time: 22,
        id: 1,
      },
      {
        date: '2022年5月13日',
        type: '失认症训练',
        time: 34,
        id: 2,
      },
      {
        date: '2022年5月25日',
        type: '手指训练',
        time: 22,
        id: 3,
      },
    ],
  },

  onLoad: async function () {
    // const { token } = app.globalData;
    // const { data: res } = await request({
    //   url: '/v1/exercise/get',
    //   method: 'GET',
    //   data: {
    //     PageNum: 1,
    //     PageSize: 10,
    //   },
    //   header: {
    //     authorization: token,
    //     'content-type': 'application/x-www-form-urlencoded',
    //   },
    // });
    // console.log(res);

    const { trainRecord: record } = this.data;
    const len = colors.length;
    record.sort((a, b) => a.id < b.id);

    this.setData({
      trainRecord: record.map((item, index) => {
        item.direction = index % 2 === 0;
        item.color = colors[index % len];
        return item;
      }),
    });
  },

});
