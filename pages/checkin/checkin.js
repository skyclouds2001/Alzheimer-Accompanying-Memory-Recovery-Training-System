import Toast from '@vant/weapp/toast/toast';

import { request } from './../../lib/request.js';

const app = getApp();

const today = new Date().getDate();

/**
 * @typedef Day
 * @type {Object}
 * @property {Date} date
 * @property {string} type
 * @property {string} text
 * @property {string} topInfo
 * @property {string} bottomInfo
 * @property {string} className
 */

/**
 * @typedef timestamp
 * @type {number}
 */

Page({

  data: {

    /**
     * 已打卡天数
     * @type {number}
     */
    clockDays: 0,

    /**
     * 日历的时间范围-起始日期
     * @type {timestamp}
     */
    minDate: 0,

    /**
     * 日历的时间范围-结束日期
     * @type {timestamp}
     */
    maxDate: 0,

    /**
     * 负责对日历进行初始化的函数方法
     * @param {Day} day
     * @returns {Day}
     */
    formatter: function (day) {
      if (day.type === 'multiple-selected') {
        day.bottomInfo = ' ';
        day.className = 'select';
      } else {
        day.type = '';
      }
      return day;
    },

    /**
     * 已打卡的当月具体日期
     * @type {timestamp[]}
     */
    days: [],

    /**
     * 控制 dialog 显示与否
     * @type {boolean}
     */
    showDialog: false,

    /**
     * dialog 问题内容
     * @type {string}
     */
    question: '',

    /**
     * dialog 问题提示
     * @type {string}
     */
    recommend: '',

    /**
     * input 问题答案输入
     * @type {string}
     */
    inputValue: '',

  },

  onLoad: async function () {
    /** TODO: 疑似打卡日期为最后一天时存在 bug */

    const { token } = app.globalData;

    // 当天的日期
    const date = new Date();
    // 当天的年份、月份、日份
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDay = 1;
    const endDay = new Date(year, month + 1, 0).getDate();

    // 设置日历时间范围，默认为所在月份的第一天与最后一天
    this.setData({
      minDate: new Date(year, month, startDay).getTime(),
      maxDate: new Date(year, month, endDay).getTime(),
    });

    try {
      // 并行获取用户已打卡日期及已打卡次数
      const [{ value: { data: res1 } }, { value: { data: res2 } }] = await Promise.allSettled([
        // 获取已打卡日期
        request({
          url: '/v1/patient/sign/signRecord',
          method: 'GET',
          data: {},
          header: {
            authorization: token,
          },
        }),
        // 获取已打卡次数
        request({
          url: '/v1/patient/sign/count/1',
          method: 'GET',
          data: {},
          header: {
            authorization: token,
          },
        }),
      ]);

      // 检测请求是否成功：特判res1为空字符串的情况
      if ((res1 !== '' && res1?.status !== 10000) || res2?.status !== 10000) throw new Error();

      // 设置已打卡日期及已打卡次数
      wx.nextTick(() => {
        this.setData({
          days: res1?.data.days ?? [],
          clockDays: res2.data.count,
        });
      });
    } catch (err) {
      Toast.fail('网络异常，请稍后重试');
    }
  },

  /**
   * 打卡进度
   * * 0 未打卡
   * * 1 打卡中-问题 1
   * * 2 打卡中-问题 2
   * * 3 已打卡
   * @type {number}
   */
  clockStep: 0,

  /**
   * 打卡弹出框响应方法
   * @returns {void}
   */
  handleClock () {
    const { inputValue, days } = this.data;

    if (today in days) {
      Toast('您已打卡啦！');
      return;
    }

    switch (this.clockStep) {
      // 此时未打卡，显示打卡框并初始化问题一内容
      case 0:
        this.setData({
          showDialog: true,
          question: '今天是几月几号呢？',
          recommend: '请输入今天的日期 ~',
          inputValue: '',
        });

        this.clockStep = 1;

        break;
      // 此时打卡中 - 正在回答问题一，检测答案非空后初始化问题二内容
      case 1:
        if (inputValue.length === 0) break;

        this.setData({
          question: '今天天气如何呢？',
          recommend: '请输入今天的天气 ~',
          inputValue: '',
        });

        this.clockStep = 2;

        break;
      // 此时打卡中 - 正在回答问题二，检测答案非空后关闭打卡框，并上传打卡数据
      case 2:
        if (inputValue.length === 0) break;

        this.setData({
          question: ' ',
          recommend: '',
          showDialog: false,
          inputValue: '',
        });

        this.clockStep = 3;

        this.updateCheckin();

        break;
      // 此时已打卡，显示已打卡提示信息
      case 3:
        Toast('您已打卡啦！');
        break;
    }
  },

  /**
   * 实现打卡功能函数
   * @returns {void}
   */
  async updateCheckin () {
    const { token } = app.globalData;

    try {
      const { data: res } = await request({
        url: '/v1/patient/sign',
        method: 'POST',
        data: {},
        header: {
          authorization: token,
        },
      });

      if (res?.status !== 10000) {
        throw new Error();
      } else {
        const { days, clockDays } = this.data;
        this.setData({
          days: days.push(new Date().getDate()),
          clockDays: clockDays + 1,
        });
      }
    } catch (err) {
      Toast.fail('网络异常，请稍后再试');
    }
  },

});
