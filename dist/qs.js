"use strict";module.exports=e=>{let t="";return Object.keys(e).map(((o,n)=>{let r=e[o];"?"!==r&&"&"!==r||(r=encodeURIComponent(e[o])),t+=0===n?`${o}=${r}`:`&${o}=${r}`})),t};
