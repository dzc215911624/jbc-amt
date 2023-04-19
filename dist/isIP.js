//判断是否为IP地址 是返回true
/**
 * @desc 判断是否为IP地址
 * @param {String} url 输入地址
 * @return {Boolean} 返回:true||false
 */
const isIP = (url) => {
  var str = url.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/g);
  if (str == null || str == '') {
    return false;
  } else if (RegExp.$1 > 255 || RegExp.$2 > 255 || RegExp.$3 > 255 || RegExp.$4 > 255) {
    return false;
  } else {
    return true;
  }
};

export default isIP;