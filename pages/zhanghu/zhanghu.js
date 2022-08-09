import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';

import { bindRelation } from './../../api/patient';

const token = wx.getStorageSync('token');

Page({

  data: {
    /** 导航栏 */
    element_list: [{ title: '首页', url: '../family/family' }, { title: '账户', url: '../zhanghu/zhanghu' }],
    select_index: 1,

    isFocus: false, // 聚焦
    value: '', // 输入的内容
    ispassword: false, // 是否密文显示 true为密文， false为明文。

    show: false,

    /**
     * 用户昵称
     */
    nickName: '请点击头像登录',

    /**
     * 用户头像url
     */
    avatarUrl: '/images/empty-image-default.png',

  },

  onLoad: async function () {
    // 提取用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};

    // 判断是否已存在信息
    // 是则设置数据并更新
    if ('nickName' in userInfo && 'avatarUrl' in userInfo) {
      this.setData({
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
      });
      this.isLogined = true;
    }
  },

  /**
   * 扫码并绑定病患openid
   */
  handleScanCode: async function () {
    try {
      const res = await wx.scanCode();
      try {
        const openid = res.result;
        await bindRelation(token, openid);
        wx.setStorageSync('patient-id', openid);
      } catch (err) {
        console.error(err);
        Toast.fail('绑定失败');
      }
    } catch (err) {
      console.error(err);
      Toast.fail('扫码失败');
    }
  },

  /** 标记用户是否已登录 */
  isLogined: false,

  /**
   * 请求获取用户头像及昵称
   */
  async onGetUserProfile () {
    // 判断用户是否已获取微信头像与昵称
    if (this.isLogined) return;

    try {
      // 获取用户信息
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

  /**
   * cellGroup点击跳转
   * @param {TouchEvent} e
   */
  handleOpenPopup (e) {
    const { id } = e.target.dataset;
    switch (id) {
      case 1:
        wx.navigateTo({
          url: './detail_info/detail_info',
        });
        break;
      case 2:
        wx.navigateTo({
          url: './vip_page/vip_page',
        });
        break;
      case 3:
        this.setData({
          show: true,
        });
        break;
      case 4:
        wx.navigateTo({
          url: './help/help',
        });
        break;
      case 5:
        this.quitload();
        break;
    }
  },

  confirmInput () {
    const { value } = this.data;
    if (value === 'abcd') {
      Toast.success('开通成功');
    } else {
      Toast.fail('兑换码错误');
    }
    setTimeout(() => this.setData({
      show: false,
    }), 2000);
  },

  cancelInput () {
    this.setData({
      show: false,
    });
  },

  clear () {
    this.setData({
      isFocus: false,
      value: '',
    });
  },

  focus (e) {
    this.setData({
      value: e.detail.value,
    });
  },

  tap () {
    this.setData({
      isFocus: true,
    });
  },

  /**
   * 确认退出
   */
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

});
