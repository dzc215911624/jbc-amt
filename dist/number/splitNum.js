const t=(t,d,e)=>{e=void 0===e?",":e;let n=t,o="",a="",i=0,r=~~"1".padEnd((d=void 0===d?3:d)+1,"0");do{i=n%r,n/=r,a=~~i,o=(n>=1?`${a}`.padStart(d,"0"):a)+(o?`${e}${o}`:"")}while(n>=1);const s=`${t}`;let l=s.indexOf(".");return l>=0&&(o+=s.substring(l)),o};export{t as default};
