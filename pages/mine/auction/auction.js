/**
 * @typedef {Object} Good
 * @property {number} id 商品id
 * @property {string} title 商品名称
 * @property {string} url 商品图片url
 * @property {number} price 商品积分
 * @property {boolean} isLiked 是否已收藏商品
 */

import { goods } from './../../../data/auctiongoods';

Page({

  data: {
    /**
     * 输入框值
     * @type {string}
     */
    value: '',

    /**
     * 商品列表
     */
    goodsList: [],
  },

  onLoad () {
    this.setData({
      goodsList: goods,
    });
  },

  /**
   * 搜索响应
   * @param {Event} e 输入框confirm事件
   */
  handleSearch (e) {
    const keywords = e.detail;
    this.setData({
      value: '',
      goodsList: goods.filter(v => v.title.match(keywords)),
    });
  },

});
