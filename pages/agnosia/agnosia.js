import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';

import { getQuestion } from './../../api/question';
import { getVoice } from './../../api/voice';
import { addExerciseRecord } from './../../api/exercise';

const token = wx.getStorageSync('token');

// 答完题播放音频
const audioRefEnding = wx.createInnerAudioContext();
audioRefEnding.src = 'http://aimg8.dlszyht.net.cn/ueditor/file/823/1644869/1553422829215244.mp3';
// 点击按钮音频
const audioRefRadio = wx.createInnerAudioContext();
audioRefRadio.src = 'http://gaofeifei.3vfree.cn/anniu/click.mp3';
// 错误音效
const audioRefFalse = wx.createInnerAudioContext();
audioRefFalse.src = 'http://gaofeifei.3vfree.cn/anniu/fault.mp3';
// 成功音效
const audioRefTrue = wx.createInnerAudioContext();
audioRefTrue.src = 'http://gaofeifei.3vfree.cn/anniu/victory.mp3';

Page({

  data: {
    /** 标记当前是否正在加载资源 */
    isloading: true,

    /** 控制跳转按钮是否启用 */
    isdisable: true,

    /** 答题阶段 | 结束阶段 */
    condition: true,

    // 弹出框显示
    show: false,
    judge: '正确',

    // 当前题目索引
    index: -1,

    // 问题数据
    questions: [],

    // 成绩
    score: 0,

    // 选择选项
    radio: -1,
  },

  onLoad: function () {
    // 设置 innerAudio 静音选项
    wx.setInnerAudioOption({
      obeyMuteSwitch: false,
    });

    // 显示提示确认框
    Dialog.confirm({
      title: '提示',
      message: '确认开始训练吗',
      confirmButtonText: '开始训练',
      cancelButtonText: '取消训练',
    }).then(async () => { // 确认训练
      Toast('即将开始训练');

      // 获取训练题库
      try {
        const res = await getQuestion(token, 0, 0, 10);
        res.forEach(v => (v.checks = JSON.parse(v.checks))); // 转义字符串类型选项为数组类型
        this.setData({
          questions: res,
          index: 0,
        });
      } catch (err) {
        console.error(err);
        Toast.fail('网络异常');
      }

      // 获取结束答题语音 todo
      try {
        const res = await getVoice(token);
        audioRefEnding.src = res.data;
      } catch (err) {}
    }).catch(() => { // 取消训练
      Toast('即将退出训练');
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        });
      }, 1500);
    }).finally(() => {
      wx.nextTick(() => {
        this.setData({
          isloading: false,
        });
      });
    });
  },

  onUnload: function () {
    // 恢复 innerAudio 静音选项
    wx.setInnerAudioOption({
      obeyMuteSwitch: true,
    });
  },

  /**
   * 选项选择
   */
  handleSelectRadio (e) {
    audioRefRadio.play();
    const { name } = e.currentTarget.dataset;
    this.setData({
      radio: name,
      isdisable: false,
    });
  },

  /**
   * 点击submit按钮事件
   */
  async handleSubmitAnswer () {
    const { index, questions, radio, score } = this.data;
    this.setData({
      isdisable: true,
    });

    if (index < questions.length - 1) {
      // 不是最后一题 点击下一题

      if (radio === questions[index].answer) {
        this.setData({
          judge: '正确',
          score: score + 1,
          show: true,
        });
        audioRefTrue.play();
      } else {
        this.setData({
          judge: '错误',
          show: true,
        });
        audioRefFalse.play();
      }

      setTimeout(() => {
        this.setData({
          show: false,
          index: index + 1,
          radio: -1,
        });
      }, 2000);
    } else {
      // 是最后一题 点击提交，算成绩放音乐
      if (radio === questions[index].answer) {
        audioRefTrue.play();
        this.setData({
          score: score + 1,
        });
      } else {
        audioRefFalse.play();
      }

      // 播放结束答题声音
      audioRefEnding.play();

      // 更新状态 答题结束
      this.setData({
        condition: true,
      });

      // 提交训练记录
      try {
        const { score } = this.data;
        await addExerciseRecord(token, {
          time: 0,
          type: 1,
          score,
        });
      } catch (err) {
        console.error(err);
        Toast.fail('网络异常');
      }
    }
  },

});
