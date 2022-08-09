import Toast from '@vant/weapp/toast/toast';

Page({

  data: {
    /**
     * 问题反馈输入内容
     * @type {string}
     */
    feedback: '',
  },

  handleSubmitFeedback () {
    const { feedback } = this.data;
    if (feedback.trim().length === 0) Toast.fail('上传内容不能为空');
    else Toast.success('上传成功');

    this.setData({
      feedback: '',
    });
  },

});
