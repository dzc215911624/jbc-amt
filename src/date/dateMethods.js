import dateFormatAny from './dateFormatAny';
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

export { today, yesterday, prevMonth, thisMonth, pastDays };