import { request } from './lib/request.js';

App({

  onLaunch: async function () {
    try {
      // 登录
      const { code } = await wx.login({
        timeout: 15000,
      });
    
      // 向服务器请求换取 openid 与 token
      const { data: res } = await request({
        url: `/v1/user/login/${code}`,
        method: 'GET',
      });
      const { openid, token } = res.data;

      // 将 openid 与 token 存至 storage 及 globalData 内
      this.globalData.openid = openid;
      this.globalData.token = token;
      wx.setStorageSync('openid', openid);
      wx.setStorageSync('token', token);
    } catch (err) {
      console.error(err);
    }
  },

  onShow () {
    if (this.globalData.firstIn) {
      this.globalData.firstIn = 0;
    } else {
      this.globalData.onShow = 1;
    }
  },
  onHide () {
    this.globalData.onHide = 1;
  },

  globalData: {
    openid: '',
    token: '',
    mysongs: [],
    cookie: 'MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/openapi/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/eapi/clientlog;;MUSIC_U=e84478a1b700c4d4f5f33898aa0a24fbcf34cb06c52baf0043bc2c5837c792b6519e07624a9f0053901f8918f05ad12e1901903b05cce24461dafccfd406cc3674816114a4195f687a561ba977ae766d; Max-Age=1296000; Expires=Mon, 23 May 2022 05:06:50 GMT; Path=/;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/api/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/openapi/clientlog;;__remember_me=true; Max-Age=1296000; Expires=Mon, 23 May 2022 05:06:50 GMT; Path=/;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/neapi/clientlog;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/eapi/feedback;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/wapi/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/api/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/wapi/clientlog;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/neapi/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/weapi/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/neapi/feedback;;__csrf=0a4170624e744ed399f4cadd3fa3939b; Max-Age=1296010; Expires=Mon, 23 May 2022 05:07:00 GMT; Path=/;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/weapi/feedback;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/wapi/clientlog;;MUSIC_SNS=; Max-Age=0; Expires=Sun, 08 May 2022 05:06:50 GMT; Path=/;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/weapi/feedback;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/api/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/wapi/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/api/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/eapi/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/weapi/clientlog;',
    firstIn: 1,
    onShow: 0,
    onHide: 0,
  },

});
