import { request } from './../lib/request';

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
