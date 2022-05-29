Page({

  data: {
    btn_list: [
      {
        text: '失认症训练',
        url: '/pages/agnosia/agnosia',
      },
      {
        text: '失用症训练',
        url: '/pages/apraxia/apraxia',
      },
    ],
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 1,
      });
    }
  },

});
