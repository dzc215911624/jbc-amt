// 基础类
const version = '1.1.1'
import { type, isNull, callback } from './global/type'
import uuid from './global/uuid'
import isIP from './global/isIP'
import qs from './global/qs'

// 优化类
import throttle from './optimize/throttle'
import debounce from './optimize/debounce'

// 数组类
import rda from './array/remove_duplicate'

// 字符串类
import warp from './string/warp'


// 集中在一个对象中,方便直接导出
const jbc = {
  version,
  callback,
  type,
  isNull,
  qs,
  throttle,
  debounce,
  rda,
  uuid,
  isIP,
  warp
}

export default jbc
