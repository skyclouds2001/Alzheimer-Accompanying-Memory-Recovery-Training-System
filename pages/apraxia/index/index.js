/**
 * @typedef timestamp
 * @type {number}
 */
/**
 * @typedef Song
 * @type {Object}
 * @property {string} alg
 * @property {boolean} canDislike
 * @property {string} copywriter
 * @property {boolean} highQuality
 * @property {number} id
 * @property {string} name
 * @property {string} picUrl
 * @property {number} playCount
 * @property {number} trackCount
 * @property {timestamp} trackNumberUpdateTime
 * @property {number} type
 */

Page({

  data: {
    /**
     * 歌曲列表
     * @type {Song[]}
     */
    array: [],
  },

  onLoad: function () {
    const that = this;
    wx.request({
      url: 'https://api.xaneon.com/personalized',
      header: {
        'content-type': 'application/json', // 默认值
      },
      success (res) {
        that.setData({
          // 默认选取前9个歌单
          array: res.data.result.slice(0, 9),
        });
      },
    });
  },

  /**
   * 跳转至歌曲详情页
   * @function
   * @param {Event} e
   * @returns {void}
   */
  handleItem (e) {
    const { id } = e.currentTarget.dataset;
    const app = getApp();
    app.globalData.id = id;
    wx.navigateTo({
      url: `../list/list?listid=${id}`,
    });
  },

  /**
   * 跳转至我的喜欢歌曲页
   * @function
   * @returns {void}
   */
  handleMySongs: function () {
    wx.navigateTo({
      url: '../mysong/mysong',
    });
  },

});