import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
  /**
   * tab模块组
   */
    tab_list: [
      {
        src1: 'https://s1.ax1x.com/2022/05/14/O6XE34.png',
        text: '完善信息',
        src2: 'https://s1.ax1x.com/2022/05/14/O6vAX9.png',
      },
      {
        src1: 'https://s1.ax1x.com/2022/05/14/O6XVgJ.png',
        text: '录入语音',
        src2: 'https://s1.ax1x.com/2022/05/14/O6vVmR.png',
      },
      {
        src1: 'https://s1.ax1x.com/2022/05/14/O6XZv9.png',
        text: '训练情况',
        src2: 'https://s1.ax1x.com/2022/05/14/O6vk6J.png',
      },
      {
        src1: 'https://s1.ax1x.com/2022/05/14/O6XmuR.png',
        text: '最新诊断',
        src2: 'https://s1.ax1x.com/2022/05/14/O6vZ01.png',
      },
      {
        src1: 'https://s1.ax1x.com/2022/05/15/OR8NbF.png',
        text: 'AD科普',
        src2: 'https://s1.ax1x.com/2022/05/15/ORGka4.png',
      },
      {
        src1: 'https://s1.ax1x.com/2022/05/15/OR8dUJ.png',
        text: '回忆时光',
        src2: 'https://s1.ax1x.com/2022/05/15/ORGAIJ.png',
      },
      

    ],
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

    /**
   * 标记用户是否已登录
   * @type {boolean}
   */
  isLogined: false,

  // 界面跳转
  jumpto:function (event){
    const {index} = event.currentTarget.dataset
    if(this.isLogined){
       switch(index){
         case 0 : wx.navigateTo({url: 'submitinfo/submitinfo'});break;
         case 1 : wx.navigateTo({ url: '#' });break;
         case 2 : wx.navigateTo({ url: '#' });break;
         case 3 : wx.navigateTo({ url: 'latest_diagnosis/report-of-family' });break;
         case 4 : wx.navigateTo({ url: 'adscience/adscience' });break;
         case 5 : wx.navigateTo({ url: 'Recalltime/Recalltime' });break;
       }


  
      
    }else{
      Toast.fail("请先登录")
    }
  },



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
    }else{
      this.setData({
        nickName: '请点击头像登录',
        avatarUrl: '/images/empty-image-default.png'
      });
    }
  },
  

  onShow: function () {
    this.check_userinfo();
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 0,
        kind: 1,
      });
    }
  },

});
