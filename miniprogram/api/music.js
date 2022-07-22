import { request } from './../lib/request';

/**
 * @typedef {Object} Song
 * @property {?number} songId
 * @property {string} songName
 * @property {string} album
 * @property {string} src
 * @property {string} singer
 */

/**
 * 获取用户喜欢音乐
 * @param {string} token 用户 token
 * @returns {Promise<object>}
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

/**
 * 收藏用户喜欢音乐
 * @param {string} token 用户 token
 * @param {Song} song 歌曲信息
 * @returns {Promise<null>}
 */
export const addUserFavMusic = async (token, song) => {
  try {
    const { data: res } = await request({
      url: '/v1/song/add',
      method: 'POST',
      header: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      data: {
        ...song,
      },
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

/**
 * 删除用户喜欢音乐
 * @param {string} token 用户 token
 * @param {string} id 歌曲名称
 * @returns {Promise<object>}
 */
export const removeUserFavMusic = async (token, id) => {
  try {
    const { data: res } = await request({
      url: '/v1/song/remove',
      method: 'POST',
      header: {
        authorization: token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        songId: id,
      },
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
