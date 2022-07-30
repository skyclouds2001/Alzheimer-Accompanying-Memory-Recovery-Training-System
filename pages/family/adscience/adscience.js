import { request } from '../../../lib/request';
/** 存新闻标题，简介...的数组 */
const alldata = [];
/** 存新闻的总条数 */
let newsquantity = 0;
// 为了解决未“登录”的问题
const token = wx.getStorageSync('token');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 首页展示新闻列表 */
    newslist: [],

    loadfail: false,

  },
  gotodetail: function (e) {
    // 需携带data-id的数据
    const id = e.currentTarget.dataset.id;
    // 需携带新闻ID进行页面跳转
    wx.navigateTo({
      url: '/pages/family/adscience/article_show/article_show?id=' + id,
    });
    // console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    // 调用后端接口
    // const self = this;
    const p1 = request({
      url: '/v1/news/get?pageNum=1&pageSize=999',
      method: 'GET',
      header: {
        // 为了解决未“登录”的问题
        authorization: token,
      },

    });
    p1.then((res) => {
      console.log(res.data);
      newsquantity = res.data.data.records.length;
      // 把需要的后端的数据依次赋值到alldata上
      for (let index = 0; index < newsquantity; index++) {
        alldata[index] = res.data.data.records[index];
      }

      console.log('alldata的值');
      console.log(alldata);
      console.log('alldata.length的长度');
      console.log(newsquantity);
    }, (err) => { console.error(err); });

    // 首页渲染展示新闻列表，加个延时是因为后端数据获取要一段时间，而微信会直接先读取下面的代码，导致页面无法正常显示（不知道为啥微信有时没按代码从上到下的顺序检索）
    setTimeout(() => {
      for (let index = 0; index < newsquantity; index++) {
        this.setData({
          newslist: [{
            id: alldata[index].id,
            title: alldata[index].title,
            maincontent: alldata[index].introduction,
            poster: alldata[index].pic, // 照片
          }],
        });
      }
    });

    // 首页渲染展示新闻列表，加个延时是因为后端数据获取要一段时间，而微信会直接先读取下面的代码，导致页面无法正常显示（不知道为啥微信有时没按代码从上到下的顺序检索）
    setTimeout(() => {
      for (let index = 0; index < 1; index++) {
        this.setData({
          newslist: [
            //   {
            //   id:alldata[index].id,
            //   title:alldata[index].title,
            //   maincontent:alldata[index].introduction,
            //   poster:alldata[index].pic   //照片
            // },
            {
              id: alldata[0].id,
              title: alldata[0].title,
              maincontent: alldata[0].introduction,
              poster: alldata[0].pic, // 照片
            },
            {
              id: alldata[1].id,
              title: alldata[1].title,
              maincontent: alldata[1].introduction,
              poster: alldata[1].pic, // 照片
            },
            {
              id: alldata[2].id,
              title: alldata[2].title,
              maincontent: alldata[2].introduction,
              poster: alldata[2].pic, // 照片
            },
          ],
        });
      }
    }, 1000);

    // 看是否获取到了后端数据，如果没有，则页面显示网络错误
    setTimeout(() => {
      if (newsquantity === 0) { this.setData({ loadfail: true }); }
    }, 3000);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {

  },
});
