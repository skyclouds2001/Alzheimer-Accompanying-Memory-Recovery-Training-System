import { request } from '../../../lib/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
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
    const timeformat = time.slice(0, 10);
    this.setData({ time: timeformat, title, recordid });
  },
  /**
   * 通过recordid和openid获取记录详情
   * @param {String} recordid
   */
  getDetail: async function (recordid) {
    try {
      const token = wx.getStorageSync('token');
      const id = Number(recordid);
      const res = await request({ url: `/v1/memorandum//get/detail/${id}`, header: { authorization: token } });
      console.log(res);
      const { data } = res.data;
      this.setData({ content: data[0].content });
    } catch (err) {
      console.log(err);
    }
  },
  /**
   * 用openid和recoedid删除记录
   */
  delitem () {
    const token = wx.getStorageSync('token');
    const recordid = this.data.recordid;
    const id = Number(recordid);
    const p = request({ url: `/v1/memorandum/delete/${id}`, header: { authorization: token }, method: 'POST' });
    p.catch(
      (err) => { console.log(err); },
    );
    wx.redirectTo({ url: '../beiwanglu' });
  },
});
