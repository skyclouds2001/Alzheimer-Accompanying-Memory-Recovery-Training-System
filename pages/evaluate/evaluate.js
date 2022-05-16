import { request } from './../../lib/request.js';

import Toast from '@vant/weapp/toast/toast';

/**
 * @typedef {Object} Question
 * @property {number} type 问题类型
 * * 1 静态客观题
 * * 2 动态客观题？？？？？
 * @property {string} name 问题题干
 * @property {?number} answer 问题答案(正整数)
 * @property {?string | string[]} checks 问题选项
 * * 需要前端将字符串转换为数组
 * @property {number} score 问题分值
 * @property {string} reply 用户回答选择|输入内容
 */

Page({
  data: {
    /**
     * 当前问题
     * @type {Question}
     */
    question: {},

    /**
     * 当前答题进度下标 1~13 14
     * * 1~13 答题中
     * * 14 答题完成&显示分数
     * @type {number}
     */
    index: 0,

    /**
     * 整体问题数量
     * @type {number}
     */
    length: 0,
  },

  /**
   * 存放所有长谷川问题
   * @type {Question[]}
   */
  allQuestion: [],

  onLoad: async function () {
    try {
      // 请求获取问题和选项
      const { data: res } = await request({
        url: 'https://www.thylovezj.space/v1/problem/getcgc',
        method: 'GET',
      });

      // 检测请求是否成功
      if (Number(res.status) !== 10000) {
        throw new Error();
      }

      // 预处理问题（选项）及保存问题内容
      const question = res.data;
      question.forEach(v => {
        v.checks = v.checks ? v.checks.slice(1, -1).split(',').map(v => v.split('.')) : null;
        v.reply = 0;
      });
      /** todo:根据问题类型做初始化操作 */
      this.allQuestion = question;

      // 初始化问题数据
      const current = 1;
      this.setData({
        index: current,
        question: this.allQuestion[current - 1],
        length: this.allQuestion.length,
      });
    } catch (err) {
      Toast.fail('网络异常，请稍后再试');
    }
  },

  /**
   * 客观题选择选项
   * @function
   * @param {TouchEvent} e 点击事件参数
   * @returns {void}
   */
  handleChooseAnswer (e) {
    // 提取当前点击选项
    const { id } = e.target.dataset;

    // 判断是否点击的是选项
    if (!id) {
      return;
    }

    // 将选项更新入data中
    const { question } = this.data;
    question.reply = id;
    this.setData({
      question,
    });
  },

  /**
   * 主观题输入内容
   * @function
   * @param {CustomEvent} e 点击事件参数
   * @returns {void}
   */
  // handleInputConfirm (e) {
  //   const { value } = e.detail;
  //   if (!value) {
  //     return;
  //   }
  //   const { question } = this.data;
  //   question.reply = value;
  //   this.setData({
  //     question,
  //   });
  // },

  /**
   * 切换题目
   * @function
   * @param {TouchEvent} e 点击事件参数
   * @returns {void}
   */
  handleChangePage (e) {
    // 提取判定标志，点击的是向前一页还是向后一页
    const { flag } = e.target.dataset;
    if (!flag) {
      return;
    }

    // 提取当前页数
    const { index: current } = this.data;

    // 更新数据
    this.setData({
      index: current + 1 * flag,
      question: this.allQuestion[current + 1 * flag - 1],
    });
  },

  /**
   * 结束答题
   * @function
   * @param {TouchEvent} e 点击事件参数
   * @returns {void}
   */
  handleEndAnswer () {
    let score = 0;
    score = this.allQuestion.reduce((p, c) => c.reply === c.answer ? p + c.score : 0, 0);
    wx.navigateTo({
      url: `./../../pages/evaluate/main/main?score=${score}`,
    });
  },

});
