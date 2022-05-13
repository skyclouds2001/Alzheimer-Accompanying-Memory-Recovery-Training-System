import Toast from '@vant/weapp/toast/toast';

import { request } from './../../lib/request.js';

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
     * 轮播图图片
     * @type {string[]}
     */
    images: [],

    /**
     * 已打卡天数
     * @type {number}
     */
    clockDays: 0,

    /**
     * 日历的时间范围-起始日期
     * @type {timestamp}
     */
    minDate: new Date().getTime(),

    /**
     * 日历的时间范围-结束日期
     * @type {timestamp}
     */
    maxDate: new Date().getTime(),

    /**
     * 负责对日历进行初始化的函数方法
     * @function
     * @param {Day} day
     * @returns {Day}
     */
    formatter: function (day) {
      if (day.date.getDate() === 1) {
        day.bottomInfo = ' ';
        day.type = 'selected';
        day.className = 'select';
      } else {
        day.type = '';
      }
      return day;
    },

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
     * input 输入
     * @type {string}
     */
    inputValue: '',

  },

  onLoad: async function () {
    // 获取用户已打卡次数及已打卡日期
    const res = await request({
      url: '',
      method: '',
      data: {},
      header: {},
    });
    console.log(res);

    // 当天的日期
    const date = new Date();
    // 当天的年份、月份、日份
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = new Date(year, month + 1, 0).getDate();

    // 设置日历时间范围，默认为所在月份的第一天与最后一天
    this.setData({
      minDate: new Date(year, month, 1).getTime(),
      maxDate: new Date(year, month, day).getTime(),
    });
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
    const { inputValue } = this.data;
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
      // 此时打卡中-回答问题一，检测答案非空后初始化问题二内容
      case 1:
        if (inputValue.length === 0) {
          break;
        }
        this.setData({
          question: '今天天气如何呢？',
          recommend: '请输入今天的天气 ~',
          inputValue: '',
        });
        this.clockStep = 2;
        break;
      // 此时打卡中-回答问题二，检测答案非空后关闭打卡框
      case 2:
        if (inputValue.length === 0) {
          break;
        }
        this.setData({
          question: ' ',
          recommend: '',
          showDialog: false,
          inputValue: '',
        });
        this.clockStep = 3;
        break;
      // 此时已打卡，显示已打卡提示信息
      case 3:
        Toast('您已打卡啦！');
        break;
    }
  },

  /**
   * 实现打卡功能函数
   * @function
   * @async
   * @returns {void}
   */
  async checkinMain () {
    try {
      const res = await request({
        url: '',
        method: '',
        data: {},
        header: {},
      });
      console.log(res);
    } catch (err) {
    }
  },

});
