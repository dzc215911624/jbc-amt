README
===========================

## 说明

  jbc-amt
  * 旨在打造一个在主流框架中例如vue2/3、nuxt、react、next中都可以使用的 方法集和工具类

## jbc-amt

> javascript base core - any method tool 基础方法和工具类

## 安装

``` javascript
# install
npm install jbc-amt
或者
npm i jbc-amt
```

* 支持按需引用
* 所有方法都提取到一级，完整引入的话可以直接以xxx.methods这种格式使用


```javascript
import { uuid, type } from "jbc-amt";
或
import amt from "jbc-amt";
```

* 安装完毕，举个栗子获取uuid

```javascript
console.log(uuid());
或
console.log(amt.uuid());
```

---

## 新增或调整

* 



## 全局变量和方法

```javascript
// 基础类
1.uuid()      // 获取uuid，可以当作唯一字符串使用
2.type(obj)   // 确定JavaScript内置对象的类型，并返回小写形式的类型名称。
3.isIP(str)   // 判断是否为IP地址 是返回true
4.qs(obj)     // 对象转qs请求字符串 返回:请求参数拼接字符串 {id:123,name:'xiaoming'} => id=123&name=xiaoming
5.isNull(any) // 判断是否为空 返回true/false
6.callback(fn, data)  // fn 回调函数, data 回调数据, 返回fn(data)

// 数组类
1.rda(arr, isObject, key) → {Array} // 去重

// 优化类
1.throttle(fn, delay, immediate) //节流  fn函数，delay间隔时间 默认300ms，immediate是否立即执行 默认true
2.debounce(fn, delay, immediate) //防抖  fn函数，delay间隔时间 默认16.6ms，immediate是否立即执行 默认true

// 字符串类
1.warp(str,float,tag) //str字符串以float字符换行，用tag换行符，同时是String拓展方法，可省略str参数 例如‘text,str,aaa’.warp()

// 时间类
1.dateFormatAny(date,fmt) // 识别时间意图的参数转化为任意格式的时间输出 date 时间，fmt 格式化方式 全格式：yyyy-MM-dd hh:mm:ss:S qq WW+  默认：yyyy-MM-dd


```

----

[回到顶部](#readme)
