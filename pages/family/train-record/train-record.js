/**
 * @typedef Record
 * @property {string} color
 * @property {string} date
 * @property {boolean} direction
 * @property {number} id
 * @property {number} time
 * @property {string} type
 * @property {number} zindex
 * @property {string} exDate
 * @property {string} exTime
 * @property {number} exType
 * @property {number} score
 */

import Toast from '@vant/weapp/toast/toast';

import { getExerciseRecord } from './../../../api/exercise';

import { formatTime } from './../../../utils/util';

const token = wx.getStorageSync('token');

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
     * @type {Record[]}
     */
    records: [],
  },

  onLoad: async function () {
    wx.showLoading({
      title: '获取记录中',
      mask: true,
    });

    try {
      const { records } = await getExerciseRecord(token);

      records.forEach((item, index) => {
        item.direction = index % 2 === 0;
        item.color = colors[index % colors.length];
        item.id = index;
        item.date = formatTime(new Date(item.exDate)).split(' ')[0];
        item.type = types[item.exType];
        item.time = parseInt(item.exTime) * 60;
        item.zindex = 99 - index;
      });

      this.setData({
        records,
      });
    } catch (err) {
      console.error(err);
      Toast.fail('网络异常！');
    }

    setTimeout(() => {
      wx.hideLoading({
        noConflict: true,
      });
    }, 1000);
  },

});
