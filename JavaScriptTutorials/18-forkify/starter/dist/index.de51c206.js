function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function n(e){return e&&e.__esModule?e.default:e}var r={},o={},i=t.parcelRequire3a11;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in o){var t=o[e];delete o[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},t.parcelRequire3a11=i),i.register("27Lyk",(function(t,n){var r,o;e(t.exports,"register",(()=>r),(e=>r=e)),e(t.exports,"resolve",(()=>o),(e=>o=e));var i={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)i[t[n]]=e[t[n]]},o=function(e){var t=i[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),i("27Lyk").register(JSON.parse('{"f9fpV":"index.de51c206.js","eyyUD":"icons.c14567a0.svg"}'));var a={},s=function(e){return e&&e.Math==Math&&e};a=s("object"==typeof globalThis&&globalThis)||s("object"==typeof window&&window)||s("object"==typeof self&&self)||s("object"==typeof t&&t)||function(){return this}()||Function("return this")();var c,u;c=!(u=function(e){try{return!!e()}catch(e){return!0}})((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}));var l,d,f,p={},h="object"==typeof document&&document.all,g=(f={all:h,IS_HTMLDDA:void 0===h&&void 0!==h}).all;p=f.IS_HTMLDDA?function(e){return"function"==typeof e||e===g}:function(e){return"function"==typeof e};var v,m={},y={};v=!u((function(){var e=function(){}.bind();return"function"!=typeof e||e.hasOwnProperty("prototype")}));var b=Function.prototype,_=b.call,w=v&&b.bind.bind(_,_);y=v?w:function(e){return function(){return _.apply(e,arguments)}};var k,E,S;S=function(e){return null==e};var O=TypeError;E=function(e){if(S(e))throw O("Can't call method on "+e);return e};var j=Object;k=function(e){return j(E(e))};var L=y({}.hasOwnProperty);m=Object.hasOwn||function(e,t){return L(k(e),t)};var $,F=Function.prototype,M=c&&Object.getOwnPropertyDescriptor,x=m(F,"name"),P={EXISTS:x,PROPER:x&&"something"===function(){}.name,CONFIGURABLE:x&&(!c||c&&M(F,"name").configurable)}.CONFIGURABLE,T={},H={},I=Object.defineProperty;$=function(e,t){try{I(a,e,{value:t,configurable:!0,writable:!0})}catch(n){a[e]=t}return t};var q="__core-js_shared__",N=a[q]||$(q,{});H=N;var A=y(Function.toString);p(H.inspectSource)||(H.inspectSource=function(e){return A(e)}),T=H.inspectSource;var C,R,D=a.WeakMap;R=p(D)&&/native code/.test(String(D));var U={},W=f.all;U=f.IS_HTMLDDA?function(e){return"object"==typeof e?null!==e:p(e)||e===W}:function(e){return"object"==typeof e?null!==e:p(e)};var z,G,B,J={},V=a.document,Y=U(V)&&U(V.createElement);B=function(e){return Y?V.createElement(e):{}},G=!c&&!u((function(){return 7!=Object.defineProperty(B("div"),"a",{get:function(){return 7}}).a}));var Q;Q=c&&u((function(){return 42!=Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}));var K,X=String,Z=TypeError;K=function(e){if(U(e))return e;throw Z(X(e)+" is not an object")};var ee,te,ne={},re=Function.prototype.call;ne=v?re.bind(re):function(){return re.apply(re,arguments)};var oe,ie={},ae=function(e){return p(e)?e:void 0};oe=function(e,t){return arguments.length<2?ae(a[e]):a[e]&&a[e][t]};var se={};se=y({}.isPrototypeOf);var ce,ue,le,de={};de=oe("navigator","userAgent")||"";var fe,pe,he=a.process,ge=a.Deno,ve=he&&he.versions||ge&&ge.version,me=ve&&ve.v8;me&&(pe=(fe=me.split("."))[0]>0&&fe[0]<4?1:+(fe[0]+fe[1])),!pe&&de&&(!(fe=de.match(/Edge\/(\d+)/))||fe[1]>=74)&&(fe=de.match(/Chrome\/(\d+)/))&&(pe=+fe[1]),le=pe,ue=!!Object.getOwnPropertySymbols&&!u((function(){var e=Symbol();return!String(e)||!(Object(e)instanceof Symbol)||!Symbol.sham&&le&&le<41})),ce=ue&&!Symbol.sham&&"symbol"==typeof Symbol.iterator;var ye=Object;ie=ce?function(e){return"symbol"==typeof e}:function(e){var t=oe("Symbol");return p(t)&&se(t.prototype,ye(e))};var be,_e,we,ke=String;we=function(e){try{return ke(e)}catch(e){return"Object"}};var Ee=TypeError;_e=function(e){if(p(e))return e;throw Ee(we(e)+" is not a function")},be=function(e,t){var n=e[t];return S(n)?void 0:_e(n)};var Se,Oe=TypeError;Se=function(e,t){var n,r;if("string"===t&&p(n=e.toString)&&!U(r=ne(n,e)))return r;if(p(n=e.valueOf)&&!U(r=ne(n,e)))return r;if("string"!==t&&p(n=e.toString)&&!U(r=ne(n,e)))return r;throw Oe("Can't convert object to primitive value")};var je;(je=function(e,t){return H[e]||(H[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.26.1",mode:"global",copyright:"© 2014-2022 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.26.1/LICENSE",source:"https://github.com/zloirock/core-js"});var Le,$e=0,Fe=Math.random(),Me=y(1..toString);Le=function(e){return"Symbol("+(void 0===e?"":e)+")_"+Me(++$e+Fe,36)};var xe=je("wks"),Pe=a.Symbol,Te=Pe&&Pe.for,He=ce?Pe:Pe&&Pe.withoutSetter||Le,Ie=TypeError,qe=function(e){if(!m(xe,e)||!ue&&"string"!=typeof xe[e]){var t="Symbol."+e;ue&&m(Pe,e)?xe[e]=Pe[e]:xe[e]=ce&&Te?Te(t):He(t)}return xe[e]}("toPrimitive");te=function(e,t){if(!U(e)||ie(e))return e;var n,r=be(e,qe);if(r){if(void 0===t&&(t="default"),n=ne(r,e,t),!U(n)||ie(n))return n;throw Ie("Can't convert object to primitive value")}return void 0===t&&(t="number"),Se(e,t)},ee=function(e){var t=te(e,"string");return ie(t)?t:t+""};var Ne=TypeError,Ae=Object.defineProperty,Ce=Object.getOwnPropertyDescriptor,Re="enumerable",De="configurable",Ue="writable";z=c?Q?function(e,t,n){if(K(e),t=ee(t),K(n),"function"==typeof e&&"prototype"===t&&"value"in n&&Ue in n&&!n[Ue]){var r=Ce(e,t);r&&r[Ue]&&(e[t]=n.value,n={configurable:De in n?n[De]:r[De],enumerable:Re in n?n[Re]:r[Re],writable:!1})}return Ae(e,t,n)}:Ae:function(e,t,n){if(K(e),t=ee(t),K(n),G)try{return Ae(e,t,n)}catch(e){}if("get"in n||"set"in n)throw Ne("Accessors not supported");return"value"in n&&(e[t]=n.value),e};var We;We=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}},J=c?function(e,t,n){return z(e,t,We(1,n))}:function(e,t,n){return e[t]=n,e};var ze,Ge=je("keys");ze=function(e){return Ge[e]||(Ge[e]=Le(e))};var Be={};Be={};var Je,Ve,Ye,Qe="Object already initialized",Ke=a.TypeError,Xe=a.WeakMap;if(R||H.state){var Ze=H.state||(H.state=new Xe);Ze.get=Ze.get,Ze.has=Ze.has,Ze.set=Ze.set,Je=function(e,t){if(Ze.has(e))throw Ke(Qe);return t.facade=e,Ze.set(e,t),t},Ve=function(e){return Ze.get(e)||{}},Ye=function(e){return Ze.has(e)}}else{var et=ze("state");Be[et]=!0,Je=function(e,t){if(m(e,et))throw Ke(Qe);return t.facade=e,J(e,et,t),t},Ve=function(e){return m(e,et)?e[et]:{}},Ye=function(e){return m(e,et)}}var tt=(C={set:Je,get:Ve,has:Ye,enforce:function(e){return Ye(e)?Ve(e):Je(e,{})},getterFor:function(e){return function(t){var n;if(!U(t)||(n=Ve(t)).type!==e)throw Ke("Incompatible receiver, "+e+" required");return n}}}).enforce,nt=C.get,rt=Object.defineProperty,ot=c&&!u((function(){return 8!==rt((function(){}),"length",{value:8}).length})),it=String(String).split("String"),at=d=function(e,t,n){"Symbol("===String(t).slice(0,7)&&(t="["+String(t).replace(/^Symbol\(([^)]*)\)/,"$1")+"]"),n&&n.getter&&(t="get "+t),n&&n.setter&&(t="set "+t),(!m(e,"name")||P&&e.name!==t)&&(c?rt(e,"name",{value:t,configurable:!0}):e.name=t),ot&&n&&m(n,"arity")&&e.length!==n.arity&&rt(e,"length",{value:n.arity});try{n&&m(n,"constructor")&&n.constructor?c&&rt(e,"prototype",{writable:!1}):e.prototype&&(e.prototype=void 0)}catch(e){}var r=tt(e);return m(r,"source")||(r.source=it.join("string"==typeof t?t:"")),e};Function.prototype.toString=at((function(){return p(this)&&nt(this).source||T(this)}),"toString"),l=function(e,t,n){return n.get&&d(n.get,t,{getter:!0}),n.set&&d(n.set,t,{setter:!0}),z(e,t,n)};var st;st=function(){var e=K(this),t="";return e.hasIndices&&(t+="d"),e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.unicodeSets&&(t+="v"),e.sticky&&(t+="y"),t};var ct=a.RegExp,ut=ct.prototype;c&&u((function(){var e=!0;try{ct(".","d")}catch(t){e=!1}var t={},n="",r=e?"dgimsy":"gimsy",o=function(e,r){Object.defineProperty(t,e,{get:function(){return n+=r,!0}})},i={dotAll:"s",global:"g",ignoreCase:"i",multiline:"m",sticky:"y"};for(var a in e&&(i.hasIndices="d"),i)o(a,i[a]);return Object.getOwnPropertyDescriptor(ut,"flags").get.call(t)!==r||n!==r}))&&l(ut,"flags",{configurable:!0,get:st});var lt,dt,ft,pt={}.propertyIsEnumerable,ht=Object.getOwnPropertyDescriptor,gt=ht&&!pt.call({1:2},1);ft=gt?function(e){var t=ht(this,e);return!!t&&t.enumerable}:pt;var vt,mt,yt={},bt=y({}.toString),_t=y("".slice);mt=function(e){return _t(bt(e),8,-1)};var wt=Object,kt=y("".split);yt=u((function(){return!wt("z").propertyIsEnumerable(0)}))?function(e){return"String"==mt(e)?kt(e,""):wt(e)}:wt,vt=function(e){return yt(E(e))};var Et,St=Object.getOwnPropertyDescriptor,Ot=dt=c?St:function(e,t){if(e=vt(e),t=ee(t),G)try{return St(e,t)}catch(e){}if(m(e,t))return We(!ne(ft,e,t),e[t])};Et=function(e,t,n,r){r||(r={});var o=r.enumerable,i=void 0!==r.name?r.name:t;if(p(n)&&d(n,i,r),r.global)o?e[t]=n:$(t,n);else{try{r.unsafe?e[t]&&(o=!0):delete e[t]}catch(e){}o?e[t]=n:z(e,t,{value:n,enumerable:!1,configurable:!r.nonConfigurable,writable:!r.nonWritable})}return e};var jt,Lt,$t,Ft,Mt,xt={},Pt={},Tt=Math.ceil,Ht=Math.floor;Pt=Math.trunc||function(e){var t=+e;return(t>0?Ht:Tt)(t)},Mt=function(e){var t=+e;return t!=t||0===t?0:Pt(t)};var It=Math.max,qt=Math.min;Ft=function(e,t){var n=Mt(e);return n<0?It(n+t,0):qt(n,t)};var Nt,At,Ct=Math.min;At=function(e){return e>0?Ct(Mt(e),9007199254740991):0},Nt=function(e){return At(e.length)};var Rt=function(e){return function(t,n,r){var o,i=vt(t),a=Nt(i),s=Ft(r,a);if(e&&n!=n){for(;a>s;)if((o=i[s++])!=o)return!0}else for(;a>s;s++)if((e||s in i)&&i[s]===n)return e||s||0;return!e&&-1}},Dt={includes:Rt(!0),indexOf:Rt(!1)}.indexOf,Ut=y([].push);$t=function(e,t){var n,r=vt(e),o=0,i=[];for(n in r)!m(Be,n)&&m(r,n)&&Ut(i,n);for(;t.length>o;)m(r,n=t[o++])&&(~Dt(i,n)||Ut(i,n));return i};var Wt,zt=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"].concat("length","prototype");Lt=Object.getOwnPropertyNames||function(e){return $t(e,zt)},Wt=Object.getOwnPropertySymbols;var Gt=y([].concat);xt=oe("Reflect","ownKeys")||function(e){var t=Lt(K(e));return Wt?Gt(t,Wt(e)):t},jt=function(e,t,n){for(var r=xt(t),o=z,i=dt,a=0;a<r.length;a++){var s=r[a];m(e,s)||n&&m(n,s)||o(e,s,i(t,s))}};var Bt={},Jt=/#|\.prototype\./,Vt=function(e,t){var n=Qt[Yt(e)];return n==Xt||n!=Kt&&(p(t)?u(t):!!t)},Yt=Vt.normalize=function(e){return String(e).replace(Jt,".").toLowerCase()},Qt=Vt.data={},Kt=Vt.NATIVE="N",Xt=Vt.POLYFILL="P";Bt=Vt,lt=function(e,t){var n,r,o,i,s,c=e.target,u=e.global,l=e.stat;if(n=u?a:l?a[c]||$(c,{}):(a[c]||{}).prototype)for(r in t){if(i=t[r],o=e.dontCallGetSet?(s=Ot(n,r))&&s.value:n[r],!Bt(u?r:c+(l?".":"#")+r,e.forced)&&void 0!==o){if(typeof i==typeof o)continue;jt(i,o)}(e.sham||o&&o.sham)&&J(i,"sham",!0),Et(n,r,i,e)}};var Zt,en={},tn=Function.prototype,nn=tn.apply,rn=tn.call;en="object"==typeof Reflect&&Reflect.apply||(v?rn.bind(nn):function(){return rn.apply(nn,arguments)});var on,an,sn=(an=function(e){if("Function"===mt(e))return y(e)})(an.bind);on=function(e,t){return _e(e),void 0===t?e:v?sn(e,t):function(){return e.apply(t,arguments)}};var cn={};cn=oe("document","documentElement");var un={};un=y([].slice);var ln,dn=TypeError;ln=function(e,t){if(e<t)throw dn("Not enough arguments");return e};var fn;fn=/(?:ipad|iphone|ipod).*applewebkit/i.test(de);var pn;pn="process"==mt(a.process);var hn,gn,vn,mn,yn=a.setImmediate,bn=a.clearImmediate,_n=a.process,wn=a.Dispatch,kn=a.Function,En=a.MessageChannel,Sn=a.String,On=0,jn={},Ln="onreadystatechange";try{hn=a.location}catch(e){}var $n=function(e){if(m(jn,e)){var t=jn[e];delete jn[e],t()}},Fn=function(e){return function(){$n(e)}},Mn=function(e){$n(e.data)},xn=function(e){a.postMessage(Sn(e),hn.protocol+"//"+hn.host)};yn&&bn||(yn=function(e){ln(arguments.length,1);var t=p(e)?e:kn(e),n=un(arguments,1);return jn[++On]=function(){en(t,void 0,n)},gn(On),On},bn=function(e){delete jn[e]},pn?gn=function(e){_n.nextTick(Fn(e))}:wn&&wn.now?gn=function(e){wn.now(Fn(e))}:En&&!fn?(mn=(vn=new En).port2,vn.port1.onmessage=Mn,gn=on(mn.postMessage,mn)):a.addEventListener&&p(a.postMessage)&&!a.importScripts&&hn&&"file:"!==hn.protocol&&!u(xn)?(gn=xn,a.addEventListener("message",Mn,!1)):gn=Ln in B("script")?function(e){cn.appendChild(B("script"))[Ln]=function(){cn.removeChild(this),$n(e)}}:function(e){setTimeout(Fn(e),0)});var Pn=(Zt={set:yn,clear:bn}).clear;lt({global:!0,bind:!0,enumerable:!0,forced:a.clearImmediate!==Pn},{clearImmediate:Pn});var Tn=Zt.set;lt({global:!0,bind:!0,enumerable:!0,forced:a.setImmediate!==Tn},{setImmediate:Tn});var Hn=function(e){var t,n=Object.prototype,r=n.hasOwnProperty,o=Object.defineProperty||function(e,t,n){e[t]=n.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function u(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{u({},"")}catch(e){u=function(e,t,n){return e[t]=n}}function l(e,t,n,r){var i=t&&t.prototype instanceof v?t:v,a=Object.create(i.prototype),s=new F(r||[]);return o(a,"_invoke",{value:O(e,n,s)}),a}function d(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=l;var f="suspendedStart",p="executing",h="completed",g={};function v(){}function m(){}function y(){}var b={};u(b,a,(function(){return this}));var _=Object.getPrototypeOf,w=_&&_(_(M([])));w&&w!==n&&r.call(w,a)&&(b=w);var k=y.prototype=v.prototype=Object.create(b);function E(e){["next","throw","return"].forEach((function(t){u(e,t,(function(e){return this._invoke(t,e)}))}))}function S(e,t){function n(o,i,a,s){var c=d(e[o],e,i);if("throw"!==c.type){var u=c.arg,l=u.value;return l&&"object"==typeof l&&r.call(l,"__await")?t.resolve(l.__await).then((function(e){n("next",e,a,s)}),(function(e){n("throw",e,a,s)})):t.resolve(l).then((function(e){u.value=e,a(u)}),(function(e){return n("throw",e,a,s)}))}s(c.arg)}var i;o(this,"_invoke",{value:function(e,r){function o(){return new t((function(t,o){n(e,r,t,o)}))}return i=i?i.then(o,o):o()}})}function O(e,t,n){var r=f;return function(o,i){if(r===p)throw new Error("Generator is already running");if(r===h){if("throw"===o)throw i;return x()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var s=j(a,n);if(s){if(s===g)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===f)throw r=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var c=d(e,t,n);if("normal"===c.type){if(r=n.done?h:"suspendedYield",c.arg===g)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=h,n.method="throw",n.arg=c.arg)}}}function j(e,n){var r=n.method,o=e.iterator[r];if(o===t)return n.delegate=null,"throw"===r&&e.iterator.return&&(n.method="return",n.arg=t,j(e,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),g;var i=d(o,e.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,g;var a=i.arg;return a?a.done?(n[e.resultName]=a.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,g):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function L(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function $(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function F(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(L,this),this.reset(!0)}function M(e){if(e){var n=e[a];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function n(){for(;++o<e.length;)if(r.call(e,o))return n.value=e[o],n.done=!1,n;return n.value=t,n.done=!0,n};return i.next=i}}return{next:x}}function x(){return{value:t,done:!0}}return m.prototype=y,o(k,"constructor",{value:y,configurable:!0}),o(y,"constructor",{value:m,configurable:!0}),m.displayName=u(y,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,u(e,c,"GeneratorFunction")),e.prototype=Object.create(k),e},e.awrap=function(e){return{__await:e}},E(S.prototype),u(S.prototype,s,(function(){return this})),e.AsyncIterator=S,e.async=function(t,n,r,o,i){void 0===i&&(i=Promise);var a=new S(l(t,n,r,o),i);return e.isGeneratorFunction(n)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},E(k),u(k,c,"Generator"),u(k,a,(function(){return this})),u(k,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},e.values=M,F.prototype={constructor:F,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach($),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function o(r,o){return s.type="throw",s.arg=e,n.next=r,o&&(n.method="next",n.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),g},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),$(n),g}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;$(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:M(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),g}},e}({});try{regeneratorRuntime=Hn}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=Hn:Function("r","regeneratorRuntime = r")(Hn)}const In="https://forkify-api.herokuapp.com/api/v2/recipes/",qn="ea3f3b00-1334-44de-839d-1dcec08bfee9",Nn=async function(e,t){try{const r=t?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e),o=await Promise.race([r,(n=10,new Promise((function(e,t){setTimeout((function(){t(new Error(`Request took too long! Timeout after ${n} second`))}),1e3*n)})))]),i=await o.json();if(!o.ok)throw new Error(`${i.message} (${o.status})`);return i}catch(e){throw e}var n},An={recipe:{},search:{query:"",results:[],resultsPerPage:10,page:0},bookmarks:[]},Cn=function(e){const{recipe:t}=e.data;return{id:t.id,title:t.title,publisher:t.publisher,sourceUrl:t.source_url,image:t.image_url,servings:t.servings,cookingTime:t.cooking_time,ingredients:t.ingredients,...t.key&&{key:t.key}}},Rn=function(e=An.search.page){An.search.page=e;let t=(e-1)*An.search.resultsPerPage,n=e*An.search.resultsPerPage;return An.search.results.slice(t,n)},Dn=function(){localStorage.setItem("bookmarks",JSON.stringify(An.bookmarks))},Un=function(e){An.bookmarks.push(e),e.id===An.recipe.id&&(An.recipe.bookmarked=!0),Dn()};!function(){const e=localStorage.getItem("bookmarks");e&&(An.bookmarks=JSON.parse(e))}(),console.log(An.bookmarks);var Wn,zn,Gn,Bn;Wn=new URL(i("27Lyk").resolve("eyyUD"),import.meta.url).toString();class Jn{_data;render(e,t=!0){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this._data=e;const n=this._generateMarkUp();if(!t)return n;this._clear(),this._parentEl.insertAdjacentHTML("afterbegin",n)}update(e){this._data=e;const t=this._generateMarkUp(),n=document.createRange().createContextualFragment(t),r=Array.from(n.querySelectorAll("*")),o=Array.from(this._parentEl.querySelectorAll("*"));r.forEach(((e,t)=>{const n=o[t];e.isEqualNode(n)||""===e.firstChild?.nodeValue.trim()||(n.textContent=e.textContent),e.isEqualNode(n)||Array.from(e.attributes).forEach((e=>{n.setAttribute(e.name,e.value)}))}))}_clear(){this._parentEl.innerHTML=""}renderSpinner(){const e=`\n        <div class="spinner">\n          <svg>\n            <use href="${n(Wn)}#icon-loader"></use>\n          </svg>\n        </div>\n        `;this._parentEl.innerHTML="",this._parentEl.insertAdjacentHTML("afterbegin",e)}renderMessage(e=this._message){const t=`\n        <div class="message">\n            <div>\n                <svg>\n                    <use href="${n(Wn)}#icon-smile"></use>\n                </svg>\n            </div>\n            <p>${e}</p>\n        </div>\n        `;this._parentEl.innerHTML="",this._parentEl.insertAdjacentHTML("afterbegin",t)}renderError(e=this._errorMessage){const t=`\n        <div class="error">\n            <div>\n                <svg>\n                    <use href="${n(Wn)}#icon-alert-triangle"></use>\n                </svg>\n            </div>\n            <p>${e}</p>\n        </div>\n        `;this._parentEl.innerHTML="",this._parentEl.insertAdjacentHTML("afterbegin",t)}}Fraction=function(e,t){if(void 0!==e&&t)"number"==typeof e&&"number"==typeof t?(this.numerator=e,this.denominator=t):"string"==typeof e&&"string"==typeof t&&(this.numerator=parseInt(e),this.denominator=parseInt(t));else if(void 0===t)if(num=e,"number"==typeof num)this.numerator=num,this.denominator=1;else if("string"==typeof num){var n,r,o=num.split(" ");if(o[0]&&(n=o[0]),o[1]&&(r=o[1]),n%1==0&&r&&r.match("/"))return new Fraction(n).add(new Fraction(r));if(!n||r)return;if("string"==typeof n&&n.match("/")){var i=n.split("/");this.numerator=i[0],this.denominator=i[1]}else{if("string"==typeof n&&n.match("."))return new Fraction(parseFloat(n));this.numerator=parseInt(n),this.denominator=1}}this.normalize()},Fraction.prototype.clone=function(){return new Fraction(this.numerator,this.denominator)},Fraction.prototype.toString=function(){if("NaN"===this.denominator)return"NaN";var e=this.numerator/this.denominator>0?Math.floor(this.numerator/this.denominator):Math.ceil(this.numerator/this.denominator),t=this.numerator%this.denominator,n=this.denominator,r=[];return 0!=e&&r.push(e),0!=t&&r.push((0===e?t:Math.abs(t))+"/"+n),r.length>0?r.join(" "):0},Fraction.prototype.rescale=function(e){return this.numerator*=e,this.denominator*=e,this},Fraction.prototype.add=function(e){var t=this.clone();return e=e instanceof Fraction?e.clone():new Fraction(e),td=t.denominator,t.rescale(e.denominator),e.rescale(td),t.numerator+=e.numerator,t.normalize()},Fraction.prototype.subtract=function(e){var t=this.clone();return e=e instanceof Fraction?e.clone():new Fraction(e),td=t.denominator,t.rescale(e.denominator),e.rescale(td),t.numerator-=e.numerator,t.normalize()},Fraction.prototype.multiply=function(e){var t=this.clone();if(e instanceof Fraction)t.numerator*=e.numerator,t.denominator*=e.denominator;else{if("number"!=typeof e)return t.multiply(new Fraction(e));t.numerator*=e}return t.normalize()},Fraction.prototype.divide=function(e){var t=this.clone();if(e instanceof Fraction)t.numerator*=e.denominator,t.denominator*=e.numerator;else{if("number"!=typeof e)return t.divide(new Fraction(e));t.denominator*=e}return t.normalize()},Fraction.prototype.equals=function(e){e instanceof Fraction||(e=new Fraction(e));var t=this.clone().normalize();e=e.clone().normalize();return t.numerator===e.numerator&&t.denominator===e.denominator},Fraction.prototype.normalize=(Gn=function(e){return"number"==typeof e&&(e>0&&e%1>0&&e%1<1||e<0&&e%-1<0&&e%-1>-1)},Bn=function(e,t){if(t){var n=Math.pow(10,t);return Math.round(e*n)/n}return Math.round(e)},function(){if(Gn(this.denominator)){var e=Bn(this.denominator,9),t=Math.pow(10,e.toString().split(".")[1].length);this.denominator=Math.round(this.denominator*t),this.numerator*=t}Gn(this.numerator)&&(e=Bn(this.numerator,9),t=Math.pow(10,e.toString().split(".")[1].length),this.numerator=Math.round(this.numerator*t),this.denominator*=t);var n=Fraction.gcf(this.numerator,this.denominator);return this.numerator/=n,this.denominator/=n,(this.numerator<0&&this.denominator<0||this.numerator>0&&this.denominator<0)&&(this.numerator*=-1,this.denominator*=-1),this}),Fraction.gcf=function(e,t){var n=[],r=Fraction.primeFactors(e),o=Fraction.primeFactors(t);return r.forEach((function(e){var t=o.indexOf(e);t>=0&&(n.push(e),o.splice(t,1))})),0===n.length?1:function(){var e,t=n[0];for(e=1;e<n.length;e++)t*=n[e];return t}()},Fraction.primeFactors=function(e){for(var t=Math.abs(e),n=[],r=2;r*r<=t;)t%r==0?(n.push(r),t/=r):r++;return 1!=t&&n.push(t),n},zn=Fraction;var Vn=new class extends Jn{_parentEl=document.querySelector(".recipe");_errorMessage="We could not find that recipe!, please try again";_message="Success";addHandlerRender(e){["hashchange","load"].forEach((t=>{window.addEventListener(t,e)}))}addHandlerBookmark(e){this._parentEl.addEventListener("click",(function(t){t.target.closest(".btn--bookmark")&&e()}))}addHandlerUpdateServings(e){this._parentEl.addEventListener("click",(function(t){const n=t.target.closest(".btn--update-servings");if(!n)return;const r=+n.dataset.updateTo;e(r)}))}_generateMarkUp(){return`\n    <figure class="recipe__fig">\n          <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />\n          <h1 class="recipe__title">\n            <span>${this._data.title}</span>\n          </h1>\n        </figure>\n\n        <div class="recipe__details">\n          <div class="recipe__info">\n            <svg class="recipe__info-icon">\n              <use href="${n(Wn)}#icon-clock"></use>\n            </svg>\n            <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>\n            <span class="recipe__info-text">minutes</span>\n          </div>\n          <div class="recipe__info">\n            <svg class="recipe__info-icon">\n              <use href="${n(Wn)}#icon-users"></use>\n            </svg>\n            <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>\n            <span class="recipe__info-text">servings</span>\n\n            <div class="recipe__info-buttons">\n              <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings-1}">\n                <svg>\n                  <use href="${n(Wn)}#icon-minus-circle"></use>\n                </svg>\n              </button>\n              <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings+1}">\n                <svg>\n                  <use href="${n(Wn)}#icon-plus-circle"></use>\n                </svg>\n              </button>\n            </div>\n          </div>\n          <div class="recipe__user-generated ${this._data.key?"":"hidden"}">\n            <svg>\n              <use href="${n(Wn)}#icon-user"></use>\n            </svg>\n          </div>\n          <button class="btn--round btn--bookmark">\n            <svg class="">\n              <use href="${n(Wn)}#icon-bookmark${this._data.bookmarked?"-fill":""}"></use>\n            </svg>\n          </button>\n        </div>\n\n        <div class="recipe__ingredients">\n          <h2 class="heading--2">Recipe ingredients</h2>\n          <ul class="recipe__ingredient-list">\n\n          ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}\n          </ul>\n        </div>\n\n        <div class="recipe__directions">\n          <h2 class="heading--2">How to cook it</h2>\n          <p class="recipe__directions-text">\n            This recipe was carefully designed and tested by\n            <span class="recipe__publisher">${this._data.publisher}</span>. Please check out\n            directions at their website.\n          </p>\n          <a\n            class="btn--small recipe__btn"\n            href="${this._data.sourceUrl}"\n            target="_blank"\n          >\n            <span>Directions</span>\n            <svg class="search__icon">\n              <use href="${n(Wn)}#icon-arrow-right"></use>\n            </svg>\n          </a>\n        </div>\n   `}_generateMarkupIngredient(e){return`\n    <li class="recipe__ingredient">\n      <svg class="recipe__icon">\n        <use href="${n(Wn)}#icon-check"></use>\n      </svg>\n      <div class="recipe__quantity">${e.quantity?new zn(e.quantity).toString():""}</div>\n      <div class="recipe__description">\n        <span class="recipe__unit">${e.unit}</span>\n        ${e.description}\n      </div>\n    </li>\n    `}};var Yn=new class extends Jn{_parentEl="";_generateMarkUp(){const e=window.location.hash.slice(1);return`\n    <li class="preview">\n        <a class="preview__link ${this._data.id===e?"preview__link--active":""}" href="#${this._data.id}">\n            <figure class="preview__fig">\n                <img src="${this._data.image}" alt="Test" />\n            </figure>\n            <div class="preview__data">\n                <h4 class="preview__title">${this._data.title}</h4>\n                <p class="preview__publisher">${this._data.publisher}</p>\n                <div class="preview__user-generated ${this._data.key?"":"hidden"}">\n                <svg>\n                  <use href="${n(Wn)}#icon-user"></use>\n                </svg>\n              </div>\n            </div>\n        </a>\n    </li>\n    `}};var Qn=new class extends Jn{_parentEl=document.querySelector(".bookmarks__list");_errorMessage="No bookmarks yet , find a nice recipe and bookmark it";addHandlerRender(e){window.addEventListener("load",e)}_generateMarkUp(){return this._data.map((e=>Yn.render(e,!1))).join("")}};var Kn=new class{_parentEl=document.querySelector(".search");getQuery(){const e=this._parentEl.querySelector(".search__field").value;return this._clearInput(),e}_clearInput(){this._parentEl.querySelector(".search__field").value=""}addHandlerRender(e){["submit","click"].map((t=>{this._parentEl.querySelector(".search__btn").addEventListener(t,(function(t){t.preventDefault(),e()}))}))}};var Xn=new class extends Jn{_parentEl=document.querySelector(".results");_errorMessage="No results Found for your query! Please try again";_generateMarkUp(){return this._data.map((e=>Yn.render(e,!1))).join("")}};var Zn=new class extends Jn{_parentEl=document.querySelector(".upload");_message="Recipe was successfully uploaded :)";_window=document.querySelector(".add-recipe-window");_overlay=document.querySelector(".overlay");_btnOpen=document.querySelector(".nav__btn--add-recipe");_btnClose=document.querySelector(".btn--close-modal");constructor(){super(),this._addHandlerShowWindow(),this._addHandlerHideWindow()}toggleWindow(){this._overlay.classList.toggle("hidden"),this._window.classList.toggle("hidden")}_addHandlerShowWindow(){this._btnOpen.addEventListener("click",this.toggleWindow.bind(this))}_addHandlerHideWindow(){this._btnClose.addEventListener("click",this.toggleWindow.bind(this)),this._overlay.addEventListener("click",this.toggleWindow.bind(this))}addHandlerUpload(e){this._parentEl.addEventListener("submit",(function(t){t.preventDefault();const n=[...new FormData(this)],r=Object.fromEntries(n);e(r)}))}_generateMarkUp(){}};var er=new class extends Jn{_parentEl=document.querySelector(".pagination");addHandlerClick(e){this._parentEl.addEventListener("click",(function(t){t.preventDefault();const n=t.target.closest(".btn--inline");if(!n)return;const r=+n.dataset.goto;e(r)}))}_generateMarkUp(){const e=this._data.page;let t=this._data.results.length/this._data.resultsPerPage;return t=Math.ceil(t),console.log(t),1===e&&t>1?`\n      <button class="btn--inline pagination__btn--next" data-goto="${e+1}">\n            <span>Page ${e+1}</span>\n            <svg class="search__icon">\n                <use href="${n(Wn)}#icon-arrow-right"></use>\n            </svg>\n        </button>\n      `:e===t&&t>1?`\n      <button class="btn--inline pagination__btn--prev" data-goto="${e-1}">\n            <svg class="search__icon">\n                <use href="${n(Wn)}#icon-arrow-left"></use>\n             </svg>\n            <span>Page ${e-1}</span>\n       </button>\n      `:e<t?`\n        <button class="btn--inline pagination__btn--prev" data-goto="${e-1}">\n              <svg class="search__icon">\n                  <use href="${n(Wn)}#icon-arrow-left"></use>\n               </svg>\n              <span>Page ${e-1}</span>\n        </button>\n        <button class="btn--inline pagination__btn--next" data-goto="${e+1}">\n            <span>Page ${e+1}</span>\n            <svg class="search__icon">\n                <use href="${n(Wn)}#icon-arrow-right"></use>\n            </svg>\n        </button>\n        `:""}};const tr=async function(){try{const e=window.location.hash.slice(1);if(!e)return;Vn.renderSpinner(),Xn.update(Rn()),Qn.update(An.bookmarks),await async function(e){try{const t=`${In}${e}?key=${qn}`,n=await Nn(t);An.recipe=Cn(n),An.bookmarks.some((t=>t.id===e))?An.recipe.bookmarked=!0:An.recipe.bookmarked=!1}catch(e){throw console.error(` 👎 : ${e} `),e}}(e),Vn.render(An.recipe)}catch(e){console.error(e),Vn.renderError()}ir()},nr=function(){Qn.render(An.bookmarks)},rr=async function(){try{Xn.renderSpinner();const e=Kn.getQuery();if(!e)return;await async function(e){try{const t=await Nn(`${In}?search=${e}&key=${qn}`);An.search.query=e,An.search.results=t.data.recipes.map((e=>({id:e.id,title:e.title,publisher:e.publisher,image:e.image_url,...e.key&&{key:e.key}}))),An.search.page=1}catch(e){throw console.error(` 👎 : ${e} `),e}}(e),Xn.render(Rn(1)),er.render(An.search)}catch(e){console.error(e)}},or=function(e){Xn.render(Rn(e)),er.render(An.search)},ir=function(e=An.recipe.servings){!function(e){An.recipe.ingredients.forEach((t=>{t.quantity=t.quantity*(e/An.recipe.servings)})),e&&(An.recipe.servings=e)}(e),Vn.update(An.recipe)},ar=function(){An.recipe.bookmarked?function(e){const t=An.bookmarks.findIndex((t=>t.id===e));An.bookmarks.splice(t,1),e===An.recipe.id&&(An.recipe.bookmarked=!1),Dn()}(An.recipe.id):Un(An.recipe),Vn.update(An.recipe),Qn.render(An.bookmarks)},sr=async function(e){try{Zn.renderSpinner(),await async function(e){try{const t=Object.entries(e).filter((e=>e[0].startsWith("ingredient")&&""!==e[1])).map((e=>{const t=e[1].split(",").map((e=>e.trim()));if(3!==t.length)throw new Error("Wrong Ingredient format please use the correct format :)");const[n,r,o]=t;return{quantity:n?+n:null,unit:r,description:o}})),n={title:e.title,source_url:e.sourceUrl,image_url:e.image,publisher:e.publisher,cooking_time:+e.cookingTime,servings:+e.servings,ingredients:t},r=await Nn(`${In}?key=${qn}`,n);An.recipe=Cn(r),console.log(An.recipe),Un(An.recipe)}catch(e){throw e}}(e),Vn.render(An.recipe),Zn.renderMessage(),Qn.render(An.bookmarks),window.history.pushState(null,"",`#${An.recipe.id}`),setTimeout((()=>{Zn.toggleWindow()}),2500)}catch(e){console.error(`😖😖 ${e}`),Zn.renderError(e.message)}};Qn.addHandlerRender(nr),Vn.addHandlerRender(tr),Vn.addHandlerUpdateServings(ir),Vn.addHandlerBookmark(ar),Kn.addHandlerRender(rr),er.addHandlerClick(or),Zn.addHandlerUpload(sr);
//# sourceMappingURL=index.de51c206.js.map