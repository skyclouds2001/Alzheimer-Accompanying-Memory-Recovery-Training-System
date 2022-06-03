// pages/recall_mode/recall_mode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item_list: [{ text: '备忘录', url: 'https://s1.ax1x.com/2022/05/24/XPUmpn.jpg', path: '../bwl/beiwanglu' },
      { text: '回忆相册', url: 'https://s1.ax1x.com/2022/05/24/XPUZfs.png', path: '../family/Recalltime/Recalltime' }],
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 3,
      });
    }
  },

});
