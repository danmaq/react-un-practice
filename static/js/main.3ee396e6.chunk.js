(this["webpackJsonpreact-un-practice"]=this["webpackJsonpreact-un-practice"]||[]).push([[0],{111:function(e,t,n){},112:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(33),o=n.n(c),u=(n(41),function(e){var t=e.children,n=e.providers;return(void 0===n?[]:n).reduceRight((function(e,t){return a.a.createElement(t,null,e)}),a.a.createElement(a.a.Fragment,null,t))});u.displayName="Combine";var i,l=u,s=n(8),m=Symbol("reducer"),d=Symbol("actions"),p=Symbol("integrated"),f=(i=[m,d,p],function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return i.reduce((function(e,n){var r=t.flatMap((function(e){var t;return null!==(t=e[n])&&void 0!==t?t:[]}));return[].concat(Object(s.a)(e),Object(s.a)(r))}),[])}),b=n(1),v=n(4),C=n(5),h=n(2),y=n(34),E=n.n(y),O=function(e){return Object.freeze((function(t,n){return r=t,a=e(t,n),E()(r,a)?r:a;var r,a}))},j=function(e){var t=e.deepEquals,n=e.initial,r=e.name,c=e.reducer,o=Object(C.a)((function(){return a.a.useReducer(t?O(c):c,n)}));return r&&(o.Provider.displayName="[REDUCER] ".concat(r)),o},k=Symbol("increment"),g=Symbol("set"),w=j({initial:{counter:0},name:"Counter",reducer:function(e,t){switch(t.type){case k:return Object(h.a)(Object(h.a)({},e),{},{counter:e.counter+1});case g:return Object(h.a)(Object(h.a)({},e),{},{counter:t.payload});default:return e}}}),N=Object(C.a)((function(){var e=w.useContainer(),t=Object(v.a)(e,2)[1];return Object.freeze({increment:a.a.useCallback((function(){return t({type:k})}),[t]),set:a.a.useCallback((function(e){return t({type:g,payload:e})}),[t])})}));N.Provider.displayName="CounterAction";var A,F=N,P=(A={},Object(b.a)(A,d,F.Provider),Object(b.a)(A,m,w.Provider),A),S=n(9),x=n.n(S),z=n(20),D=Symbol("add"),R=Symbol("clear"),M=j({initial:{items:[]},name:"Fetch",reducer:function(e,t){switch(t.type){case D:return Object(h.a)(Object(h.a)({},e),{},{items:[].concat(Object(s.a)(e.items),[t.payload])});case R:return Object(h.a)(Object(h.a)({},e),{},{items:[]});default:return e}}}),q=function(){var e=Object(z.a)(x.a.mark((function e(){var t,n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Date.now(),n=new Request("https://api.github.com/users/danmaq/repos"),e.next=4,fetch(n);case 4:return e.next=6,e.sent.json();case 6:return e.abrupt("return",Date.now()-t);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),I=Object(C.a)((function(){var e=w.useContainer(),t=Object(v.a)(e,1)[0].counter,n=M.useContainer(),r=Object(v.a)(n,2)[1];return Object.freeze({addAsync:a.a.useCallback(Object(z.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=r,e.t1=D,e.next=4,q();case 4:return e.t2=e.sent,e.t3=t,e.t4={time:e.t2,counter:e.t3},e.t5={type:e.t1,payload:e.t4},e.abrupt("return",(0,e.t0)(e.t5));case 9:case"end":return e.stop()}}),e)}))),[t,r]),clear:a.a.useCallback((function(){return r({type:R})}),[r])})}));I.Provider.displayName="FetchAction";var B,J=I,W=(B={},Object(b.a)(B,d,J.Provider),Object(b.a)(B,m,M.Provider),B),H=Object(C.a)((function(){return a.a.useEffect((function(){return console.log("** Effected the foo! **")}),[])}));H.Provider.displayName="FooAction";var T=f(P,W,Object(b.a)({},d,H.Provider)),U=function(e){var t=e.children;return a.a.createElement(l,{providers:T},t)};U.displayName="Contexts";var V=U,$=n(35),G=n.n($),K=function(e){var t=e.counter,n=e.onChangeCounter,r=e.onClickAdd;return a.a.createElement("section",null,a.a.createElement("p",null,"Counter: ",a.a.createElement("strong",null,t)),a.a.createElement("label",{htmlFor:"counter"},"Set counter:",a.a.createElement("input",{defaultValue:t,id:"counter",name:"counter",onChange:n,type:"number"})),a.a.createElement("button",{onClick:r,type:"button"},"+1"))};K.displayName="CounterDOM";var L=function(){var e=function(){var e=F.useContainer(),t=e.increment,n=e.set,r=w.useContainer(),c=Object(v.a)(r,1)[0].counter;return Object.freeze({counter:c,onChangeCounter:a.a.useCallback((function(e){return n(Number.parseInt(e.currentTarget.value,10))}),[n]),onClickAdd:t})}(),t=e.counter,n=e.onChangeCounter,r=e.onClickAdd;return a.a.createElement(K,{counter:t,onChangeCounter:n,onClickAdd:r})};L.displayName="Counter";var Q=L,X=function(e){var t=e.items,n=void 0===t?[]:t,r=e.onClickClear,c=e.onClickFetch;return a.a.createElement("section",null,a.a.createElement("button",{onClick:c,type:"button"},"Fetch to \u201capi.github.com\u201d"),a.a.createElement("button",{onClick:r,type:"button"},"Clear the history"),a.a.createElement("ol",null,n.length?n.map((function(e,t){var n=e.counter,r=e.time;return a.a.createElement("li",{key:t},"It took ",a.a.createElement("strong",null,r,"ms")," to fetch, and the counter was \u201c",a.a.createElement("strong",null,n),"\u201d.")})):a.a.createElement("li",null,"Empty data")))};X.displayName="FetchDOM";var Y=function(){var e=function(){var e=J.useContainer(),t=e.addAsync,n=e.clear,r=M.useContainer(),a=Object(v.a)(r,1)[0].items;return Object.freeze({items:a,onClickClear:n,onClickFetch:t})}(),t=e.items,n=e.onClickClear,r=e.onClickFetch;return a.a.createElement(X,{items:t,onClickClear:n,onClickFetch:r})};Y.displayName="Fetch";var Z=Y,_=(n(111),function(){return a.a.createElement(V,null,a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement("img",{src:G.a,className:"App-logo",alt:"logo"}),a.a.createElement("p",null,"Hello, world!"),a.a.createElement(Q,null),a.a.createElement(Z,null))))});_.displayName="App";var ee=_;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(ee,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},35:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},36:function(e,t,n){e.exports=n(112)},41:function(e,t,n){}},[[36,1,2]]]);
//# sourceMappingURL=main.3ee396e6.chunk.js.map