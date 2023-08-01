/**
 * @desc 把数字以类似千分位形式隔开返回，也可以自定义每隔几位数隔开
 * @param {Number} num 要隔开的数 必填
 * @param {Number} count 每隔几个数 默认3
 * @param {String} num 用什么符号隔开 默认逗号,
 * @return {String} 返回类字符串
 * 例如：123456789 ==> 123,456,789
 */
const splitNum = (num, count, char) => {
  count = count === undefined ? 3 : count;
  char = char === undefined ? ',' : char;
  let n = num;
  let r = '';
  let temp = '',
    mod = 0,
    mlen = ~~'1'.padEnd(count + 1, '0');
  do {
    // 求模的值， 用于获取高三位，这里可能有小数
    mod = n % mlen;
    // 值是不是大于1，是继续的条件
    n = n / mlen;
    // 高三位
    temp = ~~mod;
    // 1.填充: n > 1 循环未结束， 就要填充为比如 1 => 001
    // 2.拼接“,”
    r = (n >= 1 ? `${temp}`.padStart(count, '0') : temp) + (r ? `${char}${r}` : '');
  } while (n >= 1);
  const strNumber = `${num}`;
  let index = strNumber.indexOf('.');
  // 拼接小数部分
  if (index >= 0) {
    r += strNumber.substring(index);
  }
  return r;
};
export default splitNum;