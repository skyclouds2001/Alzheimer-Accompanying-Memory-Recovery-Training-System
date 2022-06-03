import Toast from '@vant/weapp/toast/toast';

import { request } from './../../lib/request.js';
import { formatTime } from './../../utils/util.js';

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

/**
 * 训练类型
 */
const types = [
  '记忆训练',
  '手指训练',
  '音乐治疗',
];

Page({

  data: {
    /**
     * 训练记录
     */
    records: [],
  },

  onLoad: async function () {
    wx.showLoading({
      title: '获取记录中',
      mask: true,
    });

    const res = await this.getTrainRecord();

    if (!res || res?.status !== 10000) {
      return Toast.fail('网络异常，请稍后重试');
    }

    const { records } = res.data;

    this.setData({
      records: records.map((item, index) => {
        item.direction = index % 2 === 0;
        item.color = colors[index % colors.length];
        item.id = index;
        item.date = formatTime(new Date(item.exDate)).split(' ')[0];
        item.type = types[item.exType];
        item.time = parseInt(item.exTime) * 60;
        item.zindex = 9999 - index;
        return item;
      }),
    });

    setTimeout(() => {
      wx.hideLoading({
        noConflict: true,
      });
    }, 1000);
  },

  /**
   * 获取训练记录
   * @returns {?Object}
   */
  async getTrainRecord () {
    const { token } = app.globalData;
    try {
      const { data: res } = await request({
        url: '/v1/exercise/get',
        method: 'GET',
        data: {
          PageNum: 1,
          PageSize: 10,
        },
        header: {
          authorization: token,
        },
      });
      return res;
    } catch (err) {
      return null;
    }
  },

});
