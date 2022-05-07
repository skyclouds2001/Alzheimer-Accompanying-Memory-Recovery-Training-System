import question from './../../data/question.js';

Page({
  data: {
    /**
     * 当前问题
     * @type {{}}
     */
    question: {},
    /**
     * 当前答题进度下标 1~13 14
     * * 1~13 答题中
     * * 14 答题完成&显示分数
     * @type {number}
     */
    index: 0,
  },

  onLoad: function () {
    // 初始化问题数据
    const current = 1;
    this.setData({
      question: question[current - 1],
      index: current,
    });
  },

  /**
   * 客观题选择选项响应
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
    question.answer = id;
    this.setData({
      question,
    });
  },

  /**
   * 主观题输入内容确认响应
   * @function
   * @param {CustomEvent} e 点击事件参数
   * @returns {void}
   */
  handleInputConfirm (e) {
    const { value } = e.detail;
    if (!value) {
      return;
    }
    const { question } = this.data;
    question.answer = value;
    this.setData({
      question,
    });
  },

  /**
   * 切换题目点击响应
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
      question: question[current + 1 * flag - 1],
    });
  },

});
