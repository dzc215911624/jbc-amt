// import type from '../global/type';
/**
 *
 * @desc 对象数组去重
 * @param {Array} arr 要去重的数组
 * @param {Boolean} isObject 用于提升去重效率，可选，默认true,  object类型数据采用了针对性的去重方法，不需要可以禁用
 * @param {String} key 根据对象的具体属性进行去重，可选，默认空
 * @return {Array} 返回
 */
function rda(arr, isObject, key) {
  console.log(new Date().getTime(), '开始', arr);
  isObject = isObject === undefined ? true : isObject;
  if (arr && arr.length > 0) {
    let set = new Set(arr);
    arr = Array.from(set);
    // 需要把对象也去重
    if (isObject) {
      // 以某一个key值来判断是否重复
      if (key) {
        let obj = {}
        arr = arr.reduce((prev, cur) => {
          if (cur && typeof cur === 'object' && Object.hasOwn(cur, key)) {
            if (obj[cur[key]] === undefined) {
              // 不区属性分类型去重
              obj[cur[key]] = true && prev.push(cur);
            }
          } else {
            prev.push(cur);
          }
          return prev;
        }, []);
        console.log(new Date().getTime(), '根据key去重');
        return Array.from(arr);
      }
      // 直接转成string对比
      else {
        let result = [...new Set(arr.map(JSON.stringify))].map(item => {
          return item ? JSON.parse(item) : item;
        });
        console.log(new Date().getTime(), '转化为string对比');
        return result;
      }
    }
    // 不包含对象的话直接返回就行了
    else {
      console.log(new Date().getTime(), '非objert类型直接ES6去重');
      return arr;
    }
  }
  // 数组为空直接返回
  else {
    console.log(new Date().getTime(), '空数据直接返回');
    return arr;
  }
}
export default rda;