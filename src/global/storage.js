/**
 * @desc localStrorage存 二次封装，无需关心类型问题
 * @param {String} key 要存储的key
 * @param {Any} val 要存储的val
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
 * @return {Any} key的值
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
export { setStorage, getStorage, delStorage };