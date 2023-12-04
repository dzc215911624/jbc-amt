
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
define((function () { 'use strict';

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

  //自定义位数唯一标识符
  const uuid = () => {
    // 如果浏览器支持crypto
    if (typeof crypto === 'object') {
      // 使用crypto.randomUUID方法直接返回
      if (typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
      }
      if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
        const callback = c => {
          const num = Number(c);
          return (num ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> num / 4).toString(16);
        };
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, callback);
      }
    }
    let timestamp = new Date().getTime();
    let perforNow = typeof performance !== 'undefined' && performance.now && performance.now() * 1000 || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let random = Math.random() * 16;
      if (timestamp > 0) {
        random = (timestamp + random) % 16 | 0;
        timestamp = Math.floor(timestamp / 16);
      } else {
        random = (perforNow + random) % 16 | 0;
        perforNow = Math.floor(perforNow / 16);
      }
      return (c === 'x' ? random : random & 0x3 | 0x8).toString(16);
    });
  };

  /**
   * @desc 判断是否为IP地址
   * @param {String} url 输入地址
   * @return {Boolean} 返回:true||false
   */
  const isIP = url => {
    var str = url.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/g);
    if (str == null || str == '') {
      return false;
    } else if (RegExp.$1 > 255 || RegExp.$2 > 255 || RegExp.$3 > 255 || RegExp.$4 > 255) {
      return false;
    } else {
      return true;
    }
  };

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
        value = encodeURIComponent(obj[name]);
      }
      str += index === 0 ? `${name}=${value}` : `&${name}=${value}`;
    });
    return str;
  };

  /**
   * @desc localStrorage存 二次封装，无需关心类型问题
   * @param {String} key 要存储的key
   * @param {Any} val 要存储的val
   * @return {String} 无
   * 例如：setStorage("str1","str1的值")
   */
  const setStorage = (key, val) => {
    let temp = typeof val === 'object' ? JSON.stringify(val) : val;
    temp += '|' + typeof val;
    try {
      let storage = window.localStorage;
      storage.setItem(key, temp);
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * @desc localStrorage取 二次封装，无需关心类型问题
   * @param {String} key 要获取的key
   * @return {String} 无
   * 例如：getStorage("str1")
   */
  const getStorage = key => {
    let val = '';
    let type = '';
    try {
      let storage = window.localStorage;
      if (storage.getItem(key)) {
        val = storage.getItem(key).split('|')[0];
        type = storage.getItem(key).split('|')[1];
      }
    } catch (e) {
      console.log(e);
    }
    // 因返回的全是string类型，转换输出类型
    let temp;
    switch (type) {
      case 'object':
        temp = JSON.parse(val);
        break;
      case 'number':
        temp = Number(val);
        break;
      default:
        if (val === 'false') {
          temp = false;
        } else if (val === 'true') {
          temp = true;
        } else {
          temp = val;
        }
        break;
    }
    return temp;
  };

  /**
   * @desc localStrorage删
   * @param {String} key 要删除的key
   * @return {String} 无
   * 例如：delStorage("str1")
   */
  const delStorage = key => {
    try {
      let storage = window.localStorage;
      storage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  };

  //字符串时间转成Date数据
  const strToDate = dateObj => {
    if ($type(dateObj) === 'string') {
      dateObj = dateObj.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/');
      if (dateObj.indexOf('.') > 0) {
        dateObj = dateObj.slice(0, dateObj.indexOf('.'));
      }
      return new Date(dateObj);
    } else {
      return dateObj;
    }
  };

  /**
   * @desc 转化为任意格式的时间输出
   * @param {Any} date 时间
   * @param {String} fmt 格式化方式 全格式：yyyy-MM-dd hh:mm:ss:S qq WW+  默认：yyyy-MM-dd
   * @return {String} 返回:相应fmt格式
   */
  const dateFormatAny = (date, fmt) => {
    date = strToDate(date);
    fmt = isNull(fmt) ? 'yyyy-MM-dd' : fmt;
    if (!isNull(date)) {
      date = new Date(date);
      let o = {
        //月份  
        'M+': date.getMonth() + 1,
        //日 
        'd+': date.getDate(),
        //小时   
        'h+': date.getHours(),
        //分   
        'm+': date.getMinutes(),
        //秒   
        's+': date.getSeconds(),
        //毫秒   
        'S': date.getMilliseconds(),
        //季度  
        'q+': Math.floor((date.getMonth() + 3) / 3)
      };
      let week = {
        0: '日',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六'
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length));
      }
      if (/(W+)/.test(fmt)) {
        let zhou = '';
        if (RegExp.$1.length > 1) {
          if (RegExp.$1.length > 2) {
            zhou = '星期';
          } else {
            zhou = '周';
          }
        } else {
          zhou = '周';
        }
        fmt = fmt.replace(RegExp.$1, zhou + week[date.getDay().toString() + '']);
      }
      for (var k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substring(('' + o[k]).length));
      return fmt;
    }
    return isNull(date) ? false : date;
  };

  var time = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };

  /**
   * @desc 获取今日起始时间
   * @param {String} fmt 以什么格式输出：yyyy-MM-dd hh:mm:ss:S qq WW+  默认：yyyy-MM-dd
   * @return {Array} 返回:[start,end]
   */
  var today = function today(fmt) {
    fmt = fmt === undefined ? 'yyyy-MM-dd' : fmt;
    var start = new Date().getTime(),
      end = start;
    return [dateFormatAny(start, fmt), dateFormatAny(end, fmt)];
  };

  /**
   * @desc 获取昨日起始时间
   * @param {String} fmt 以什么格式输出：yyyy-MM-dd hh:mm:ss:S qq WW+  默认：yyyy-MM-dd
   * @return {Array} 返回:[start,end]
   */
  var yesterday = function yesterday(fmt) {
    fmt = fmt === undefined ? 'yyyy-MM-dd' : fmt;
    var start = new Date().getTime() - 3600 * 24 * 1000,
      end = start;
    return [dateFormatAny(start, fmt), dateFormatAny(end, fmt)];
  };

  /**
   * @desc 获取上月起始时间
   * @param {String} fmt 以什么格式输出：yyyy-MM-dd hh:mm:ss:S qq WW+  默认：yyyy-MM-dd
   * @return {Array} 返回:[start,end]
   */
  var prevMonth = function prevMonth(fmt) {
    fmt = fmt === undefined ? 'yyyy-MM-dd' : fmt;
    var temp = {};
    // 如果是一月份
    if (time.month === 1) {
      // 年份减一
      temp.year = time.year - 1;
      temp.month = 12;
    } else {
      temp.year = time.year;
      temp.month = time.month - 1;
    }
    temp.day = time.day;

    // 获取当月有多少天
    var days = new Date(temp.year, temp.month, 0).getDate(),
      start = new Date(''.concat(temp.year, '-').concat(temp.month, '-1')).getTime(),
      end = new Date(''.concat(temp.year, '-').concat(temp.month, '-').concat(days)).getTime();
    return [dateFormatAny(start, fmt), dateFormatAny(end, fmt)];
  };

  /**
   * @desc 获取本月起始时间
   * @param {Boolean} isSofar 结束时间是否截止到今天 默认false
   * @param {String} fmt 以什么格式输出：yyyy-MM-dd hh:mm:ss:S qq WW+  默认：yyyy-MM-dd
   * @return {Array} 返回:[start,end]
   */
  var thisMonth = function thisMonth(isSofar, fmt) {
    fmt = fmt === undefined ? 'yyyy-MM-dd' : fmt;
    isSofar = !!isSofar;
    var days = new Date(time.year, time.month, 0).getDate(),
      start = new Date(''.concat(time.year, '-').concat(time.month, '-1')).getTime(),
      end = new Date(''.concat(time.year, '-').concat(time.month, '-').concat(isSofar ? time.day : days)).getTime();
    return [dateFormatAny(start, fmt), dateFormatAny(end, fmt)];
  };

  /**
   * @desc 获取近多少天的起始时间
   * @param {Number} days 天数
   * @param {String} fmt 以什么格式输出：yyyy-MM-dd hh:mm:ss:S qq WW+  默认：yyyy-MM-dd
   * @return {Array} 返回:[start,end]
   */
  var pastDays = function pastDays(days, fmt) {
    fmt = fmt === undefined ? 'yyyy-MM-dd' : fmt;
    days = days === undefined ? 30 : days;
    var start = new Date().getTime() - 3600 * 1000 * 24 * days,
      end = new Date().getTime() - 3600 * 1000 * 24 * 1;
    return [dateFormatAny(start, fmt), dateFormatAny(end, fmt)];
  };

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
    };
  };

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
    };
  };

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
          let obj = {};
          arr = arr.reduce((prev, cur) => {
            if (cur && typeof cur === 'object' && Object.hasOwn(cur, key)) {
              if (obj[cur[key]] === undefined) {
                // 不区属性分类型去重
                obj[cur[key]] = prev.push(cur);
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
        prev.push(reFloat.test(item) ? item.toString().split('.')[1].length : 0);
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

  // 基础类
  const version = '1.0.7';

  // 集中在一个对象中,方便直接导出
  const jbc = {
    // 全局参数
    version,
    // 公共类
    uuid,
    callback,
    type,
    isNull,
    qs,
    isIP,
    setStorage,
    getStorage,
    delStorage,
    // 优化类
    throttle,
    debounce,
    // 数组类
    rda,
    // 字符串类
    warp,
    // 时间类
    dateFormatAny,
    today,
    yesterday,
    prevMonth,
    thisMonth,
    pastDays,
    // 数字类
    floatSum,
    floatMin,
    floatJia,
    floatJian,
    getFloatRightLongest,
    splitNum
  };

  return jbc;

}));
