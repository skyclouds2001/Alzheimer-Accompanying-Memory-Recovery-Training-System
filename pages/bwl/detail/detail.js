import Toast from '@vant/weapp/toast/toast';

import Dialog from '@vant/weapp/dialog/dialog';

import { getDetailMemorandum, removeMemorandum } from './../../../api/memorandum';

const token = wx.getStorageSync('token');

Page({

  data: {
    /** 事项内容 */
    content: '',
    /** 事项时间 */
    time: '',
    /** 事项标题 */
    title: '',
    /** 事项ID */
    id: '',
  },

  onLoad: async function (options) {
    const { id, time, title } = options;
    const [{ content }] = await getDetailMemorandum(token, id);
    this.setData({
      id,
      title,
      time: time.slice(0, 10),
      content,
    });
  },

  /**
   * 删除记录
   */
  delItem () {
    Dialog.confirm({
      title: '警告',
      message: '确认删除该备忘？',
    }).then(async () => {
      const { id } = this.data;
      const res = await removeMemorandum(token, id);
      if (res) {
        Toast.success('删除成功');
        this.getOpenerEventChannel().emit('onRemoveItem');
        wx.navigateBack({
          delta: 1,
        });
      } else {
        Toast.fail('删除失败');
      }
    }).catch(() => {});
  },
});
