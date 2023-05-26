// 基础类
const version = '1.1.1'
import { type, isNull, callback } from './global/type'
import uuid from './global/uuid'
import isIP from './global/isIP'
import qs from './global/qs'

// 时间类
import dateFormatAny from './date/dateFormatAny'
import { today, yesterday, prevMonth, thisMonth, pastDays } from './date/dateMethods'

// 优化类
import throttle from './optimize/throttle'
import debounce from './optimize/debounce'

// 数组类
import rda from './array/remove_duplicate'

// 字符串类
import warp from './string/warp'


// 集中在一个对象中,方便直接导出
const jbc = {
  // 全局参数
  version,
  // 公共类
  callback, type, isNull, qs, isIP,
  // 优化类
  throttle, debounce,
  // 数组类
  rda,
  // 字符串类
  uuid, warp,
  // 时间类
  dateFormatAny, today, yesterday, prevMonth, thisMonth, pastDays
}

export default jbc
