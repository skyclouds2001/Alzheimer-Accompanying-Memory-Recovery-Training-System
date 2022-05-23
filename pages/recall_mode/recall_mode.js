// pages/recall_mode/recall_mode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 3,
      });
    }
  }




})