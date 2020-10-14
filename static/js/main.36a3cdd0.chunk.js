(this["webpackJsonpreact-un-practice"]=this["webpackJsonpreact-un-practice"]||[]).push([[0],{12:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},13:function(e,t,n){e.exports=n(21)},18:function(e,t,n){},20:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(11),o=n.n(c),u=(n(18),function(e){var t=e.children,n=e.providers;return(void 0===n?[]:n).reduceRight((function(e,t){return a.a.createElement(t,null,e)}),a.a.createElement(a.a.Fragment,null,t))});u.displayName="Combine";var l,i=u,s=n(6),m=Symbol("reducer"),d=Symbol("actions"),p=Symbol("integrated"),b=(l=[m,d,p],function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return l.reduce((function(e,n){var r=t.flatMap((function(e){var t;return null!==(t=e[n])&&void 0!==t?t:[]}));return[].concat(Object(s.a)(e),Object(s.a)(r))}),[])}),f=n(3),C=n(2),v=n(4),h=n(1),y=function(e){var t=e.initial,n=e.name,r=e.reducer,c=Object(v.a)((function(){return a.a.useReducer(r,t)}));return n&&(c.Provider.displayName="[REDUCER] ".concat(n)),c},E=Symbol("increment"),O=Symbol("set"),j=y({initial:{counter:0},name:"Counter",reducer:function(e,t){switch(t.type){case E:return Object(h.a)(Object(h.a)({},e),{},{counter:e.counter+1});case O:return Object(h.a)(Object(h.a)({},e),{},{counter:t.payload});default:return e}}}),k=Object(v.a)((function(){var e=j.useContainer(),t=Object(C.a)(e,2)[1];return Object.freeze({increment:a.a.useCallback((function(){return t({type:E})}),[t]),set:a.a.useCallback((function(e){return t({type:O,payload:e})}),[t])})}));k.Provider.displayName="CounterAction";var g,w=k,N=(g={},Object(f.a)(g,d,w.Provider),Object(f.a)(g,m,j.Provider),g),A=n(7),F=n.n(A),S=n(9),x=Symbol("add"),P=Symbol("clear"),D=y({initial:{items:[]},name:"Fetch",reducer:function(e,t){switch(t.type){case x:return Object(h.a)(Object(h.a)({},e),{},{items:[].concat(Object(s.a)(e.items),[t.payload])});case P:return Object(h.a)(Object(h.a)({},e),{},{items:[]});default:return e}}}),R=function(){var e=Object(S.a)(F.a.mark((function e(){var t,n;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Date.now(),n=new Request("https://api.github.com/users/danmaq/repos"),e.next=4,fetch(n);case 4:return e.next=6,e.sent.json();case 6:return e.abrupt("return",Date.now()-t);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),z=Object(v.a)((function(){var e=j.useContainer(),t=Object(C.a)(e,1)[0].counter,n=D.useContainer(),r=Object(C.a)(n,2)[1];return Object.freeze({addAsync:a.a.useCallback(Object(S.a)(F.a.mark((function e(){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=r,e.t1=x,e.next=4,R();case 4:return e.t2=e.sent,e.t3=t,e.t4={time:e.t2,counter:e.t3},e.t5={type:e.t1,payload:e.t4},e.abrupt("return",(0,e.t0)(e.t5));case 9:case"end":return e.stop()}}),e)}))),[t,r]),clear:a.a.useCallback((function(){return r({type:P})}),[r])})}));z.Provider.displayName="FetchAction";var M,I=z,q=b(N,(M={},Object(f.a)(M,d,I.Provider),Object(f.a)(M,m,D.Provider),M)),B=function(e){var t=e.children;return a.a.createElement(i,{providers:q},t)};B.displayName="Contexts";var J=B,W=n(12),H=n.n(W),T=function(e){var t=e.counter,n=e.onChangeCounter,r=e.onClickAdd;return a.a.createElement("section",null,a.a.createElement("p",null,"Counter: ",a.a.createElement("strong",null,t)),a.a.createElement("label",{htmlFor:"counter"},"Set counter:",a.a.createElement("input",{defaultValue:t,id:"counter",name:"counter",onChange:n,type:"number"})),a.a.createElement("button",{onClick:r,type:"button"},"+1"))};T.displayName="CounterDOM";var U=function(){var e=function(){var e=w.useContainer(),t=e.increment,n=e.set,r=j.useContainer(),c=Object(C.a)(r,1)[0].counter;return Object.freeze({counter:c,onChangeCounter:a.a.useCallback((function(e){return n(Number.parseInt(e.currentTarget.value,10))}),[n]),onClickAdd:t})}(),t=e.counter,n=e.onChangeCounter,r=e.onClickAdd;return a.a.createElement(T,{counter:t,onChangeCounter:n,onClickAdd:r})};U.displayName="Counter";var V=U,$=function(e){var t=e.items,n=void 0===t?[]:t,r=e.onClickClear,c=e.onClickFetch;return a.a.createElement("section",null,a.a.createElement("button",{onClick:c,type:"button"},"Fetch to \u201capi.github.com\u201d"),a.a.createElement("button",{onClick:r,type:"button"},"Clear the history"),a.a.createElement("ol",null,n.length?n.map((function(e,t){var n=e.counter,r=e.time;return a.a.createElement("li",{key:t},"It took ",a.a.createElement("strong",null,r,"ms")," to fetch, and the counter was \u201c",a.a.createElement("strong",null,n),"\u201d.")})):a.a.createElement("li",null,"Empty data")))};$.displayName="FetchDOM";var G=function(){var e=function(){var e=I.useContainer(),t=e.addAsync,n=e.clear,r=D.useContainer(),a=Object(C.a)(r,1)[0].items;return Object.freeze({items:a,onClickClear:n,onClickFetch:t})}(),t=e.items,n=e.onClickClear,r=e.onClickFetch;return a.a.createElement($,{items:t,onClickClear:n,onClickFetch:r})};G.displayName="Fetch";var K=G,L=(n(20),function(){return a.a.createElement(J,null,a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement("img",{src:H.a,className:"App-logo",alt:"logo"}),a.a.createElement("p",null,"Hello, world!"),a.a.createElement(V,null),a.a.createElement(K,null))))});L.displayName="App";var Q=L;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(Q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[13,1,2]]]);
//# sourceMappingURL=main.36a3cdd0.chunk.js.map