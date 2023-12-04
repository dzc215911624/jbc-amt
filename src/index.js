// 基础类
const version = '1.0.7'
import { type, isNull, callback } from './global/type'
import uuid from './global/uuid'
import isIP from './global/isIP'
import qs from './global/qs'
import { setStorage, getStorage, delStorage } from './global/storage'

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

// 数字类
import {
  floatSum, floatJia,
  floatMin, floatJian,
  getFloatRightLongest
} from './number/float_operation'
import splitNum from './number/splitNum'


// 集中在一个对象中,方便直接导出
const jbc = {
  // 全局参数
  version,
  // 公共类
  uuid, callback, type, isNull, qs, isIP, setStorage, getStorage, delStorage,
  // 优化类
  throttle, debounce,
  // 数组类
  rda,
  // 字符串类
  warp,
  // 时间类
  dateFormatAny, today, yesterday, prevMonth, thisMonth, pastDays,
  // 数字类
  floatSum, floatMin, floatJia, floatJian, getFloatRightLongest, splitNum
}

export default jbc
