import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';
import { request } from '../../lib/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  /**
   * 导航栏
   */
    element_list: [{ title: '首页', url: '../family/family' }, { title: '账户', url: '../zhanghu/zhanghu' }],
    select_index: 1,

    Length: 4, // 输入框个数
    isFocus: false, // 聚焦
    Value: '', // 输入的内容
    ispassword: false, // 是否密文显示 true为密文， false为明文。

    show: false,

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

  },

  /** 返回主页**/
  quit () {
    wx.reLaunch({
      url: '../index/index',
    });
  },
  /**
   * 标记用户是否已登录
   * @type {boolean}
   */
  isLogined: false,

  async onGetUserProfile () {
    // 判断用户是否已获取微信头像与昵称
    if (this.isLogined) {
      return;
    }

    try {
      // 调用wx接口获取用户信息
      const { userInfo } = await wx.getUserProfile({
        desc: '请授权我们使用您的个人信息',
        lang: 'zh_CN',
      });

      // data设置用户信息
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

      // 更新已登录状态
      this.isLogined = true;
    } catch (err) {
      // 显示授权失败提示
      Toast.fail('授权失败');
    }
  },
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
  },
  handleOpenPopup (event) {
    if (!this.isLogined) {
      Toast.fail('请先登录');
      return;
    }
    const { id } = event.target.dataset;
    switch (id) {
      case 1: wx.navigateTo({ url: '/pages/mine/patient-info/patient-info' }); break;
      case 2:wx.navigateTo({ url: 'vip_page/vip_page' }); break;
      case 3: this.setData({ show: true }); break;
      case 4: wx.navigateTo({ url: 'help/help' }); break;
      case 5: this.quitload(); break;
    }
  },

  check () {
    const { Value } = this.data;
    if (Value === 'abcd') {
      Toast.success('开通成功');
    } else {
      Toast.fail('兑换码错误');
    }
    setTimeout(this.cancel, 2000);
  },
  clear () {
    this.setData({
      isFocus: false,
      Value: '',
    });
  },
  cancel () {
    this.setData({
      show: false,
    });
  },

  Focus (e) {
    const that = this;
    console.log(e.detail.value);
    const inputValue = e.detail.value;
    that.setData({
      Value: inputValue,
    });
  },
  Tap () {
    const that = this;
    that.setData({
      isFocus: true,
    });
  },

  //  确认退出函数
  quitload () {
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
  /**
   * 扫码并绑定
   */
  scanCode: async function () {
    try {
      const openIdofElder = await new Promise((resolve, reject) => {
        wx.scanCode({
          success: (res) => {
            resolve(res);
          },
          fail: (err) => {
            reject(err);
          },
        });
      });
      console.log(openIdofElder.result);
      this.bindwith(openIdofElder.result);
    } catch (err) { Toast.fail('扫码失败'); }
  },
  /**
   *发送绑定请求
   */
  bindwith: function (openIdofElder) {
    const token = wx.getStorageSync('token');
    const p = request({ url: '/v1/patient/bind', method: 'POST', header: { 'authorization': token , 'content-type': 'application/x-www-form-urlencoded'}, data: { openId: openIdofElder } });
    p.then(() => { Toast.success('绑定成功'); }, () => { Toast.fail('绑定失败'); });
  },
  /**
   * 检测用户信息是否在缓存中
   */
  check_userinfo: async function () {
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
    } else {
      this.setData({
        nickName: '请点击头像登录',
        avatarUrl: '/images/empty-image-default.png',
      });
      this.isLogined = false;
    }
  },

  onShow: function () {
    this.check_userinfo();
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 1,
        kind: 1,
      });
    }
  },

});
