import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';

// import { request } from './../../lib/request.js';

/**
 * @typedef {Object} Info
 * @property {string} name 姓名
 * @property {string} gender 性别
 * @property {number} age 年龄
 * @property {string} location 家庭住址
 * @property {string} birthSite 出生省份
 * @property {string} educate 文化水平
 */

/**
 * @typedef {Object} Day
 * @property {Date} date 日期对应的Date对象
 * @property {string} type 日期类型
 * @property {string} text 中间显示的文字
 * @property {string} topInfo 上方的提示信息
 * @property {string} bottomInfo 下方的提示信息
 * @property {string} className 自定义 className
 */
/**
 * @typedef {number} timestamp
 */

/**
 * @typedef {Object} Good
 * @property {number} credit 商品积分
 * @property {string} title 商品名称
 * @property {string} desc 商品描述
 * @property {URL} url 商品图片链接
 * @property {number} id 商品id
 */

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
     * * 0 无
     * * 1 个人信息
     * * 2 打卡记录
     * * 3 训练记录
     * * 4 我的积分
     * * 5 积分商城
     * * 6 问题反馈
     * * 7 关于我们
     * * 8 退出登录
     * @type {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}
     */
    show: 0,

    /**
     * 个人信息
     * `show=1`
     * @type {Info}
     */
    personInfo: {
      name: '未知',
      gender: '男',
      age: 74,
      location: '陕西省西安市长安区北雷村12号',
      birthSite: '陕西省',
      educate: '初中',
    },

    /**
     * 打卡天数
     * `show=2`
     * @type {number}
     */
    clockDays: 0,

    /**
     * 日历的时间范围-起始日期
     * `show=2`
     * @type {timestamp}
     */
    minDate: new Date().getTime(),
    /**
     * 日历的时间范围-结束日期
     * `show=2`
     * @type {timestamp}
     */
    maxDate: new Date().getTime(),
    /**
     * 负责对日历进行初始化的函数方法
     * `show=2`
     * @function
     * @param {Day} day
     * @returns {Day}
     */
    formatter: function (day) {
      if (day.date.getDate() === 1) {
        day.bottomInfo = ' ';
        day.type = 'selected';
        day.className = 'select';
      } else {
        day.type = '';
      }
      return day;
    },

    /**
     * 训练记录
     * `show=3`
     * @type {Logs[]}
     */
    record: [
      {
        date: '2022-03-12',
        logs: [
          {
            time: '12:23:54',
            content: '例子',
          },
          {
            time: '23:47:51',
            content: '例子',
          },
        ],
      },
    ],

    /**
     * 积分数量
     * `show=4`
     * @type {number}
     */
    credit: 123,

    /**
     * 商品列表
     * `show=5`
     * @type {Good}
     */
    goods: [
      {
        credit: 23.99,
        title: '商品名称',
        desc: '商品描述',
        url: '/images/key.png',
        id: 0,
      },
      {
        credit: 126.99,
        title: '商品名称',
        desc: '商品描述',
        url: '/images/match.png',
        id: 1,
      },
    ],

    /**
     * 跟踪问题反馈 textarea 输入内容
     * `show=6`
     * @type {string}
     */
    feedback: '',
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
    });

    // 获取用户已打卡次数及已打卡日期
    // const res = await request({
    //   url: '',
    //   method: 'GET',
    //   data: {},
    //   header: {},
    // });
    // console.log(res);
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
    if ([1, 4, 5, 6, 7].includes(id)) {
      // 检测是否已登录
      if (!this.isLogined) {
        return Toast('请先登录！');
      }
      // 显示对应弹窗
      this.setData({
        show: id,
      });
    } else if (id === 8) {
      // 弹出退出登录确认模态框
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

  /**
   * 提交问题反馈内容
   */
  async handleFeedback () {
    // const { feedback } = this.data;
    // const res = await request({
    //   url: '',
    //   method: '',
    //   data: {
    //     feedback,
    //   },
    //   header: {},
    // });
    // console.log(res);
    this.setData({
      feedback: '',
    });
  },

});
