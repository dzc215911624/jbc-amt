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

export default type;