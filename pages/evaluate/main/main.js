Page({

  data: {
    /**
     * 最终分数
     * @type {number}
     */
    score: 0,

    /**
     * 最终结果
     * @type {string}
     */
    result: '',

    /**
     * 老人文化水平
     * 默认文化水平一般
     * * `0` 文化水平高
     * * `1` 文化水平一般
     * * `2` 文化水平低
     * @type {number}
     */
    type: 1,

    /**
     * 长谷川问题等级评定标准
     * 基于患者文化水平不同
     * * 文化水平高
     *   * 分值大于30.5正常
     *   * 30.5-24为亚正常
     *   * 23.5-12.5为可疑痴呆
     *   * 12-0为痴呆
     * * 文化水平中等
     *   * 分值大于30.5正常
     *   * 30.5-22为亚正常
     *   * 21.5-10.5为可疑痴呆
     *   * 10-0为痴呆
     * * 文化水平低
     *   * 分值大于28.5正常
     *   * 28-20为亚正常
     *   * 19.5-9.5为可疑痴呆
     *   * 9-0为痴呆
     */
    standard: [],
  },

  onLoad (options) {
    // 提取作答分数及文化水平(默认文化水平一般)
    const { score, type = 1 } = options;

    // 根据文化水平生成等级评定标准
    const standard = [
      32.5,
      [30.5, 30.5, 28.5][type],
      [24, 22, 20][type],
      [12.5, 10.5, 9.5][type],
      0,
    ];

    // 获取文化水平类型
    const level = standard.reduce((p, v) => p + (v > score ? 1 : 0), 0) - 1;
    const result = ['正常', '亚正常', '可疑痴呆', '痴呆'][level];

    this.setData({
      score,
      type,
      standard,
      result,
    });
  },

});
