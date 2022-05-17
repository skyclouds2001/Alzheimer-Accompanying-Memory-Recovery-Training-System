// pages/zhanghu/zhanghu.js
Page({

  /**
   * 页面的初始数据
   */
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

  },
  

   /**返回主页**/
   quit(){
     wx.reLaunch({
       url: '../index/index',
     })
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
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 1,
        kind: 1,
      });
    }
  },

  
})