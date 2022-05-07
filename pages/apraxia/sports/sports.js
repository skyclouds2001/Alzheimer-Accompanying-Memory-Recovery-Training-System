Page({

  data: {
    /**
     * 训练按钮文案
     * @type {string[]}
     */
    train_text: ['恢复训练一', '恢复训练二', '恢复训练三', '恢复训练四'],
  },

  /**
   * 跳转至相应的训练页面
   * @function
   * @param {Event} e
   * @returns {void}
   */
  handleClick: function (e) {
    const { index } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `./../../../pages/apraxia/vedio/vedio?id=${index}`,
    });
  },

});
