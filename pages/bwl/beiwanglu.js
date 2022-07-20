import Toast from '@vant/weapp/toast/toast';

import { getSimpleMemorandum } from './../../api/memorandum';

const token = wx.getStorageSync('token');

Page({
  data: {
    /** 备忘录记录 */
    search_item: [],
  },

  onLoad: async function () {
    try {
      const res = await getSimpleMemorandum(token);
      this.setData({
        search_item: res,
      });
    } catch (err) {
      console.log(err);
      Toast.fail('网络异常');
    }
  },

  /**
   * 点击添加事项跳转至相应页面
   */
  handleNavigate () {
    wx.navigateTo({
      url: './../../pages/bwl/add_item/add_item',
    });
  },

  /**
   * 搜索模块()
   * 当搜索框中有值时发请求
   */
  // Timeid: -1,
  /**
   *  input事件
   */

  // handdleInput (e) {
  //   let { value } = e.detail;
  //   /**
  //    * 空值返回*显示全部
  //    * 非空返回value显示符合条件的部分记录
  //    */

  //   if (!value.trim()) {
  //     value = '*';
  //   }
  //   // 防止重复请求
  //   clearTimeout(this.Timeid);
  //   this.Timeid = setTimeout(() => {
  //     this.search_info(value);
  //   }, 1500);
  // },

});
