!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const r=n(1);window.app=r("myApp"),window.app.component("app",(function(e){return{template:'<div>{{testVar.toUpperCase()}}<sub-component thing="{{thing1}}" ></sub-component><sub-component thing="{{thing2}}"></sub-component></div>',controller:function(e,t,n){e.testVar="app controller",e.thing1="thing1",e.thing2="thing2"}}})),window.app.component("sub-component",(function(e){return{template:"<h1>{{thing.toUpperCase()}}</h1>",controller:function(e,t,n){e.thing=n.thing}}}))},function(e,t,n){(function(){var t,n,r,i,o,a;a=function(e,t){return parseInt(((new Date).valueOf()-new Date(2020,0,1).valueOf()).toString().concat(Math.floor(9999*Math.random())).split("").reverse().join("")).toString(e||36)},i=function(e){var t,n;if(void 0===e)return 0;for(t=5381,n=e.length;n;)t=33*t^e.charCodeAt(--n);return t},o=function(e){var t,n,r;for(n in t={},e)r=e[n],/^\$/.test(n)||(t[n]=i(JSON.stringify(r)));return t},t=function(){var e,t;return e={},t=[],{$on:function(t,n){return e[t]=e[t]||[],e[t].push(n)},$once:function(n,r){var i;return e[n]=e[n]||[],i=async function(e){var n;return n=await r(e),t.push(i),n},e[n].push(i)},$off:function(t,n){return e[t]=e[t]||[],e[t].splice(e[t].indexOf(n),1)},$call:async function(n,r){var i,o,a,u,l,s;if(e[n])for(o=0,u=(s=e[n]).length;o<u;o++)i=s[o],await i(r);for(a=0,l=t.length;a<l;a++)i=t[a],e[n].splice(e[n].indexOf(i),1);return t=[]}}},n=function(){var e;return e=navigator.userAgent.toLowerCase(),{mobile:/mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(e),browser:(e=/(chrome|firefox)[ \/]([\w.]+)/.exec(e)||/(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(e)||/(android)(?:.*version)?[ \/]([\w.]+)/.exec(e)||/(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||/(trident).+rv:(\w.)+/.exec(e)||[])[1],version:e[2]}},r=function(e){var r,u,l,s,c,f,p,d,h,$,g,v,m,w,b,y,N,x,T,O,C,A,S,M,L,E,H,j;return A=null,f={},p=[],M={},L={},d=n(),l=t(),u=!1,b=function(e,t){var n,r;if(e===(t=t||A))return"root";for(n="";e!==t;){for(n+=e.tagName+":",r=e;r.previousSibling;)n+=r.tagName+"@",r=r.previousSibling;e=e.parentNode}return n},$=function(e,t){return console.log("ft",e),e.replace(/\{\{(.+?)\}\}/g,(function(e,n){var r;return console.log("fill template",n,t),void 0===(r=h(n,t))?"":(console.log("returning",r),r)}))},y=function(e,t,n){var r,i,o;for(r in n=n||[],i=[],t)o=t[r],n.includes(r)?i.push(void 0):i.push(e[r]=o);return i},c=async function(){var e,t,n,r,i;for(e in r=[],M)i=M[e],0===p.filter((function(t){return t.scope===e})).length?(null!=(t=i.$parent)&&t.$children.splice(null!=(n=i.$parent)?n.$children.indexOf(e):void 0,1),await i.$call("teardown"),r.push(delete M[i.$id])):r.push(void 0);return r},j=async function(e){var t,n,r,i,a,u,l,c,f,d,h,$,v,m;for(a=0;e.length>a+1;){for(i=e.length;i-- >a;)e[i].$isDescendantOf(e[0])?e.splice(i,1):e[i].$isAncestorOf(e[0])&&(e[0]=e[i],e.splice(i,1));a++}for(m=function(e,t){var n,r,i,a,u,l,s,c;for(i in u=o(e))u[i]!==(null!=(l=e.$hash)?l[i]:void 0)?void 0!==t[i]&&(t[i]=e[i]):void 0!==t[i]&&(e[i]=t[i]);for(e.$hash=u,c=[],r=0,a=(s=e.$children).length;r<a;r++)n=s[r],c.push(m(n,t));return c},f=document.createElement("div"),c=[],d=p[0],f.innerHTML=d.html,await x(f,f,0,c),v=c.filter((function(e){return/^UNKNOWN@/.test(e.id)})),r=[],v.forEach((function(e){var t;if(t=e.id.replace(/UNKNOWN@\w+:[\w@]+@/,""),!r.includes(t))return r.push(t)})),u=0,l=r.length;u<l;u++)t=r[u],(n=p.filter((function(e){return e.id===t}))[0])&&($=M[n.scope],await H(t),n.elem.innerHTML=n.html,await C(n.elem,$));for(h=function(e){var t,n,r,i,o,a,u,l,s,c,f,d,$,g,v,m,w;for(i=0,a=(r=p.filter((function(t){return t.scope===e.$id}))).length;i<a;i++){for(m=0,o=0,u=(d=(n=r[i]).elem.childNodes).length;o<u;o++)(f=d[o]).nodeType===document.TEXT_NODE&&f.replaceWith(n.textNodes[m++]||"");for(c in $=n.attributes)w=$[c],n.elem.setAttribute(c,w)}for(v=[],s=0,l=(g=e.$children).length;s<l;s++)t=g[s],v.push(h(t));return v},i=e.length;i-- >0;)m(e[i],{}),h(e[i]),await e[i].$callChildren("update");await g(),await s(),f=null},S=function(e,t,n,r){var i,o,a,u,l,s,c,f,p,d,$,g,v,m,w,b;for(v=h(t,r),[],b=[],a=null,g=null,$=0,o=u=0,f=(m=t.split("")).length;u<f;o=++u)d=m[o],a?d===g?0===--$&&(Object.assign(b[b.length-1],{endIndex:o,endPath:t.substr(0,o+1)}),a=null,g=null):d===a&&$++:"["===d?($++,a="[",g="]",b.push({type:a+g,index:o,path:t.substr(0,o)})):"("===d?($++,a="(",g=")",b.push({type:a+g,index:o,path:t.substr(0,o)})):"."===d&&b.push({type:"object",index:o,path:t.substr(0,o)});for(v=null,l=0,p=b.length;l<p;l++)"object"===(w=b[l]).type&&void 0===(v=h(w.path,r))&&(v=h("this."+w.path+"={}",r)),"[]"===w.type&&void 0===(v=h(w.endPath,r))&&(v=h("this."+w.path+"=[]",r));return s=(c=b[b.length-1])?(c.lastIndex||c.index)+1:0,i=t.substr(s),"get"===e?(v||r)[i]:((v||r)[i]=n,n)},C=async function(e,t){var n,r,i,o,a,u,l,s;for(r=[],i=0,a=(l=e.children).length;i<a;i++)n=l[i],r.push(n);for(s=[],o=0,u=r.length;o<u;o++)n=r[o],s.push(await O(n,t));return s},O=async function(e,t){var n,i,a,u,l,s,c,d,h,$,g,m,w,y,N,x,T,A,S;for(x=null,M[t.$id]=t,t.$hash=o(t),t.$phase="render",t.$call("bootstrap"),c=e.innerHTML,S=[],a={},s={},h=0,g=(T=e.childNodes).length;h<g;h++)(N=T[h]).nodeType===document.TEXT_NODE&&S.push(N.data);for($=0,m=(A=e.getAttributeNames()).length;$<m;$++)if(a[n=A[$]]=e.getAttribute(n),i=f[n.toUpperCase()]){if("function"==typeof i.pre&&(w=await i.pre(t,e,v(e,t))),void 0!==w&&(e.removeAttribute(n),x="PREX:"+b(e),w))if(w.length){for(d=w.length;d-- >0;)(u=e.cloneNode()).innerHTML=e.innerHTML,e.parentNode.insertBefore(u,e.nextSibling),O(u,w[d]);e.innerHTML="",e.parentNode.removeChild(e)}else e.innerHTML="",0===w.length&&e.parentNode.removeChild(e);e.setAttribute("checkattrs",!0)}return e.parentNode&&(l=f[e.tagName])&&(y=r(t),M[(t=y).$id]=t,l.controller&&(s=l.controller(t,e,v(e,t.$parent))),t.$hash=o(t),e.innerHTML=l.template?l.template:c,e.innerHTML=e.innerHTML.replace("<children></children>",c)),p.push({id:x||b(e),elem:e,scope:t.$id,html:c,textNodes:S,attributes:a,data:s}),await C(e,t)},T=async function(e,t,n){var r,i,o,a,u,l,s,c;for(i=[],o=0,u=(s=e.children).length;o<u;o++)r=s[o],i.push(r);for(c=[],a=0,l=i.length;a<l;a++)r=i[a],c.push(await x(r,t,0,n));return c},x=async function(e,t,n,r){var i,o,a,u,l,s,c,d,h,$,g,m,w,y,N;if(d=b(e,t),m="PREX:"+d,s=e.innerHTML,a={},w=p.filter((function(e){return e.id===d||e.id===m}))[n],null!=(N=M[null!=w?w.scope:void 0])&&(N.$phase="prerender"),w||N){for(h=0,$=(y=e.getAttributeNames()).length;h<$;h++)if(a[i=y[h]]=e.getAttribute(i),(o=f[i.toUpperCase()])&&("function"==typeof o.pre&&(g=await o.pre(N,e,v(e))),void 0!==g&&g))if(g.length){for(c=g.length;c-- >0;)g[c].$parent.$children.splice(g[c].$parent.$children.indexOf(g[c],1)),(u=e.cloneNode()).innerHTML=e.innerHTML,u.removeAttribute(i),e.parentNode.insertBefore(u,e.nextSibling),await x(u,t,c-1,r);e.parentNode.removeChild(e)}else if(0===g.length)return r.push({id:"UNKNOWN@H1:H1@"+b(e.parentNode,t)}),void e.parentNode.removeChild(e);return(l=f[e.tagName])&&(e.innerHTML=l.template?l.template:s,e.innerHTML=e.innerHTML.replace("<children></children>",s)),r.push({id:d}),await T(e,t,r)}r.push({id:"UNKNOWN@"+d})},g=function(){var e,t,n,r,i,o,a,u;for(e=p.length;e-- >0;)for(t=0,n=(o=p[e].elem.getAttributeNames()).length;t<n;t++)r=o[t],/\{\{/.test(u=p[e].elem.getAttribute(r))&&(p[e].elem.setAttribute(r,$(u,M[p[e].scope])),console.log("attr",p[e].elem.getAttribute(r)));for(e=p.length,a=[];e-- >0;)a.push(function(){var t,n,r,o;for(o=[],t=0,n=(r=p[e].elem.childNodes).length;t<n;t++)(i=r[t]).nodeType===document.TEXT_NODE&&/\{\{/.test(i.data)?(console.log(i.data),o.push(i.replaceWith($(i.data,M[p[e].scope])))):o.push(void 0);return o}());return a},s=function(){var e,t,n,r,i,o,a;for(a=[],i=0,o=p.length;i<o;i++)(r=p[i]).elem.getAttribute("checkattrs")?(r.elem.removeAttribute("checkattrs"),a.push(function(){var i,o,a,u;for(u=[],i=0,o=(a=r.elem.getAttributeNames()).length;i<o;i++)e=a[i],(t=f[e.toUpperCase()])?("function"==typeof(n=t.post||t)&&n(M[r.scope],r.elem,v(r.elem)),u.push(r.elem.removeAttribute(e))):u.push(void 0);return u}())):a.push(void 0);return a},w=function(e){var t,n;return(n=L[e])?n:(t=f[e.toUpperCase()])?(L[e]={fn:(t.service||t)(),scopes:[]},L[e]):null},{appName:e,render:async function(t,n){return u||(await l.$call("bootstrap"),u=!0),t=t||document.querySelector("[app="+e+"]"),A=A||t,n=n||r(),await O(t,n),await g(),await s(),l.$call("rendered")},$renderChildren:async function(e,t){return await C(e,t),await g(),await s(),l.$call("renderedChildren")},component:function(e,t){var n;if("object"==typeof e)for(n in e)t=e[n],f[n.toUpperCase()]=t(this),this.$appendStyles(f[n.toUpperCase()].styles);else f[e.toUpperCase()]=t(this),this.$appendStyles(f[e.toUpperCase()].styles);return this},Scope:r=function(e){var n,r,i,u;return i=t(),u=[],n=[],r={$id:a(),$children:[],$parent:null,$environment:d,$update:async function(e,t){var n,r,i,a,u;for(i=this;i.$parent;){for(n in e)void 0!==(r=m(n,i))?(a=r===m(n,i.$parent),E(n,e[n],i),a||delete e[n]):delete e[n];i=i.$parent}return u=Object.values(M).filter((function(e){return JSON.stringify(e.$hash)!==JSON.stringify(o(e))})),await j(u)},$use:function(e){var t,n;return(n=L[e])?(this[e]=n.fn,n.scopes.push(this.$id)):(t=f[e.toUpperCase()])&&(L[e]={fn:(t.service||t)(),scopes:[this.$id]},this[e]=L[e].fn),this.$on("teardown",(function(){return L[e].scopes.splice(L[e].scopes.indexOf(this.$id),1)}))},$on:i.$on,$once:i.$once,$off:i.$off,$call:i.$call,$callChildren:async function(e,t){var n,r,o,a;for(await i.$call(e,t),r=0,o=(a=this.$children).length;r<o;r++)(n=a[r])&&await n.$callChildren(e,t);return null},$isDescendantOf:function(e){var t;if(e.$id===this.$id)return!1;for(t=this;t.$parent;){if(t.$id===e.$id)return!0;t=t.$parent}return!1},$isAncestorOf:function(e){var t;return e.$id!==this.$id&&(t=function(n){var r,i,o,a;if(n.$id===e.$id)return!0;for(i=0,o=(a=n.$children).length;i<o;i++)if(r=a[i],t(r))return!0;return!1})(e)},$offset:N,$timeout:function(e,t){return 0===u.length&&i.$on("teardown",(function(){var e,t,n,r;for(n=[],e=0,t=u.length;e<t;e++)r=u[e],n.push(window.clearTimeout(r));return n})),u.push(window.setTimeout(e,t))},$interval:function(e,t){return 0===n.length&&i.$on("teardown",(function(){var e,t,r,i;for(i=[],t=0,r=n.length;t<r;t++)e=n[t],i.push(window.clearTimeout(e));return i})),n.push(window.setTimeout(e,t))},$addEventListeners:function(e,t,n){var r,i,o;for("string"==typeof t&&(t=[t]),r=0,i=t.length;r<i;r++)o=t[r],e.addEventListener(o,n);return this.$on("teardown",(function(){var r,i,a;for(a=[],r=0,i=t.length;r<i;r++)o=t[r],a.push(e.removeEventListener(o,n));return a}))}},e&&e.$id&&(e.$children.push(r),r.$parent=e),y(r,e,Object.keys(r)),r},Callbacks:t,$getComponents:function(){return f},$getElements:function(){return p},$getServices:function(){return L},$getScopes:function(){return M},$eval:h=function(e,t){try{return new Function(`with(this) {return ${e}}`).call(t)}catch(e){}},$offset:N=function(e){var t;for(t={x:0,y:0,w:e.offsetWidth,h:e.offsetHeight};e.parentNode;)t.x+=e.offsetLeft,t.y+=e.offsetTop,e=e.parentNode;return t},$setScopeVar:E=function(e,t,n){return S("set",e,t,n)},$getScopeVar:m=function(e,t){return S("get",e,null,t)},$getElement:function(e){var t;return t=b(e),p.filter((function(e){return e.id===t}))[0]},$getProps:v=function(e,t){var n;return n={},e.getAttributeNames().forEach((function(r){return n[r]=t?$(e.getAttribute(r),t):e.getAttribute(r)})),n},$teardown:async function(e){var t;return t=new RegExp(e+"$"),p=p.filter((function(e){return!t.test(e.id)})),await c()},$teardownChildren:H=async function(e){var t;return t=new RegExp(".+"+e+"$"),p=p.filter((function(e){return!t.test(e.id)})),await c()},$on:l.$on,$once:l.$once,$off:l.$off,$hash:i,$hashObject:o,$makeId:b,$addClass:function(e,t){var n,r,i;for("string"==typeof t&&(t=[t]),r=0,i=t.length;r<i;r++)n=t[r],this.$removeClass(e,n),e.className+=" "+n;return null},$removeClass:function(e,t){var n,r,i,o;for("string"==typeof t&&(t=[t]),r=0,i=t.length;r<i;r++)n=t[r],o=new RegExp("\\s*\\b"+n+"\\b","g"),e.className=e.className.replace(o,"");return null},$update:function(e){var t;if(t=w(e))return j(t.scopes)},$appendStyles:function(e){var t;if(e)return(t=document.createElement("style")).innerText=e,document.querySelector("head").append(t)}}},e.exports=r}).call(this)}]);