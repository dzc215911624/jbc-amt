"use strict";var e=require("../global/type.js");module.exports=(t,g)=>{var l;if(l=t,t="string"===e.$type(l)?((l=l.replace(/T/g," ").replace(/\.[\d]{3}Z/,"").replace(/(-)/g,"/")).indexOf(".")>0&&(l=l.slice(0,l.indexOf("."))),new Date(l)):l,g=e.isNull(g)?"yyyy-MM-dd":g,!e.isNull(t)){let e={"M+":(t=new Date(t)).getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),S:t.getMilliseconds(),"q+":Math.floor((t.getMonth()+3)/3)},l={0:"日",1:"一",2:"二",3:"三",4:"四",5:"五",6:"六"};if(/(y+)/.test(g)&&(g=g.replace(RegExp.$1,(t.getFullYear()+"").substring(4-RegExp.$1.length))),/(W+)/.test(g)){let e="";e=RegExp.$1.length>1&&RegExp.$1.length>2?"星期":"周",g=g.replace(RegExp.$1,e+l[t.getDay().toString()+""])}for(var r in e)new RegExp("("+r+")").test(g)&&(g=g.replace(RegExp.$1,1==RegExp.$1.length?e[r]:("00"+e[r]).substring((""+e[r]).length)));return g}return!e.isNull(t)&&t};