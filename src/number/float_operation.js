const reFloat = /[.]/;
/**
 * @desc 对比传入的浮点类型数据，获取浮点类型小数点右侧最长长度
 * @param {Array} list 要对比的数组
 * @return {Number} 返回小数点右侧 最长长度
 * 例如：[0.1 , 0.22 , 0.333] ==> 3
 */
const getFloatRightLongest = function (list) {
  if (!(list && list.length > 1)) {
    return list;
  }
  let longer;
  try {
    let temp = Object.values(list).reduce((prev, item) => {
      prev.push(reFloat.test(item) ? item.toString().split('.')[1].length : 0)
      return prev;
    }, []);
    longer = Math.max(...temp);
  } catch (e) {
    longer = 0;
  }
  return longer;
};

/**
 * @desc 浮点类型 （加+）四则精度运算运算
 * @param {Number} num1 第一个数
 * @param {Number} num2 第一个数
 * @param {Number} numN 第N个数
 * @return {Number} 返回所有数相加结果
 * 例如：floatSum(0.1,0.2,0.3) ==> 0.6
 */
const floatSum = function (num1, num2) {
  if (arguments.length < 2) {
    return num1;
  }
  let max, list;
  list = Object.values(arguments);
  max = Math.pow(10, getFloatRightLongest(list));
  if (arguments.length === 2) {
    return Math.round(num1 * max + num2 * max) / max;
  }
  if (arguments.length > 2) {
    let temp = list.reduce((prev, num) => {
      prev += num * max;
      return prev;
    }, 0);
    return Math.round(temp) / max;
  }
};
const floatJia = floatSum;

/**
 * @desc 浮点类型 （减+）四则精度运算运算
 * @param {Number} num1 第一个数
 * @param {Number} num2 第一个数
 * @param {Number} numN 第N个数
 * @return {Number} 返回所有数相减结果
 * 例如：floatMin(0.8,0.3,0.4) ==> 0.1
 */
const floatMin = function (num1, num2) {
  if (arguments.length < 2) {
    return num1;
  }
  let max, list;
  list = Object.values(arguments);
  max = Math.pow(10, getFloatRightLongest(list));
  if (arguments.length === 2) {
    return Math.round(num1 * max - num2 * max) / max;
  }
  if (arguments.length > 2) {
    let temp = list.reduce((prev, num, index) => {
      if (index === 0) {
        prev = num * max;
      } else {
        prev -= num * max;
      }
      return prev;
    }, 0);
    return Math.round(temp) / max;
  }
};
const floatJian = floatMin;

export { floatSum, floatMin, floatJia, floatJian, getFloatRightLongest };