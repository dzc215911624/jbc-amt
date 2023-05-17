import { $type, isNull } from '../global/type';

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
 * @param {String} fmt 格式化方式 全格式：yyyy-MM-dd hh:mm:ss:S qq EEE  默认：yyyy-MM-dd
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

export default dateFormatAny;