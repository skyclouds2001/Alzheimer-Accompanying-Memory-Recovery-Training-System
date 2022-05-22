/**
 * @typedef {Object} TabbarItem
 * @property {string} name 文字内容
 * @property {string} url 跳转页面链接
 * @property {number} id 内容id
 */

Component({
  data: {

    /**
     * 标记当前选择的tabbar项目item下标
     * @type {number}
     */
    select: 0,

    /**
     * 标记当前选择的tabbar类型
     * @type {number}
     */
    kind: -1,

  },
});
