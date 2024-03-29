import Toast from '@vant/weapp/toast/toast';

Page({

  data: {
    element_list: [
      { title: '首页', url: '../family/family' },
      { title: '账户', url: '../zhanghu/zhanghu' },
    ],
    select_index: 0,

    /**
     * tab模块组
     */
    tab_list: [
      {
        src1: 'https://s1.ax1x.com/2022/05/14/O6XE34.png',
        text: '完善信息',
        src2: 'https://s1.ax1x.com/2022/05/14/O6vAX9.png',
        url: './submitinfo/submitinfo',
      },
      {
        src1: 'https://s1.ax1x.com/2022/05/14/O6XVgJ.png',
        text: '录入语音',
        src2: 'https://s1.ax1x.com/2022/05/14/O6vVmR.png',
        url: './voice/voice',
      },
      {
        src1: 'https://s1.ax1x.com/2022/05/14/O6XZv9.png',
        text: '训练情况',
        src2: 'https://s1.ax1x.com/2022/05/14/O6vk6J.png',
        url: './train-record/train-record',
      },
      {
        src1: 'https://s1.ax1x.com/2022/05/14/O6XmuR.png',
        text: '最新诊断',
        src2: 'https://s1.ax1x.com/2022/05/14/O6vZ01.png',
        url: './latest_diagnosis/report-of-family',
      },
      {
        src1: 'https://s1.ax1x.com/2022/05/15/OR8NbF.png',
        text: 'AD科普',
        src2: 'https://s1.ax1x.com/2022/05/15/ORGka4.png',
        url: './adscience/adscience',
      },
      {
        src1: 'https://s1.ax1x.com/2022/05/15/OR8dUJ.png',
        text: '回忆时光',
        src2: 'https://s1.ax1x.com/2022/05/15/ORGAIJ.png',
        url: './Recalltime/Recalltime',
      },
    ],

    /**
     * 用户昵称
     */
    nickName: '请点击头像登录',

    /**
     * 用户头像url
     */
    avatarUrl: '/images/empty-image-default.png',
  },

  /**
   * 标记用户是否已登录
   */
  isLogined: false,

  onLoad: async function () {
    // 从存储提取用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};

    // 判断是否已存在信息，是则设置数据并更新
    if (JSON.stringify(userInfo) !== '{}') {
      this.setData({
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
      });
      this.isLogined = true;
    }
  },

  async onGetUserProfile () {
    // 判断用户是否已获取微信头像与昵称
    if (this.isLogined) return;

    try {
      // 请求获取用户信息
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

});
