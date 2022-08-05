import Toast from '@vant/weapp/toast/toast';

import { getNews } from './../../../api/news';

const token = wx.getStorageSync('token');

Page({

  data: {
    /** 新闻列表 */
    newslist: [],
  },

  onLoad: async function () {
    try {
      Toast.loading({
        message: '加载中',
        duration: 0,
        mask: true,
        forbidClick: true,
      });
      const res = await getNews(token, 1, 10);
      console.log(res);

      this.setData({
        newslist: res.records,
      });
      setTimeout(() => Toast.clear(), 500);
    } catch (err) {
      console.error(err);
      Toast.fail('网络异常！');
    }
  },

  onReachBottom () {},

  handleOpenArticleInfo (e) {
    const { id } = e.currentTarget.dataset;
    const { newslist: news } = this.data;
    const cnew = news.find(v => v.id === id);

    wx.navigateTo({
      url: './article_show/article_show',
      success: function (res) {
        res.eventChannel.emit('news', cnew);
      },
    });
  },

});
