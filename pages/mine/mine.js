import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';

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
     * 标记显示popup与否及其下标
     * @type {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}
     */
    show: 0,
  },

  /**
   * 标记用户是否已登录
   * @type {boolean}
   */
  isLogined: false,

  onLoad () {
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

  /**
   * 处理用户登录换取用户微信头像及微信昵称
   * @returns {Promise<void>}
   */
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

  /**
   * 点击菜单列表
   * 显示对应的popup
   * @param {TouchEvent} e 触摸事件
   */
  handleOpenPopup (e) {
    const { id } = e.target.dataset;
    if ([1, 2, 3, 4, 5, 6, 7].includes(id)) {
      this.setData({
        show: id,
      });
    } else if (id === 8) {
      // 弹出退出登录确认模态框
      Dialog.confirm({
        message: '是否确认退出登录？',
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
    }
  },

  /**
   * 关闭popup事件
   */
  handleClosePopup () {
    this.setData({
      show: 0,
    });
  },

});
