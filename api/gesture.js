import { request } from './../lib/request';

/**
 * 获取百度云API判定结果
 * @param {string} token
 * @param {string} name 百度云识别结果
 */
export const getGestice = async (token, name) => {
  try {
    const { data: res } = await request({
      url: '/v1/gesture',
      method: 'POST',
      header: {
        authorization: token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        recognizedName: name,
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
