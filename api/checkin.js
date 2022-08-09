import { request } from './../lib/request';

/**
 * 获取用户签到天数
 * @param {string} token
 * @param {0 | 1} type 查询类型
 */
export const getCheckinDays = async (token, type = 0) => {
  try {
    const { data: res } = await request({
      url: `/v1/patient/sign/count/${type}`,
      method: 'GET',
      header: {
        Authorization: token,
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
 * 获取用户当月打卡记录
 * @param {string} token
 */
export const getCheckinRecord = async (token) => {
  try {
    const { data: res } = await request({
      url: '/v1/patient/sign/signRecord',
      method: 'GET',
      header: {
        authorization: token,
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
 * 签到
 * @param {string} token
 */
export const postCheckinRecord = async (token) => {
  try {
    const { data: res } = await request({
      url: '/v1/patient/sign',
      method: 'POST',
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
