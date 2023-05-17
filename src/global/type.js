let class2type = {};
const typeStr = 'Boolean Number String Function Array Date RegExp Object Error';
typeStr.split(' ').map(name => {
  class2type['[object ' + name + ']'] = name.toLowerCase();
});

/**
 * @desc 确定JavaScript内置对象的类型，并返回小写形式的类型名称。
 * @param {Any} val 输入任意值
 * @return {String} 返回小写形式的类型名称 
 * 例如：type([]) ==> 'array'
 */
const type = val => {
  return typeof val === 'object' || typeof val === 'function' ? class2type[toString.call(val)] || 'object' : typeof val;
};
const $type = type;

// 判断指定参数是否是一个空对象。
const isEmptyObject = obj => {
  for (let name in obj) {
    return false;
  }
  return true;
};

/**
 * @desc 判断是否为空
 * @param {Any} val 输入任意值
 * @return {Boolean} 返回true/false, number类型的直接返回false
 */
const isNull = val => {
  switch (type(val)) {
  case 'string':
    return !!(val === null || val === undefined || val === '');
  case 'array':
    return !!(val === null || val === undefined || val === [] || val.length === 0);
  case 'number':
    return false;
  case 'object':
    return isEmptyObject(val);
  case 'boolean':
    return val;
  case 'function':
    return val;
  case 'date':
    return isNaN(val.getTime());
  default:
    return !!(val === null || val === undefined);
  }
};

/**
 * @desc 公共回调
 * @param {Object} fn 回调函数
 * @param {Any} data 回调数据
 * @return {Function} 返回fn(data)
 */
let callback = (fn, data) => {
  if (fn && type(fn) == 'function' && fn(data)) {
    return fn(data);
  }
};
export { type, $type, isNull, callback };