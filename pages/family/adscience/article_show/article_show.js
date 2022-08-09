Page({

  data: {
    title: '',
    text: '',
  },

  onLoad: function () {
    this.getOpenerEventChannel().on('news', res => {
      this.setData({
        title: res.title,
        text: res.content.replaceAll('\\n', '\n'),
      });
      wx.setNavigationBarTitle({
        title: `文章详情-${res.title}`,
      });
    });
  },

});
