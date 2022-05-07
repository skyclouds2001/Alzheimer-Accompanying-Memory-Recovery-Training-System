Page({

  /**
   * 跳转至音乐治疗页面
   * @function
   * @returns {void}
   */
  handleMusic: function () {
    wx.navigateTo({
      url: './../../pages/apraxia/index/index',
    });
  },

  /**
   * 跳转至手指训练页面
   * @function
   * @returns {void}
   */
  handleSports: function () {
    wx.navigateTo({
      url: './../../pages/apraxia/sports/sports',
    });
  },

});
