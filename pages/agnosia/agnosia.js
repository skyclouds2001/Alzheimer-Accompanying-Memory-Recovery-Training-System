import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';

import { getQuestion } from './../../api/question';

import { request } from '../../lib/request';

const token = wx.getStorageSync('token');

// 答完题播放音频
const audioRefEnding = wx.createInnerAudioContext();
// 点击按钮音频
const audioRefRadio = wx.createInnerAudioContext();
// 错误音效
const audioRefFalse = wx.createInnerAudioContext();
// 成功音效
const audioRefTrue = wx.createInnerAudioContext();

Page({

  data: {
    /** 标记当前是否正在加载资源 */
    isloading: true,

    isdisable: true,

    /** 答题阶段 | 结束阶段 */
    condition: true,

    // 弹出框显示
    show: false,
    judge: '正确',
    // 按钮文字
    submit_text: '下一题',
    // 题目组索引
    index: 0,
    // 问题对象
    question_obj: [],

    // 成绩
    score: 0,
    radio: -1,
    // 结尾音频地址
    audio_src:
      'http://aimg8.dlszyht.net.cn/ueditor/file/823/1644869/1553422829215244.mp3',
  },

  onLoad: function () {
    // 初始化音频文件
    audioRefEnding.obeyMuteSwitch = false; // 是否遵循系统静音原则
    audioRefEnding.src = this.data.audio_src; // 音频地址
    audioRefRadio.src = 'http://gaofeifei.3vfree.cn/anniu/click.mp3';
    audioRefFalse.src = 'http://gaofeifei.3vfree.cn/anniu/fault.mp3';
    audioRefTrue.src = 'http://gaofeifei.3vfree.cn/anniu/victory.mp3';

    // 显示提示确认框
    Dialog.confirm({
      title: '提示',
      message: '现在开始训练',
      confirmButtonText: '开始训练',
      cancelButtonText: '取消训练',
    }).then(async () => {
      Toast('即将开始训练');

      // 获取训练题库
      try {
        const res = await getQuestion(token, 0, 0, 10);
        res.forEach(v => (v.checks = JSON.parse(v.checks)));
        setTimeout(() => {
          this.setData({
            question_obj: res,
            isloading: false,
          });
        }, 1500);
      } catch (err) {
        console.error(err);
        Toast.fail('网络异常');
      }
      // this.getVoice();
    }).catch(() => {
      Toast('即将退出训练');
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        });
      }, 1500);
    });
  },

  // 点击submit按钮事件
  change () {
    audioRefRadio.play();
    this.setData({
      isdisable: true,
    });

    // 点击下一题
    if (this.data.index < this.data.question_obj.length - 1) {
      if (this.data.radio === this.data.question_obj[this.data.index].answer) {
        this.setData({
          judge: '正确',
          score: this.data.score + 1,
        });
        audioRefTrue.play();
      } else {
        this.setData({
          judge: '错误',
        });
        audioRefFalse.play();
      }
      this.setData({
        show: true,
      });
      setTimeout(this.disappear, 2000);
    } else {
      // 点击提交，算成绩放音乐
      if (this.data.radio === this.data.question_obj[this.data.index].answer) {
        audioRefTrue.play();
        this.setData({
          score: this.data.score + 1,
        });
      } else {
        audioRefFalse.play();
      }
      audioRefEnding.play();
      this.setData({
        condition: true,
      });
      this.sendscore();
    }
  },

  disappear () {
    this.setData({
      show: false,
      index: this.data.index + 1,
      radio: '-1',
    });
    if (this.data.index === this.data.question_obj.length - 1) {
      this.setData({
        submit_text: '提交',
      });
    }
  },

  onChange (e) {
    this.setData({
      radio: e.detail,
    });
  },
  onClick (e) {
    audioRefRadio.play();
    const { name } = e.currentTarget.dataset;
    this.setData({
      radio: name,
      isdisable: false,
    });
  },

  // 训练结束发送成绩
  sendscore () {
    request({
      url: '/v1/exercise/add',
      data: { exTime: 0, exType: 2, score: this.data.score },
      method: 'POST',
    }).then(
      () => {
        console.log('push successfully');
      },
      () => {
        console.log('push fail');
      },
    );
  },

  // getVoice () {
  //   const taht = this;
  //   const p3 = request({ url: '/v1/voice', header: { 'Content-Type': 'application/json', authorization: token } });
  //   p3.then((res) => { console.log(this); this.setData({ audio_src: res.data }); }, (err) => { console.error(err); });
  // },

});
