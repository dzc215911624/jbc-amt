const t=/[.]/,e=function(e){if(!(e&&e.length>1))return e;let n;try{let r=Object.values(e).reduce(((e,n)=>(e.push(t.test(n)?n.toString().split(".")[1].length:0),e)),[]);n=Math.max(...r)}catch(t){n=0}return n},n=function(t,n){if(arguments.length<2)return t;let r,u;if(u=Object.values(arguments),r=Math.pow(10,e(u)),2===arguments.length)return Math.round(t*r+n*r)/r;if(arguments.length>2){let t=u.reduce(((t,e)=>t+=e*r),0);return Math.round(t)/r}},r=n,u=function(t,n){if(arguments.length<2)return t;let r,u;if(u=Object.values(arguments),r=Math.pow(10,e(u)),2===arguments.length)return Math.round(t*r-n*r)/r;if(arguments.length>2){let t=u.reduce(((t,e,n)=>(0===n?t=e*r:t-=e*r,t)),0);return Math.round(t)/r}},l=u;export{r as floatJia,l as floatJian,u as floatMin,n as floatSum,e as getFloatRightLongest};