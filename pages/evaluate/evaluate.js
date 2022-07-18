import { getHasegawaQuestion } from './../../api/question';

import Toast from '@vant/weapp/toast/toast';

import Dialog from '@vant/weapp/dialog/dialog';

/**
 * @typedef {Object} Question
 * @property {number} type 问题类型
 * * 1 客观题
 * * 2 主观题
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
    const token = wx.getStorageSync('token');
    try {
      // 请求获取问题和选项
      const res = await getHasegawaQuestion(token);

      // 预处理问题（选项）及保存问题内容
      res.forEach((v) => {
        v.checks = v.checks ? v.checks.slice(1, -1).split(',').map(v => v.split('.')) : null;
        v.reply = 0;
      });
      /** 根据问题类型做初始化操作 */
      this.allQuestion = res;

      // 初始化问题数据
      const current = 1;
      this.setData({
        index: current,
        question: this.allQuestion[current - 1],
        length: this.allQuestion.length,
      });
    } catch (err) {
      console.error(err);
      Toast.fail('网络异常');
    }
  },

  /**
   * 客观题选择选项
   * @param {TouchEvent} e 点击事件参数
   */
  handleChooseAnswer (e) {
    // 提取当前点击选项
    const { id } = e.target.dataset;

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
  handleInputConfirm (e) {
    const { value } = e.detail;

    const { question } = this.data;
    question.reply = value;
    this.setData({
      question,
    });
  },

  /**
   * 切换题目
   * @param {TouchEvent} e 点击事件参数
   */
  handleChangePage (e) {
    // 提取判定标志，点击的是向前一页还是向后一页
    const { flag } = e.target.dataset;

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
   * @param {TouchEvent} e 点击事件参数
   */
  handleEndAnswer () {
    Dialog.confirm({
      title: '提示',
      message: '确认结束答题？',
    }).then(() => {
      const score = this.allQuestion.reduce(
        (pre, cur) => (cur.reply === cur.answer ? pre + cur.score : 0),
        0,
      );
      wx.navigateTo({
        url: `./../../pages/evaluate/main/main?score=${score}`,
      });
    }).catch(() => {});
  },

});
