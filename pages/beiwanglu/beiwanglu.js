import { request } from '../../lib/request.js';

Page({
  data: {
    /**
   * 导航栏
   */
    element_list: [{ title: '事项', url: '../beiwanglu/beiwanglu' }, { title: '添加事项', url: 'add_item/add_item' }],
    select_index: 0,

    /**
     * 记录信息
     */
    search_item: [
      {
        title:
          '吃饭',
        time: '5月6日',
        record_id: '0',
      },
      {
        title:
          '睡觉',
        time: '5月6日',
        record_id: '1',
      },
    ],
  },

  /**
   * 搜索模块
   * 当搜索框中有值时发请求
   */
  Timeid: -1,
  /**
   *  input事件
   */

  handdleInput (e) {
    let { value } = e.detail;
    /**
     * 空值返回*显示全部
     * 非空返回value显示符合条件的部分记录
     */

    if (!value.trim()) {
      value = '*';
    }
    // 防止重复请求
    clearTimeout(this.Timeid);
    this.Timeid = setTimeout(() => {
      this.search_info(value);
    }, 1500);
  },

  /**
 *信息申请函数
 * @param {string} querry
 */
  search_info: async function (querry) {
    const openid = wx.getStorageSync('openid');
    try {
      const res = await request({ url: '#', data: { querry, openid } });
      console.log(res);
      /** 修改data */
    } catch (err) {
      console.log(err);
    }
  },

  onLoad: function () {
    /** 请求全部并缓存 */
    this.search_info('*');
  },

});
