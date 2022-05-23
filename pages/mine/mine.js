import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';

// import { request } from './../../lib/request.js';

Page({

  data: {
    /**
     * 用户昵称
     * @type {string}
     */
    nickName: '请点击头像登录',

    /**
     * 用户头像url
     * @type {string}
     */
    avatarUrl: '/images/empty-image-default.png',

    /**
     * 标记显示积分统计页面
     * @type {boolean}
     */
    show: false,

    /**
     * 积分
     * @type {number}
     */
    credit: 123,

    /**
     * 二维码显示字符串信息
     */
    qrTxt: 'wx-qr',
  },

  /**
   * 标记用户是否已登录
   * @type {boolean}
   */
  isLogined: false,

  onLoad: async function () {
    // 从存储提取用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};

    // 判断是否已存在信息
    // 设置数据并更新
    if ('nickName' in userInfo && 'avatarUrl' in userInfo) {
      this.setData({
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
      });
      this.isLogined = true;
    }

    // 当天的日期
    const date = new Date();
    // 当天的年份、月份、日份
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = new Date(year, month + 1, 0).getDate();

    // 设置日历时间范围，默认为所在月份的第一天与最后一天
    this.setData({
      minDate: new Date(year, month, 1).getTime(),
      maxDate: new Date(year, month, day).getTime(),
      credit: 123,
    });
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 2,
        kind: 0,
      });
    }
  },

  /**
   * 处理用户登录换取用户微信头像及微信昵称
   */
  async handleGetUserProfile () {
    // 判断用户是否已获取微信头像与昵称
    if (this.isLogined) {
      return;
    }

    try {
      // 调用wx接口获取用户信息
      const { userInfo } = await wx.getUserProfile({
        desc: '请授权我们使用您的昵称及头像',
        lang: 'zh_CN',
      });

      // 设置用户信息
      this.setData({
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
      });

      // 显示授权成功提示
      Toast.success('授权成功');

      // 保存用户信息到存储内
      wx.setStorageSync('userInfo', {
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
      });

      // 更新登录状态
      this.isLogined = true;
    } catch (err) {
      // 显示授权失败提示
      Toast.fail('授权失败');
    }
  },

  /**
   * 显示积分页面
   */
  handleOpenCredit () {
    this.setData({
      show: true,
    });
  },

  /**
   * 关闭积分页面
   */
  handleCloseCredit () {
    this.setData({
      show: false,
    });
  },

  /**
   * 退出登录
   */
  handleExitLogin () {
    Dialog.confirm({
      message: '确认退出登录？',
    }).then(() => {
      // 确认退出，清空个人信息
      this.isLogined = false;
      this.setData({
        avatarUrl: '/images/empty-image-default.png',
        nickName: '请点击头像登录',
      });
      wx.removeStorageSync('userInfo');
    }).catch(() => {
      // 取消退出，无额外操作
    });
  },

});
