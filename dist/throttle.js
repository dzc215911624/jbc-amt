/**
 * @desc 节流
 * @param {Function} callback 回调函数
 * @param {Number} delay 间隔时间 默认：300
 * @param {Boolean} immediate 是否立即执行 默认:true
 * @return 没有返回值
 */
const throttle = (callback, delay, immediate) => {
  delay = delay == null ? 300 : delay;
  immediate = immediate == null ? true : immediate;
  var timer,
    context,
    iNow,
    firstTime = +new Date(),
    args = [];
  return function () {
    clearTimeout(timer);
    context = this;
    iNow = +new Date();
    args = Array.prototype.slice.call(arguments);
    // 判断是否是第一次执行
    if (immediate) {
      immediate = false;
      callback.apply(context, args);
    } else {
      // 第二次执行的时候判断时间差
      if (iNow - firstTime > delay) {
        firstTime = iNow;
        callback.apply(context, args);
      } else {
        // 判断是否是最后一次执行
        timer = setTimeout(function () {
          callback.apply(context, args);
        }, delay);
      }
    }
  }
}

export default throttle 