const alldata = [];

const token = wx.getStorageSync('token');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    text: '',
  },
  onLoad: function (options) {
    // 调用后端接口
    const self = this;
    wx.request({

      url: 'http://www.thylovezj.space/v1/news/get?pageNum=1&pageSize=1',
      method: 'GET',
      header: {
        authorization: token,
      },
      success: function (res) {
        console.log(res.data);
        self.setData({
          alldata: res.data.date.records,
        });
      },
      fail: function (err) {
        console.log(err);
      },
    });
    // options.id是用户点击上一个页面后传回的相应的新闻的id值，根据此展示出相应的新闻
    // console.log(options.id)
    const idmatching = options.id;

    for (let index = 0; idmatching !== alldata[index].id; ++index) {
      this.setData({
        title: this.data.common[index].title,
        text: this.data.common[index].content,
      });
    }
  },

});
