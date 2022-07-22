import { request } from './../lib/request';

/**
 * 增加相册文件夹
 * @param {string} token
 * @param {string} name 文件夹名称
 * @param {string} remark 文件夹描述
 * @param {string} parent 父文件夹ID
 */
export const addAlbumFolder = async (token, name, remark, parent) => {
  try {
    const { data: res } = await request({
      url: '/v1/netdisk/add/folder',
      method: 'POST',
      header: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      data: {
        folderName: name,
        folderRemark: remark,
        parentId: parent,
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
 * 向相册文件夹上传图片
 * @param {string} token
 * @param {string} parent 文件夹ID
 * @param {File} file 上传文件内容
 */
export const addAlbumImage = async (token, parent, file) => {
  try {
    const { data: res } = await request({
      url: `/v1/netdisk/add/file?parentId=${parent}`,
      method: 'POST',
      header: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
      data: {
        file,
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
 * 增加相册文件夹
 * @param {string} token
 * @param {string} parent 当前文件夹ID
 */
export const getAlbumFolderAndImage = async (token, parent) => {
  try {
    const { data: res } = await request({
      url: '/v1/netdisk/list',
      method: 'GET',
      header: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      data: {
        parentId: parent,
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
