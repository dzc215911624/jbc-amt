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

  //判断是否为IP地址 是返回true
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

  // 基础类
  const version = '1.1.1';

  // 集中在一个对象中，减少层级,方便直接导出
  const jbc = {
    version,
    type,
    throttle,
    debounce,
    rda,
    uuid,
    isIP,
    warp
  };

  return jbc;

}));
