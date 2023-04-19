/**
* @desc 防抖
* @param {Function} callback 回调函数
* @param {Number} delay 间隔时间 默认：16.6
* @param {Boolean} immediate 是否立即执行 默认:true
* @return 没有返回值
*/
const debounce = (callback, delay, immediate) => {
  delay = delay == null ? 16.6 : delay;
  immediate = immediate == null ? true : immediate;
  var timeout;
  return function () {
    var context = this;
    var args = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      // 判断是否执行过
      var flag = !timeout;
      timeout = setTimeout(function () {
        callback.apply(context, args);
      }, delay);
      if (flag) {
        callback.apply(context, args);
      }
    } else {
      timeout = setTimeout(function () {
        callback.apply(context, args);
      }, delay);
    }
  }
}

export default debounce