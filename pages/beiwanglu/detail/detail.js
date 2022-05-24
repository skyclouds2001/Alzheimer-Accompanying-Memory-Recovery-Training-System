import { request } from '../../../lib/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: 'gaofeifeifeifei',
    time: '',
    title: '',
    recordid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const options = currentPage.options;
    console.log(options);
    const { recordid, time, title } = options;
    this.getDetail(recordid);
    this.setData({ time, title, recordid });
  },
  /**
   * 通过recordid和openid获取记录详情
   * @param {String} recordid
   */
  getDetail: async function (recordid) {
    const openid = wx.getStorageSync('openid');
    try {
      const content = await request({ url: '/#', data: { openid, recordid } });
      this.setData({ content });
    } catch (err) {
      console.log(err);
    }
  },
  /**
   * 用openid和recoedid删除记录
   */
  delitem () {
    const openid = wx.getStorageSync('openid');
    const recordid = this.data.recordid;
    const p = request({ url: '/#', data: { openid, recordid } });
    p.catch(
      (err) => { console.log(err); },
    );
    wx.redirectTo({ url: '../beiwanglu' });
  },
});
