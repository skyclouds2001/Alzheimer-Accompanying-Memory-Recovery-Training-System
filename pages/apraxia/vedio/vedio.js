Page({

  data: {
    /**
     * 视频播放url
     * @type {string[]}
     */
    vedio_src: [
      'https://video.pearvideo.com/mp4/third/20220428/cont-1760344-11980839-105330-hd.mp4',
      'https://video.pearvideo.com/mp4/third/20220428/cont-1760344-11980839-105330-hd.mp4',
      'https://video.pearvideo.com/mp4/third/20220428/cont-1760344-11980839-105330-hd.mp4',
      'https://video.pearvideo.com/mp4/third/20220428/cont-1760344-11980839-105330-hd.mp4',
    ],
    /**视频封面
    * @type {string[]}
    */
    fengmian_src :['https://s1.ax1x.com/2022/05/11/Od6rin.png','https://s1.ax1x.com/2022/05/11/Od6rin.png','https://s1.ax1x.com/2022/05/11/Od6rin.png','https://s1.ax1x.com/2022/05/11/Od6rin.png'],
     
    /**
     * 当前播放视频index
     * @type {number}
     */
    index: 0,
  },

  onLoad: function (options) {
    console.log(options);
    this.setData({
      index: options.index,
    });
  },

});
