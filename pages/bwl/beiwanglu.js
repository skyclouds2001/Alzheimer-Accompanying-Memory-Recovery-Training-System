import Toast from '@vant/weapp/toast/toast';

import { getSimpleMemorandum, getSearchMemorandum } from './../../api/memorandum';

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
      console.error(err);
      Toast.fail('网络异常');
    }
  },

  /**
   * 点击添加事项跳转至相应页面
   */
  handleNavigateAdd () {
    wx.navigateTo({
      url: './../../pages/bwl/add_item/add_item',
      events: {
        onAddItem: async function () {
          try {
            const res = await getSimpleMemorandum(token);
            this.setData({
              search_item: res,
            });
          } catch (err) {
            console.error(err);
            Toast.fail('网络异常');
          }
        },
      },
    });
  },

  /**
   * 点击查看事项详情跳转至相应页面
   * @param {TouchEvent} e 点击按钮事件
   */
  handleNavigateDetail (e) {
    const { id, time, title } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `./../../pages/bwl/detail/detail?id=${id}&time=${time}&title=${title}`,
      events: {
        onRemoveItem: async function () {
          try {
            const res = await getSimpleMemorandum(token);
            this.setData({
              search_item: res,
            });
          } catch (err) {
            console.error(err);
            Toast.fail('网络异常');
          }
        },
      },
    });
  },

  /**
   * 搜索模块()
   * 当搜索框中有值时发请求
   */
  timerID: -1,

  /**
   *  输入响应事件
   */
  handleInput (e) {
    const { value } = e.detail;
    console.log(value);

    // 节流-防止重复请求
    clearTimeout(this.timerID);
    this.timerID = setTimeout(async () => {
      // todo 该接口异常
      const res = await getSearchMemorandum(token, value.trim());
      console.log(res);
    }, 2000);
  },

});
