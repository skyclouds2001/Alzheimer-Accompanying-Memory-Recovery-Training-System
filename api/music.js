import { request } from './../lib/request';

/**
 * @typedef {Object} Song
 * @property {number} songId
 * @property {string} songName
 * @property {string} album
 * @property {string} src
 * @property {string} singer
 */

/**
 * 获取用户喜欢音乐
 * @param {string} token 用户 token
 */
export const getUserFavMusic = async (token) => {
  try {
    const { data: res } = await request({
      url: '/v1/song/get',
      method: 'GET',
      header: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      data: {},
    });
    if (res.status === 10000) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(new Error(res.message));
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
