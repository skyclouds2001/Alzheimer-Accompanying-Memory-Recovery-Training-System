Page({

  data: {
    btn_list: [
      {
        text: '病情评定',
        url: '/pages/evaluate/evaluate',
      },
      {
        text: '线上问诊',
        url: '/',
      },
    ],
  },
  goTobeiwanglu(){
     wx.navigateTo({
       url: '../bwl/beiwanglu',
     })

  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 0
      });
    }
  },

});
