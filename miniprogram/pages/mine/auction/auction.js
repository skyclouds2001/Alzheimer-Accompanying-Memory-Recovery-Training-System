/**
 * @typedef {Object} Good
 * @property {number} id 商品id
 * @property {string} title 商品名称
 * @property {string} url 商品图片url
 * @property {number} price 商品积分
 * @property {boolean} isLiked 是否已收藏商品
 */

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
    goodsList: [
      {
        id: 0,
        title: '新鲜土豆',
        url: 'https://img10.360buyimg.com/n1/jfs/t1/197514/10/10565/78064/615426bdE194204e5/0cacfd0720850630.jpg',
        price: 78,
        isLiked: false,
      },
      {
        id: 1,
        title: '新鲜红辣椒',
        url: 'https://img13.360buyimg.com/n1/jfs/t1/86315/7/27859/250515/624e7485E18525e04/c443eefa1decb5c9.jpg',
        price: 96,
        isLiked: false,
      },
      {
        id: 2,
        title: '胡萝卜',
        url: 'https://img12.360buyimg.com/n1/jfs/t1/126556/32/14205/51873/5f796521Efc0677c7/e29fbbfe75afc0fb.jpg',
        price: 34,
        isLiked: false,
      },
      {
        id: 3,
        title: '优质洋葱',
        url: 'https://img11.360buyimg.com/n1/jfs/t1/175321/19/26645/92332/6204b308E70d15059/fb68e7c3fc3bbb01.jpg',
        price: 57,
        isLiked: false,
      },
    ],
  },

  onLoad () {},

  /**
   * 搜索响应
   * @param {Event} e 输入框confirm事件
   */
  handleSearch (e) {
    console.log(e);
    this.setData({
      value: '',
    });
  },

});
