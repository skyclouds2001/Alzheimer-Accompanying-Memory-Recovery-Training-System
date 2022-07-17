import { request } from './../lib/request';

/**
 * 上传训练记录
 * @param {string} token
 * @param
 */
export const addExerciseRecord = async (token, {
  time: exTime,
  type: exType,
  score,
}) => {
  try {
    const { data: res } = await request({
      url: '/v1/exercise/add',
      method: 'POST',
      header: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      data: {
        exTime,
        exType,
        score,
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
 * 上传训练记录
 * @param {string} token
 */
export const getExerciseRecord = async (token, num = 1, size = 10) => {
  try {
    const { data: res } = await request({
      url: '/v1/exercise/get',
      method: 'GET',
      header: {
        authorization: token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        PageNum: num,
        PageSize: size,
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
