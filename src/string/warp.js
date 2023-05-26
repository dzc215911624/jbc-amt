import { $type } from '../global/type';

/**
 * @desc 换行 str以float分割并以tag来换行
 * @param {String} str 要换行的字符串
 * @param {String} float 以float字符分割 默认','
 * @param {String} tag 以tag来换行 默认'br换行标签'
 * @return {String} 返回整理后带换行tag的字符串
 * 例如：type([]) ==> 'array'
 */
let warp = (str, float, tag) => {
  if (!str) {
    return;
  }
  if ($type(str) !== 'string') {
    return;
  }
  float = float === undefined ? ',' : float;
  tag = tag === undefined ? '<br />' : tag;
  let temp = str.split(float).reduce((prev, item, index, arr) => {
    if (arr.length - 1 === index) {
      prev += item;
    } else {
      prev += `${item}${tag}`;
    }
    return prev;
  }, '');
  return temp;
};
(function () {
  // 添加到String原型链上
  String.prototype.warp = function (float, tag) {
    return warp(this, float, tag);
  };
})();

export default warp;