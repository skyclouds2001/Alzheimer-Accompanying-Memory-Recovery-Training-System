Page({

  data: {
    /**
     * 视频播放url
     * @type {string[]}
     */
    vedio_src: [
      'http://221.204.20.154/vhot2.qqvideo.tc.qq.com/A8HqnZZdRrmkzAY4aCA8BH5FIpcpQjgX7EvE-fE4QZA8/uwMROfz2r57CIaQXGdGnC2dXDmboP8x2dXG2S16X9FSbppYz/svp_50069/gzc_1000035_0b53v4asaaab7uaj3hamuzrjjl6decxqcica.f204110.mp4?vkey=6C32229BF357912CD83FC7F440BE989AB5194A50A80DE36148793DAB9174A03F5939616407851DC19DC1894D3B8C9B2907BAF37CA584CAD677F44C1E779DB2322C1B1FD91B11DB851C87048F488C0DBC36B10E3196EE5DAAA34FF3E46B5C40CA5D13E8D901A31CCEA26205AB115103C2956A56C942393CB7',
      'http://221.204.20.151/om.tc.qq.com/AGQcTYrpw14rLr__OAs1QD8xgqLJ9Fgbvk_U1T00IOb4/uwMROfz2r57BIaQXGdGnC2dePkZyrskaLipvjWGiLla0tSMO/svp_50001/szg_9378_50001_0b6bhqaagaaaqaagldpme5pvcpgdam6aaa2a.f622.mp4?vkey=A2FF4FA0AE39424211B3345557550343FCD516A9A7B1AACE30AE340C5FCAD552C28172954A3995EFC0F3D95507C8FAA9352DB3517B3A2D4B12CFF4A94457C9132491899ADD05DA9C6E93047A015C5FC590697A7050E9319A3E2DF70CF429670E363A621E8418E796A96FB9314A1EAC9A6A1110A1B23D553E',
      'http://58.20.196.141/om.tc.qq.com/AtpIeAr0BEk70MbdXzl5P4JgczjyBmHLbTbSx-1_x2iI/uwMROfz2r57BIaQXGdGnC2dePkZyrskaLipvjWGiLla0tSMO/svp_50001/szg_9215_50001_0bf2veah2aaaryaltkzazbqvdkodpwuqa7ka.f622.mp4?vkey=057E3A10E47F5F07681B0BA736E66F5F0E2FBF63924E1320F5BA7B1AE987F9281FFF0292CD1809103BCB5A1B7836E6D7AEB23614525ED747128B2CAB489C91EA49108CCA9B4DC035AD66CC7E69CFDF2C09F0E187FEA4F46A8D7CFC577A798E7D4986271CB52BBD365F4A3A78AEF7647993F4B04B1D154454',
      'http://58.20.196.141/om.tc.qq.com/AtpIeAr0BEk70MbdXzl5P4JgczjyBmHLbTbSx-1_x2iI/uwMROfz2r57BIaQXGdGnC2dePkZyrskaLipvjWGiLla0tSMO/svp_50001/szg_9215_50001_0bf2veah2aaaryaltkzazbqvdkodpwuqa7ka.f622.mp4?vkey=057E3A10E47F5F07681B0BA736E66F5F0E2FBF63924E1320F5BA7B1AE987F9281FFF0292CD1809103BCB5A1B7836E6D7AEB23614525ED747128B2CAB489C91EA49108CCA9B4DC035AD66CC7E69CFDF2C09F0E187FEA4F46A8D7CFC577A798E7D4986271CB52BBD365F4A3A78AEF7647993F4B04B1D154454',
    ],

    /**
     * 当前播放视频index
     * @type {number}
     */
    index: 0,
  },

  onLoad: function (options) {
    this.setData({
      index: options.index,
    });
  },

});
