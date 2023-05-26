define((function(){"use strict";let e={};"Boolean Number String Function Array Date RegExp Object Error".split(" ").map((t=>{e["[object "+t+"]"]=t.toLowerCase()}));const t=t=>"object"==typeof t||"function"==typeof t?e[toString.call(t)]||"object":typeof t,n=t,r=e=>{switch(t(e)){case"string":return!(null!=e&&""!==e);case"array":return!(null!=e&&e!==[]&&0!==e.length);case"number":return!1;case"object":return(e=>{for(let t in e)return!1;return!0})(e);case"boolean":case"function":return e;case"date":return isNaN(e.getTime());default:return!(null!=e)}};const a=(e,t)=>{var a;if(e="string"===n(a=e)?((a=a.replace(/T/g," ").replace(/\.[\d]{3}Z/,"").replace(/(-)/g,"/")).indexOf(".")>0&&(a=a.slice(0,a.indexOf("."))),new Date(a)):a,t=r(t)?"yyyy-MM-dd":t,!r(e)){let n={"M+":(e=new Date(e)).getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),S:e.getMilliseconds(),"q+":Math.floor((e.getMonth()+3)/3)},r={0:"日",1:"一",2:"二",3:"三",4:"四",5:"五",6:"六"};if(/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substring(4-RegExp.$1.length))),/(W+)/.test(t)){let n="";n=RegExp.$1.length>1&&RegExp.$1.length>2?"星期":"周",t=t.replace(RegExp.$1,n+r[e.getDay().toString()+""])}for(var o in n)new RegExp("("+o+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?n[o]:("00"+n[o]).substring((""+n[o]).length)));return t}return!r(e)&&e};var o={year:(new Date).getFullYear(),month:(new Date).getMonth()+1,day:(new Date).getDate()};let i=(e,t,r)=>{if(!e)return;if("string"!==n(e))return;return t=void 0===t?",":t,r=void 0===r?"<br />":r,e.split(t).reduce(((e,t,n,a)=>(a.length-1===n?e+=t:e+=`${t}${r}`,e)),"")};String.prototype.warp=function(e,t){return i(this,e,t)};const c={version:"1.1.1",callback:(e,n)=>{if(e&&"function"==t(e)&&e(n))return e(n)},type:t,isNull:r,qs:e=>{let t="";return Object.keys(e).map(((n,r)=>{let a=e[n];"?"!==a&&"&"!==a||(a=encodeURIComponent(e[n])),t+=0===r?`${n}=${a}`:`&${n}=${a}`})),t},isIP:e=>{var t=e.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/g);return null!=t&&""!=t&&!(RegExp.$1>255||RegExp.$2>255||RegExp.$3>255||RegExp.$4>255)},throttle:(e,t,n)=>{t=null==t?300:t,n=null==n||n;var r,a,o,i=+new Date,c=[];return function(){clearTimeout(r),a=this,o=+new Date,c=Array.prototype.slice.call(arguments),n?(n=!1,e.apply(a,c)):o-i>t?(i=o,e.apply(a,c)):r=setTimeout((function(){e.apply(a,c)}),t)}},debounce:(e,t,n)=>{var r;return t=null==t?16.6:t,n=null==n||n,function(){var a=this,o=arguments;if(r&&clearTimeout(r),n){var i=!r;r=setTimeout((function(){e.apply(a,o)}),t),i&&e.apply(a,o)}else r=setTimeout((function(){e.apply(a,o)}),t)}},rda:function(e,t,n){if(t=void 0===t||t,e&&e.length>0){let r=new Set(e);if(e=Array.from(r),t){if(n){let t={};return e=e.reduce(((e,r)=>(r&&"object"==typeof r&&Object.hasOwn(r,n)?void 0===t[r[n]]&&(t[r[n]]=e.push(r)):e.push(r),e)),[]),Array.from(e)}return[...new Set(e.map(JSON.stringify))].map((e=>e?JSON.parse(e):e))}return e}return e},uuid:()=>{if("object"==typeof crypto){if("function"==typeof crypto.randomUUID)return crypto.randomUUID();if("function"==typeof crypto.getRandomValues&&"function"==typeof Uint8Array){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(e=>{const t=Number(e);return(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16)}))}}let e=(new Date).getTime(),t="undefined"!=typeof performance&&performance.now&&1e3*performance.now()||0;return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(n=>{let r=16*Math.random();return e>0?(r=(e+r)%16|0,e=Math.floor(e/16)):(r=(t+r)%16|0,t=Math.floor(t/16)),("x"===n?r:3&r|8).toString(16)}))},warp:i,dateFormatAny:a,today:function(e){e=void 0===e?"yyyy-MM-dd":e;var t=(new Date).getTime(),n=t;return[a(t,e),a(n,e)]},yesterday:function(e){e=void 0===e?"yyyy-MM-dd":e;var t=(new Date).getTime()-864e5,n=t;return[a(t,e),a(n,e)]},prevMonth:function(e){e=void 0===e?"yyyy-MM-dd":e;var t={};1===o.month?(t.year=o.year-1,t.month=12):(t.year=o.year,t.month=o.month-1),t.day=o.day;var n=new Date(t.year,t.month,0).getDate(),r=new Date("".concat(t.year,"-").concat(t.month,"-1")).getTime(),i=new Date("".concat(t.year,"-").concat(t.month,"-").concat(n)).getTime();return[a(r,e),a(i,e)]},thisMonth:function(e,t){t=void 0===t?"yyyy-MM-dd":t,e=!!e;var n=new Date(o.year,o.month,0).getDate(),r=new Date("".concat(o.year,"-").concat(o.month,"-1")).getTime(),i=new Date("".concat(o.year,"-").concat(o.month,"-").concat(e?o.day:n)).getTime();return[a(r,t),a(i,t)]},pastDays:function(e,t){t=void 0===t?"yyyy-MM-dd":t,e=void 0===e?30:e;var n=(new Date).getTime()-864e5*e,r=(new Date).getTime()-864e5;return[a(n,t),a(r,t)]}};return c}));
