import { request } from '../../../lib/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
   * 导航栏
   */
    element_list: [{ title: '事项', url: '../../bwl/beiwanglu' }, { title: '添加事项', url: 'add_item/add_item' }],
    select_index: 1,
  },
  /**
   * 绑定提交事件
   * @param {e} event
   */
  handdleSubmit (event) {
    const { title, content } = event.detail.value;
    this.send_info({ title, content });
    wx.redirectTo({
      url: '../beiwanglu',
    });
  },

  /**
   * 发送数据到后台
   * @param {obj} param
   */
  send_info: function (param) {
    const token = wx.getStorageSync('token')
    const p = request({ url: '/v1/memorandum/add', data: param, method: 'POST',header: { 'authorization': token } });
    p.catch((err) => { console.log(err); });
  },
});
