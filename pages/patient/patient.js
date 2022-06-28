Page({

  data: {
    btn_list: [
      {
        text: '病情评定',
        url: '/pages/evaluate/init/init',
      },
      {
        text: '线上问诊',
        url: './consultation/consultation',
      },
    ],
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 0,
      });
    }
  },

});
