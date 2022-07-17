import Toast from '@vant/weapp/toast/toast';

import { getCheckinDays, getCheckinRecord, postCheckinRecord } from './../../api/checkin';

const token = wx.getStorageSync('token');

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
    /** todo 打卡日期为最后一天时存在 bug */

    // 当天的日期
    const date = new Date();
    // 当天的年份、月份、日份
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDay = 1;
    const today = date.getDate();
    const endDay = new Date(year, month + 1, 0).getDate();

    // 设置日历时间范围，默认为所在月份的第一天与最后一天
    this.setData({
      minDate: new Date(year, month, startDay).getTime(),
      maxDate: new Date(year, month, endDay).getTime(),
    });

    try {
      // 获取用户已打卡日期及已打卡次数
      const res1 = await getCheckinDays(token);
      const res2 = await getCheckinRecord(token);

      // 设置已打卡日期及已打卡次数
      this.setData({
        clockDays: res1.count,
        days: res2?.days.map(day => new Date(year, month, day).getTime()) ?? [],
      });

      // 检测当日是否已打卡并更新进度
      if (res2?.days.includes(today)) {
        this.clockStep = 3;
      }
    } catch (err) {
      console.log(err);
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
    try {
      const res = await postCheckinRecord(token);
      Toast.success(res);
      const { days, clockDays } = this.data;
      this.setData({
        days: days.push(new Date().getTime()),
        clockDays: clockDays + 1,
      });
    } catch (err) {
      console.log(err);
      Toast.fail('打卡失败，请稍后再试');
    }
  },

});
