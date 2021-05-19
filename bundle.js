(()=>{"use strict";var e={604:(e,t,n)=>{n.d(t,{Z:()=>r});var o=n(645),i=n.n(o)()((function(e){return e[1]}));i.push([e.id,"#confettiCanvas{display:block;z-index:1;pointer-events:none;position:absolute;top:0}",""]);const r=i},777:(e,t,n)=>{n.d(t,{Z:()=>r});var o=n(645),i=n.n(o)()((function(e){return e[1]}));i.push([e.id,".mine-box{width:25px;height:25px;border:1px solid #a9a9a9;background-color:#d3d3d3;position:relative;display:flex;justify-content:center;align-items:center}.mine-box *{width:100%;text-align:center}.mine-box .b1{color:blue}.mine-box .b2{color:green}.mine-box .b3{color:red}.mine-box .b4{color:purple}.mine-box .b5{color:maroon}.mine-box .b6{color:#40e0d0}.mine-box .b7{color:#000}.mine-box .b8{color:gray}.mine-box.too-many{background-color:#ff0}.mine-box .mine-btn{position:absolute;width:100%;height:100%;cursor:pointer;display:none;border:none;border-radius:0}.mine-box .mine-btn.unknown{display:block}.mine-box .mine-btn:active{background-color:#a9a9a9}.mine-box .mine-btn *{display:none}.mine-box .mine-btn.flagged *{--fa-secondary-color: red;display:block}.mine-box .mine-btn:disabled{cursor:none}",""]);const r=i},840:(e,t,n)=>{n.d(t,{Z:()=>r});var o=n(645),i=n.n(o)()((function(e){return e[1]}));i.push([e.id,"#root{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;display:block;margin-left:auto;margin-right:auto}h1{text-align:center}.game-board{display:grid;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;margin-left:auto;margin-right:auto}.game-board.disabled{cursor:none}#indicator{text-align:center;font-size:50px;display:block;height:50px}#undo{font-size:20px;padding:5px;cursor:pointer;color:#000}#undo:disabled{color:#a9a9a9;cursor:not-allowed}.menubar{display:flex;flex-direction:row;justify-content:space-between;align-items:baseline}#newGameMenu{margin:10px;border:2px solid #000;border-radius:5px;padding:10px}#newGameMenu h2{text-align:center;margin-bottom:0}#newGameMenu input{width:70px;margin:5px;padding:3px}#newGameMenu button{margin-left:10px;padding:5px;background-color:#90ee90;color:#000;border:none;border-radius:5px;cursor:pointer}#newGameMenu #errMsg{color:salmon;font-style:italic}#statShower{text-align:center}",""]);const r=i},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,o){"string"==typeof e&&(e=[[null,e,""]]);var i={};if(o)for(var r=0;r<this.length;r++){var a=this[r][0];null!=a&&(i[a]=!0)}for(var s=0;s<e.length;s++){var l=[].concat(e[s]);o&&i[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),t.push(l))}},t}},379:(e,t,n)=>{var o,i=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),r=[];function a(e){for(var t=-1,n=0;n<r.length;n++)if(r[n].identifier===e){t=n;break}return t}function s(e,t){for(var n={},o=[],i=0;i<e.length;i++){var s=e[i],l=t.base?s[0]+t.base:s[0],d=n[l]||0,c="".concat(l," ").concat(d);n[l]=d+1;var u=a(c),m={css:s[1],media:s[2],sourceMap:s[3]};-1!==u?(r[u].references++,r[u].updater(m)):r.push({identifier:c,updater:p(m,t),references:1}),o.push(c)}return o}function l(e){var t=document.createElement("style"),o=e.attributes||{};if(void 0===o.nonce){var r=n.nc;r&&(o.nonce=r)}if(Object.keys(o).forEach((function(e){t.setAttribute(e,o[e])})),"function"==typeof e.insert)e.insert(t);else{var a=i(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var d,c=(d=[],function(e,t){return d[e]=t,d.filter(Boolean).join("\n")});function u(e,t,n,o){var i=n?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(e.styleSheet)e.styleSheet.cssText=c(t,i);else{var r=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(r,a[t]):e.appendChild(r)}}function m(e,t,n){var o=n.css,i=n.media,r=n.sourceMap;if(i?e.setAttribute("media",i):e.removeAttribute("media"),r&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var f=null,h=0;function p(e,t){var n,o,i;if(t.singleton){var r=h++;n=f||(f=l(t)),o=u.bind(null,n,r,!1),i=u.bind(null,n,r,!0)}else n=l(t),o=m.bind(null,n,t),i=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else i()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o));var n=s(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var o=0;o<n.length;o++){var i=a(n[o]);r[i].references--}for(var l=s(e,t),d=0;d<n.length;d++){var c=a(n[d]);0===r[c].references&&(r[c].updater(),r.splice(c,1))}n=l}}}}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var r=t[o]={id:o,exports:{}};return e[o](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=n(379),t=n.n(e),o=n(777);t()(o.Z,{insert:"head",singleton:!1}),o.Z.locals;var i=function(){function e(e,t,n){var o=this;this._box=e,this.handlers=t,this.parent=n,this.disabled=!1,this.container=document.createElement("div"),this.container.style.gridRow=""+(e.row+1),this.container.style.gridColumn=""+(e.col+1),this.container.classList.add("mine-box"),this.btn=document.createElement("button"),this.btn.classList.add("mine-btn","unknown");var i=document.createElement("icon");if(i.classList.add("fad","fa-flag"),this.btn.appendChild(i),this.contents=document.createElement("div"),-1===this.box.mines){var r=document.createElement("i");r.classList.add("fad","fa-bomb"),this.contents.appendChild(r),this.contents.className="bomb"}else this.box.mines>0&&(this.contents.textContent=""+e.mines,this.contents.className="b"+e.mines);this.btn.onmousedown=function(e){o.disabled||t.onclickdown(o)},this.btn.onmouseup=function(e){o.disabled||(e.shiftKey?t.onrclick(o):t.onclickup(o))},this.container.appendChild(this.contents),this.container.appendChild(this.btn),this.parent.appendChild(this.container)}return Object.defineProperty(e.prototype,"box",{get:function(){return this._box},enumerable:!1,configurable:!0}),e.prototype.click=function(){this.handlers.onclickup(this)},e.prototype.cover=function(){this.btn.classList.add("unknown"),this._box.isShown=!1},e.prototype.uncover=function(){this._box.isShown=!0,this.btn.classList.remove("unknown")},e.prototype.flag=function(){this._box.flagged=!0,this.btn.classList.add("flagged")},e.prototype.unflag=function(){this._box.flagged=!1,this.btn.classList.remove("flagged")},e.prototype.disable=function(){this.disabled=!0,this.btn.disabled=!0},e.prototype.enable=function(){this.disabled=!1,this.btn.disabled=!1},e.prototype.tooMany=function(e){void 0===e&&(e=!0),e?this.container.classList.add("too-many"):this.container.classList.remove("too-many")},e}(),r=n(604);t()(r.Z,{insert:"head",singleton:!1}),r.Z.locals;var a=function(){var e,t=this;this.maxCount=150,this.speed=2,this.frameInterval=15,this.alpha=1,this.gradient=!1,this.supportsAnimationFrame=void 0!==(null!==(e=window.requestAnimationFrame)&&void 0!==e?e:window.webkitRequestAnimationFrame),this.colors=["rgba(30,144,255,","rgba(107,142,35,","rgba(255,215,0,","rgba(255,192,203,","rgba(106,90,205,","rgba(173,216,230,","rgba(238,130,238,","rgba(152,251,152,","rgba(70,130,180,","rgba(244,164,96,","rgba(210,105,30,","rgba(220,20,60,"],this.streamingConfetti=!1,this.hasPaused=!1,this.lastFrameTime=Date.now(),this.particles=[],this.waveAngle=0,this.context=null,this.resetParticle=function(e,n,o){return e.color=t.colors[Math.random()*t.colors.length|0]+(t.alpha+")"),e.color2=t.colors[Math.random()*t.colors.length|0]+(t.alpha+")"),e.x=Math.random()*n,e.y=Math.random()*o-o,e.diameter=10*Math.random()+5,e.tilt=10*Math.random()-10,e.tiltAngleIncrement=.07*Math.random()+.05,e.tiltAngle=Math.random()*Math.PI,e},this.toggleConfettiPause=function(){t.hasPaused?t.resumeConfetti():t.pauseConfetti()},this.isConfettiPaused=function(){return t.hasPaused},this.pauseConfetti=function(){t.hasPaused=!0},this.resumeConfetti=function(){t.hasPaused=!1,t.runAnimation()},this.runAnimation=function(){var e,n;if(!t.hasPaused)if(0===t.particles.length)null===(e=t.context)||void 0===e||e.clearRect(0,0,t.innerWidth,t.innerHeight),window.requestAnimationFrame(t.runAnimation);else{var o=Date.now(),i=o-t.lastFrameTime;(!t.supportsAnimationFrame||i>t.frameInterval)&&null!==t.context&&(null===(n=t.context)||void 0===n||n.clearRect(0,0,t.innerWidth,t.innerHeight),t.updateParticles(),t.drawParticles(t.context),t.lastFrameTime=o-i%t.frameInterval),window.requestAnimationFrame(t.runAnimation)}},this.start=function(){t.startConfetti()},this.stop=function(){t.stopConfetti()},this.startConfetti=function(e,n,o){t.innerWidth=.99*document.documentElement.scrollWidth,t.innerHeight=document.documentElement.scrollHeight,window.requestAnimationFrame=function(){var e,n;return null!==(n=null!==(e=window.requestAnimationFrame)&&void 0!==e?e:window.webkitRequestAnimationFrame)&&void 0!==n?n:function(e){return window.setTimeout(e,t.frameInterval)}}();var i=document.querySelector("#confettiCanvas");if(null===i){(i=document.createElement("canvas")).setAttribute("id","confettiCanvas"),document.body.prepend(i),i.width=t.innerWidth,i.height=t.innerHeight;var r=function(){t.innerWidth=.99*document.documentElement.scrollWidth,t.innerHeight=document.documentElement.scrollHeight,null!==i&&(i.width=t.innerWidth,i.height=t.innerHeight)};window.addEventListener("resize",r,!0),window.setInterval(r,1e3),t.context=i.getContext("2d")}else null===t.context&&(t.context=i.getContext("2d"));var a=t.maxCount;if(n)if(o)if(n===o)a=t.particles.length+o;else{if(n>o){var s=n;n=o,o=s}a=t.particles.length+(Math.random()*(o-n)+n|0)}else a=t.particles.length+n;else o&&(a=t.particles.length+o);for(;t.particles.length<a;)t.particles.push(t.resetParticle({},t.innerWidth,t.innerHeight));t.streamingConfetti=!0,t.hasPaused=!1,t.runAnimation(),e&&window.setTimeout(t.stopConfetti,e)},this.stopConfetti=function(){t.streamingConfetti=!1},this.removeConfetti=function(){t.stopConfetti(),t.hasPaused=!1,t.particles=[]},this.toggleConfetti=function(){t.streamingConfetti?t.stopConfetti():t.startConfetti()},this.isConfettiRunning=function(){return t.streamingConfetti},this.drawParticles=function(e){t.particles.forEach((function(n){e.beginPath(),e.lineWidth=n.diameter;var o=n.x+n.tilt,i=o+n.diameter/2,r=n.y+n.tilt+n.diameter/2;if(t.gradient){var a=e.createLinearGradient(i,n.y,o,r);a.addColorStop(0,n.color),a.addColorStop(1,n.color2),e.strokeStyle=a}else e.strokeStyle=n.color;e.moveTo(i,n.y),e.lineTo(o,r),e.stroke()}))},this.updateParticles=function(){t.waveAngle+=.01,t.particles.forEach((function(e,n){!t.streamingConfetti&&e.y<-15?e.y=t.innerHeight+100:(e.tiltAngle+=e.tiltAngleIncrement,e.x+=Math.sin(t.waveAngle)-.5,e.y+=.5*(Math.cos(t.waveAngle)+e.diameter+t.speed),e.tilt=15*Math.sin(e.tiltAngle)),(e.x>t.innerWidth||e.x<-20||e.y>t.innerHeight)&&(t.streamingConfetti&&t.particles.length<=t.maxCount?t.resetParticle(e,t.innerWidth,t.innerHeight):t.particles.splice(n,1))}))},this.innerWidth=.99*document.documentElement.scrollWidth,this.innerHeight=document.documentElement.scrollHeight},s=n(840);t()(s.Z,{insert:"head",singleton:!1}),s.Z.locals;var l,d=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],o=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},c=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var o,i,r=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(o=r.next()).done;)a.push(o.value)}catch(e){i={error:e}}finally{try{o&&!o.done&&(n=r.return)&&n.call(r)}finally{if(i)throw i.error}}return a},u=!1,m=function(){},f=0;function h(e,t){var n={days:0,hours:0,mins:0,secs:0},o=t.getTime()-e.getTime();return n.days=Math.floor(o/864e5),o-=864e5*n.days,n.hours=Math.floor(o/36e5),o-=36e5*n.hours,n.mins=Math.floor(o/6e4),o-=6e4*n.mins,n.secs=Math.floor(o/1e3),o-=1e3*n.secs,n}function p(e){var t=1===e.days?"day":"days",n=1===e.hours?"hour":"hours",o=1===e.mins?"minute":"minutes",i=1===e.secs?"second":"seconds";return e.days>0?e.days+" "+t+", "+e.hours+" "+n+", "+e.mins+" "+o+", and "+e.secs+" "+i:e.hours>0?e.hours+" "+n+", "+e.mins+" "+o+", and "+e.secs+" "+i:e.mins>0?e.mins+" "+o+" and "+e.secs+" "+i:e.secs+" "+i}function b(){var e=document.createElement("button");e.id="undo",e.disabled=!0;var t=document.createElement("i");return t.classList.add("fal","fa-undo"),e.appendChild(t),e}function v(){var e=document.createElement("div");e.id="indicator";var t=document.createElement("div"),n=document.createElement("i");return n.classList.add("fad","fa-smile"),t.appendChild(n),e.appendChild(t),g(e),x(e),e}function g(e){var t;null===(t=e.firstChild)||void 0===t||t.remove();var n=document.createElement("div"),o=document.createElement("i");o.classList.add("fal","fa-surprise"),n.appendChild(o),e.appendChild(n)}function x(e){var t;null===(t=e.firstChild)||void 0===t||t.remove();var n=document.createElement("div"),o=document.createElement("i");o.classList.add("fal","fa-smile"),n.appendChild(o),e.appendChild(n)}function w(e){var t;null===(t=e.firstChild)||void 0===t||t.remove();var n=document.createElement("div"),o=document.createElement("i");o.classList.add("fal","fa-dizzy"),n.appendChild(o),e.appendChild(n)}function C(e){var t;null===(t=e.firstChild)||void 0===t||t.remove();var n=document.createElement("div"),o=document.createElement("i");o.classList.add("fal","fa-grin-beam"),n.appendChild(o),e.appendChild(n)}function y(e){var t=document.createElement("p");return t.id="bombCounter",t.textContent=1===e?"1 Flag left (Shift+Click to flag)":e+" Flags left (Shift+Click to flag)",t}function E(e,t,n){var o,i,r,a,s=n.box,l=s.row,u=s.col,m=[[l-1,u-1],[l-1,u],[l-1,u+1],[l,u-1],[l,u+1],[l+1,u-1],[l+1,u],[l+1,u+1]].filter((function(t){return t[0]>=0&&t[0]<e.rows&&t[1]>=0&&t[1]<e.cols}));try{for(var f=d(m),h=f.next();!h.done;h=f.next()){var p=c(h.value,2),b=p[0],v=p[1];if(t[b][v].box.isShown&&!(t[b][v].box.mines<=0)){var g=[[b-1,v-1],[b-1,v],[b-1,v+1],[b,v-1],[b,v+1],[b+1,v-1],[b+1,v],[b+1,v+1]].filter((function(t){return t[0]>=0&&t[0]<e.rows&&t[1]>=0&&t[1]<e.cols})),x=0;try{for(var w=(r=void 0,d(g)),C=w.next();!C.done;C=w.next()){var y=c(C.value,2),E=y[0],M=y[1];t[E][M].box.flagged&&x++}}catch(e){r={error:e}}finally{try{C&&!C.done&&(a=w.return)&&a.call(w)}finally{if(r)throw r.error}}x>t[b][v].box.mines?t[b][v].tooMany():t[b][v].tooMany(!1)}}}catch(e){o={error:e}}finally{try{h&&!h.done&&(i=f.return)&&i.call(f)}finally{if(o)throw o.error}}}function M(e,t,n){var o=document.createElement("div"),r=[],a={container:o,boxes:r},s=0;o.classList.add("game-board");var f={onclickdown:function(t){void 0===n&&g(e.indicator)},onclickup:function(t){if(!(null==n?void 0:n(t))){if(x(e.indicator),-1===t.box.mines)return function(e,t){e.undo.disabled=!1,t.boxes.flat().forEach((function(e){return e.disable()})),t.container.classList.add("disabled")}(e,a),w(e.indicator),l=t,void t.uncover();if(t.uncover(),0===t.box.mines){var o=function(t){var n,i,a=t.box,l=a.row,u=a.col,m=[[l-1,u-1],[l-1,u],[l-1,u+1],[l,u-1],[l,u+1],[l+1,u-1],[l+1,u],[l+1,u+1]].filter((function(t){return t[0]>=0&&t[0]<e.rows&&t[1]>=0&&t[1]<e.cols}));try{for(var f=d(m),h=f.next();!h.done;h=f.next()){var p=c(h.value,2),b=p[0],v=p[1];if(!r[b][v].box.isShown)if(r[b][v].box.flagged&&(s--,r[b][v].unflag(),E(e,r,r[b][v])),r[b][v].uncover(),0===r[b][v].box.mines)o(r[b][v]);else if(-1===r[b][v].box.mines)throw new Error("Found mine next to 0 box")}}catch(e){n={error:e}}finally{try{h&&!h.done&&(i=f.return)&&i.call(f)}finally{if(n)throw n.error}}};o(t)}}},onrclick:function(t){void 0===n&&(t.box.flagged?(t.unflag(),s--):(t.flag(),s++),E(e,r,t),e.mines===s?function(e){return e.flat().every((function(e){return-1!==e.box.mines||e.box.flagged}))}(r)?(r.flat().forEach((function(e){return e.uncover()})),function(e){C(e.indicator),e.bombCounter.textContent="No Flags Left!",u=!0,m()}(e)):e.bombCounter.textContent="No more flags left to place, but at least one isn't right...":e.mines<s?e.bombCounter.textContent=e.mines-s+" Flags left (what have you done...?)":e.mines-s==1?e.bombCounter.textContent="1 Flag left":e.bombCounter.textContent=e.mines-s+" Flags left")}};return t.forEach((function(e){r.push(e.map((function(e){return new i(e,f,o)})))})),a}function k(e,t,n){for(var o,i,r=[],a=0;a<e;++a){for(var s=[],l=0;l<t;++l){var u={row:a,col:l,mines:0,flagged:!1,isShown:!1};s.push(u)}r.push(s)}try{for(var m=d(n),f=m.next();!f.done;f=m.next()){var h=f.value,p=c(h,2);a=p[0],l=p[1],r[a][l].mines=-1}}catch(e){o={error:e}}finally{try{f&&!f.done&&(i=m.return)&&i.call(m)}finally{if(o)throw o.error}}for(a=0;a<e;++a){var b=function(n){if(-1===r[a][n].mines)return"continue";var o=0;[[a-1,n-1],[a-1,n],[a-1,n+1],[a,n-1],[a,n+1],[a+1,n-1],[a+1,n],[a+1,n+1]].filter((function(n){return n[0]>=0&&n[0]<e&&n[1]>=0&&n[1]<t})).forEach((function(e){-1===r[e[0]][e[1]].mines&&++o})),r[a][n].mines=o};for(l=0;l<t;++l)b(l)}return r}function S(e,t,n){void 0===e&&(e=20),void 0===t&&(t=20),void 0===n&&(n=75);var o=new a;0!==f&&window.clearInterval(f),l=void 0,u=!1;var i={rows:e,cols:t,mines:n,indicator:v(),bombCounter:y(n),undo:b()},r=document.querySelector("#root");if(null===r)throw new Error("No root node found");var s=document.createElement("div");s.classList.add("menubar"),s.appendChild(i.bombCounter),s.appendChild(i.undo);var d=k(i.rows,i.cols,[]),c=document.createElement("p");c.id="statShower",c.textContent="Ready to Start";var g=M(i,d,(function(e){var t=function(e,t){var n=new Set,o=[],i=e.rows,r=e.cols,a=e.mines,s=a,l=Math.min(7,Math.round(.2*e.rows)),d=Math.min(7,Math.round(.2*e.cols)),c=[t[0]-l,t[0]+l],u=[t[1]-d,t[1]+d];if(i*r-(l+1)*(d+1)-a<0)throw new Error("Not enough free boxes for requested number of mines");for(;s>0;){var m=Math.floor(Math.random()*i),f=Math.floor(Math.random()*r);m>c[0]&&m<c[1]&&f>u[0]&&f<u[1]||n.has(m+","+f)||(n.add(m+","+f),o.push([m,f]),s--)}return{board:M(e,k(i,r,o)),seed:e,stats:{start:new Date,undos:0}}}(i,[e.box.row,e.box.col]);return g.container.replaceWith(t.board.container),t.board.boxes[e.box.row][e.box.col].click(),i.undo.onclick=function(){void 0!==l&&(t.stats.undos++,x(i.indicator),l.cover(),i.undo.disabled=!0,t.board.boxes.flat().forEach((function(e){return e.enable()})),t.board.container.classList.remove("disabled"),l=void 0)},f=window.setInterval((function(){c.textContent=p(h(t.stats.start,new Date))}),1e3),m=function(){var e=p(h(t.stats.start,new Date)),n="Congratulations! You flagged "+i.mines+" "+(1===i.mines?"mine":"mines")+" with "+t.stats.undos+" undos in "+e+"!";c.textContent=n,window.clearInterval(f),o.start()},!0}));r.appendChild(i.indicator),r.appendChild(s),r.appendChild(g.container),r.appendChild(c);var E=function(e,t,n){var o=document.createElement("label");o.textContent="# Rows:";var i=document.createElement("input");i.type="number",i.min="6",i.step="1",i.value=""+e,o.appendChild(i);var r=document.createElement("label");r.textContent="# Cols:";var a=document.createElement("input");a.type="number",a.min="6",a.step="1",a.value=""+t,r.appendChild(a);var s=document.createElement("label");s.textContent="# Mines:";var l=document.createElement("input");l.type="number",l.min="1",l.step="1",l.value=""+n,s.appendChild(l);var d=document.createElement("button");d.id="newGame",d.textContent="Start New Game";var c=document.createElement("div");c.classList.add("menubar");var u=document.createElement("h2");u.textContent="New Game";var m=document.createElement("p");m.id="errMsg";var f=document.createElement("div");return f.id="newGameMenu",f.appendChild(u),f.appendChild(c),f.appendChild(m),c.appendChild(o),c.appendChild(r),c.appendChild(s),c.appendChild(d),{numRows:i,numCols:a,numMines:l,gameBtn:d,errorMsg:m,container:f}}(e,t,n);E.gameBtn.onclick=function(){var e=parseInt(E.numRows.value),t=parseInt(E.numCols.value),n=parseInt(E.numMines.value);if(isNaN(e)||e<=6)E.errorMsg.textContent="Number of rows must be at least 6";else if(isNaN(t)||t<=0)E.errorMsg.textContent="Number of columns must be at least 6";else if(isNaN(n)||n<=0)E.errorMsg.textContent="There must be at least 1 mine";else{var i=Math.min(7,Math.round(.2*e)),a=Math.min(7,Math.round(.2*t));if(e*t-(i+1)*(a+1)-n<0)E.errorMsg.textContent="Too many mines; for a "+e+"x"+t+" board, you cannot have more than "+(e*t-(i+1)*(a+1))+" mines";else{var s=r.parentElement;if(null===s)throw new Error("Can't have a null root...");r.remove();var l=document.createElement("div");l.id="root",s.appendChild(l),o.isConfettiRunning()&&o.stop(),S(e,t,n)}}},r.appendChild(E.container),window.onmouseup=function(){u?C(i.indicator):void 0===l?x(i.indicator):w(i.indicator)}}window.onload=function(){return S()}})()})();