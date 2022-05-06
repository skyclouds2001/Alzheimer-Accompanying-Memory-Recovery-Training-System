Page({

  data: {
    /**
     * 最终分数
     * @type {number}
     * @default 0
     */
    score: 0,
    /**
     * 最终结果
     * @type {string}
     * @default ''
     */
    result: '',
    /**
     * 老人文化水平
     * * `0` 文化水平高
     * * `1` 文化水平一般
     * * `2` 文化水平低
     * @type {number}
     * @default 1
     */
    type: 1,
  },

  onLoad (options) {
    const { score, type = 1 } = options;
    const result = this.getHDSresult(score, type);
    this.setData({
      score,
      type,
      result,
    });
  },

  /**
   * 根据分数返回HDS的判定结果
   * @function
   * @param {number} score 分数
   * @param {0 | 1 | 2} type 老人文化水平
   * @returns {string} 判定结果
   */
  getHDSresult (score, type = 1) {
    let res = '';
    if (score > [30.5, 30.5, 28.5][type]) {
      res = '正常';
    } else if (score > [24, 22, 20][type]) {
      res = '亚正常';
    } else if (score > [12.5, 10.5, 9.5][type]) {
      res = '可疑痴呆';
    } else {
      res = '痴呆';
    }
    return res;
  },

});
