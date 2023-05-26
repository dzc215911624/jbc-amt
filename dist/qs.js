const e=e=>{let t="";return Object.keys(e).map(((n,o)=>{let $=e[n];"?"!==$&&"&"!==$||($=encodeURIComponent(e[n])),t+=0===o?`${n}=${$}`:`&${n}=${$}`})),t};export{e as default};
