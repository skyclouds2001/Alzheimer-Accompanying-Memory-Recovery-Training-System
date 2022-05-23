Component({

  properties: {
    /**
     * 线条及文字颜色颜色
     */
    color: {
      type: String,
      value: '#000',
    },

    /**
     * 训练时间
     */
    time: {
      type: String,
      value: '',
    },

    /**
     * 训练内容
     */
    text: {
      type: String,
      value: '',
    },

    /**
     * 箭头方向
     * * `true` left
     * * `false` right
     */
    direction: {
      type: Boolean,
      value: true,
    },

    /**
     * z-index优先级
     */
    zindex: {
      type: Number,
      value: 0,
    },
  },

});
