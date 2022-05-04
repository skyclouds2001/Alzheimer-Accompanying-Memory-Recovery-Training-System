import Toast from '@vant/weapp/toast/toast';

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
     * @default []
     */
    images: [
      './../../images/psc.jpg',
      './../../images/psc.jpg',
    ],

    /**
     * 已打卡天数
     * @type {number}
     * @default 0
     */
    clockDays: 0,

    /**
     * 日历的时间范围
     * @type {timestamp}
     */
    minDate: new Date().getTime(),

    /**
     * 日历的时间范围
     * @type {timestamp}
     */
    maxDate: new Date().getTime(),

    /**
     * 日历默认选中时间范围
     * @type {timestamp[]}
     * @default []
     */
    defaultDate: [
      new Date().getTime(),
    ],

    /**
     * 负责对日历进行初始化的函数方法
     * @function
     * @param {Day} day
     * @returns {Day}
     */
    formatter: function (day) {
      return day;
    },

    /**
     * 控制 dialog 显示与否
     * @type {boolean}
     * @default false
     */
    showDialog: false,

    /**
     * dialog 问题内容
     * @type {string}
     * @default ''
     */
    question: '今天是几月几号呢？',

    /**
     * dialog 问题提示
     * @type {string}
     * @default ''
     */
    recommend: '请输入今天的日期',

    /**
     * input 输入
     */
    inputValue: '',

  },

  onLoad: function () {
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
   * @default 0
   */
  clockStep: 0,

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

});
