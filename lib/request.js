/**
 * @file request.js
 * @author CSY
 */

/**
 * @typedef {Object} RequestParams
 * @property {string} url
 * @property {string} method
 * @property {string | object} data
 * @property {object} header
 * @description 参考：https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
 */

/**
  * @type {string}
  * @description Host
  */
const baseurl = '';

/**
 * @function
 * @description 对wx.request()的包装方法，自动添加url的host
 * @param {RequestParams} params
 * @returns {Promise<object>}
 */
const request = (params) => {
  return new Promise ((resolve, reject) => {
    wx.request ({
      ...params,
      url: baseurl + params.url,
      success: res => {
        resolve (res);
      },
      fail: err => {
        reject (err);
      },
    });
  });
};
