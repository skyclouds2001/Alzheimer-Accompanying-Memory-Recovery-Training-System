import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';

const openid = wx.getStorageSync('openid');

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
     * 标记显示popup与否
     * @type {boolean}
     */
    show: false,

    /**
     * 积分数量
     * @type {number}
     */
    credit: 123,

    /**
     * 二维码显示字符串信息
     */
    qrTxt: openid,

    /**
     * 标记患者是否已绑定子女
     */
    linked: false,

    /**
     * 标记是否显示二维码
     */
    showQRcode: false,
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
    if (JSON.stringify(userInfo) !== '{}') {
      this.setData({
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
      });
      this.isLogined = true;
    }
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 2,
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
      title: '提示',
      message: '确认退出登录？',
      zIndex: 999999,
      closeOnClickOverlay: true,
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
   * 绑定患者端及子女端
   * 显示二维码
   */
  handleBind () {
    this.setData({
      showQRcode: true,
    });
  },

  /**
   * 绑定患者端及子女端
   * 显示二维码
   */
  handleClose () {
    this.setData({
      showQRcode: false,
    });
  },

});
