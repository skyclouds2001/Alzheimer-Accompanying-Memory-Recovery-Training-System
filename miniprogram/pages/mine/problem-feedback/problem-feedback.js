Page({

  data: {
    /**
     * 问题反馈输入内容
     * @type {string}
     */
    feedback: '',
  },

  handleSubmitFeedback () {
    // const { feedback } = this.data;
    this.setData({
      feedback: '',
    });
  },

});
