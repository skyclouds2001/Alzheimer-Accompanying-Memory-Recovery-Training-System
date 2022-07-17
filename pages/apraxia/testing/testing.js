import Toast from '@vant/weapp/toast/toast';

import { request } from '../../../lib/request';

import { getVoice } from './../../../api/voice';
import { getGestice } from './../../../api/gesture';

import { baiduCloudConfig } from './../../../data/baiducloud';

const innerAudioContext = wx.createInnerAudioContext();

const fileSystemManager = wx.getFileSystemManager();

const token = wx.getStorageSync('token');

Page({

  data: {
    imageUrl1: '../../../images/example.jpg',
    imageUrl2: '../../../images/example.jpg',
    btnEnable: 0,
    result: '',

    /** 子女声音文件URL */
    voiceUrl: '',
  },
  /**
   * 百度云API token
   * @type {?string}
   */
  access_token: null,

  onLoad: async function () {
    // 请求获取百度云 access_token
    try {
      const { data: res } = await request({
        url: '/oauth/2.0/token',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          grant_type: baiduCloudConfig.type,
          client_id: baiduCloudConfig.id,
          client_secret: baiduCloudConfig.secret,
        },
      }, 'https://aip.baidubce.com');

      console.log(res);
      this.access_token = res.access_token;
    } catch (err) {
      console.log(err);
    }

    // 预先请求获取子女声音
    try {
      // todo: 接口异常
      const res = await getVoice(token);
      console.log(res);
      this.setData({
        voiceUrl: res.url,
      });
    } catch (err) {
      console.log(err);
    }
  },

  async showAnalyseResult () {
    try {
      const res = await wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        sizeType: ['original', 'compressed'],
        camera: 'back',
      });
      this.setData({
        imageUrl1: res.tempFiles[0].tempFilePath,
      });

      const data = fileSystemManager.readFileSync(res.tempFiles[0].tempFilePath, 'base64');

      const accessToken = this.access_token;
      // file: https://cloud.baidu.com/doc/BODY/s/4k3cpywrv
      const { data: result } = await request({
        url: '/rest/2.0/image-classify/v1/gesture',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          access_token: accessToken,
          image: data,
        },
      }, 'https://aip.baidubce.com');

      if (result.result_num > 0) {
        const { voiceUrl } = this.data;
        innerAudioContext.autoplay = true;
        // todo: 临时音频文件
        innerAudioContext.src = voiceUrl ?? 'http://music.163.com/song/media/outer/url?id=317151.mp3';

        // todo: result analyse
        this.setData({
          result: result.result[1].classname,
          imageUrl2: 'https://mgl-image.oss-cn-beijing.aliyuncs.com/gesture/22.jpeg',
        });

        const res = await getGestice(token, result.result[1].classname);
        /**
         * todo
         * OK 返回resultName非全大写
         * Prayer Congratulation Honour Heart_single Thumb_up Thumb_down ILY Heart_1 Heart_2 Heart_3 Insult 无结果
         */
        this.setData({
          imageUrl2: res.image,
          result: res.resultName,
        });
      } else {
        this.setData({
          btnEnable: -1,
        });
      }
    } catch (err) {
      console.log(err);
      Toast.fail(err.errMsg);
    }
  },

});
