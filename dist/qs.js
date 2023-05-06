/**
 * @desc 对象转qs请求字符串
 * @param {Object} obj 对象
 * @return {String} 返回:请求参数拼接字符串 {id:123,name:'xiaoming'} => id=123&name=xiaoming
 */
const qs = obj => {
  let str = '';
  Object.keys(obj).map((name, index) => {
    let value = obj[name];
    if (value === '?' || value === '&') {
      value = encodeURIComponent(obj[name])
    }
    str += index === 0 ? `${name}=${value}` : `&${name}=${value}`;
  });
  return str;
};

export default qs;