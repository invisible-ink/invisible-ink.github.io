!function(e){"function"==typeof define&&define.amd?define(e):e()}(function(){"use strict";function r(r,e){var t,n=Object.keys(r);return Object.getOwnPropertySymbols&&(t=Object.getOwnPropertySymbols(r),e&&(t=t.filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})),n.push.apply(n,t)),n}function i(n){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?r(Object(a),!0).forEach(function(e){var r,t;r=n,t=a[e=e],(e=function(e){e=function(e,r){if("object"!=typeof e||null===e)return e;var t=e[Symbol.toPrimitive];if(void 0===t)return("string"===r?String:Number)(e);t=t.call(e,r||"default");if("object"!=typeof t)return t;throw new TypeError("@@toPrimitive must return a primitive value.")}(e,"string");return"symbol"==typeof e?e:String(e)}(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach(function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(a,e))})}return n}function u(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function l(e,r){var t,n,a,o,i="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(i)return n=!(t=!0),{s:function(){i=i.call(e)},n:function(){var e=i.next();return t=e.done,e},e:function(e){n=!0,a=e},f:function(){try{t||null==i.return||i.return()}finally{if(n)throw a}}};if(Array.isArray(e)||(i=function(e,r){var t;if(e)return"string"==typeof e?u(e,r):"Map"===(t="Object"===(t=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:t)||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?u(e,r):void 0}(e))||r&&e&&"number"==typeof e.length)return i&&(e=i),o=0,{s:r=function(){},n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:r};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n=t.length;return function(e){for(var r=0;r<n;r++)e=t[r](e);return e}}var s,e=[gsap.parseEase("Power0"),gsap.parseEase("Power1"),gsap.parseEase("Power2"),gsap.parseEase("Power3"),gsap.parseEase("Power4")];function t(e,r){o(c(e).easeIn,c(r).easeOut)}function c(a){return Number.isInteger(a)?a<=4?e[a]:{easeIn:function(e){for(var r=e,t=1,n=r;t<a;t++)r*=n;return r},easeOut:function(e){for(var r=1-e,t=1,n=r;t<a;t++)r*=n;return 1-r},easeInOut:function(e){for(var r=e<.5?2*e:2*(1-e),t=1,n=r;t<a;t++)r*=n;return e<.5?r/2:1-r/2}}:{easeIn:function(e){return Math.pow(e,a)},easeOut:function(e){e=1-e;return 1-Math.pow(e,a)},easeInOut:function(e){var r=e<.5?2*e:2*(1-e),r=Math.pow(r,a);return e<.5?r/2:1-r/2}}}function f(e,s,c,f,d){for(var r=function(e){return e=e,o=3*((o=f)-(n=s))-(l=3*(n-(r=0))),a=(u=1)-(t=0)-(n=3*((a=c)-t))-(i=3*((i=d)-c)-n),[(u-r-l-o)*Math.pow(e,3)+o*Math.pow(e,2)+l*e+r,a*Math.pow(e,3)+i*Math.pow(e,2)+n*e+t];var r,t,n,a,o,i,u,l},t=0,n=1,a=(n+t)/2,o=r(a)[0];1e-4<Math.abs(e-o);)o<e?t=a:n=a,o=r(a=(n+t)/2)[0];return r(a)[1]}function d(){var r,t,e,n=gsap.timeline(),a=(r=.35,t=1,e=function(e){return f(e,r,t,r,t)},102);MATCH("tall")&&(a=200),gsap.set("#blue-package-shad",{z:-10}),gsap.set("#blue-package",{z:-20});return n.from("#purple-package",{duration:5,x:.75*a,y:-7.5,rotationY:-35,transformOrigin:"70% 50%",ease:e},0),MATCH("tall")||n.from("#blue-package, #blue-package-shad",{duration:5,x:.6*a,y:-6,rotationY:-35,transformOrigin:"70% 50%",ease:e},0),n.from("#table",{duration:5,x:.75*a,y:-7.5,ease:e},0),n.from("#room",{duration:5,x:-.1*a,y:1,ease:e},0),MATCH("tall")&&(e=o(Power1.easeInOut,Power2.easeOut),a=-242,MATCH("300x600")&&(a=-325),n.fromTo("#purple-package",{},{duration:3.25,x:a,rotationY:-20,transformOrigin:"70% 50%",ease:e},3),n.fromTo("#blue-package, #blue-package-shad",{rotationY:-35,x:-a},{duration:3.25,x:0,rotationY:0,transformOrigin:"70% 50%",ease:e},3),n.to("#table",{duration:3.25,x:a,ease:e},3),n.to("#room",{duration:3.25,x:"+=20",ease:e},3)),n}function n(e){e=Array.from(e);return e.sort(function(e,r){var t=null!=(t=e.num)?t:e.num=parseInt(e.id.replace(/^[^0-9]+/,"")),e=null!=(e=r.num)?e:r.num=parseInt(r.id.replace(/^[^0-9]+/,""));return e<t?1:t<e?-1:0}),e}function p(e){var r=document.querySelector(e),e=n(r.querySelectorAll(e+" [id^=group]")),t=(0===e.length&&e.push(r),[]);return e.forEach(function(e,r){e=n(e.querySelectorAll("[id^=line]"));t.push(e)}),t}function a(e){e=Array.from(e);return e.sort(function(e,r){var t=null!=(t=e.num)?t:e.num=parseInt(e.id.replace(/^[^0-9]+/,"")),e=null!=(e=r.num)?e:r.num=parseInt(r.id.replace(/^[^0-9]+/,""));return e<t?1:t<e?-1:0}),e}function m(e){var r=document.querySelector(e),e=a(r.querySelectorAll(e+" [id^=group]")),t=(0===e.length&&e.push(r),[]);return e.forEach(function(e,r){e=a(e.querySelectorAll("[id^=line]"));t.push(e)}),t}function g(e){e=Array.from(e);return e.sort(function(e,r){var t=null!=(t=e.num)?t:e.num=parseInt(e.id.replace(/^[^0-9]+/,"")),e=null!=(e=r.num)?e:r.num=parseInt(r.id.replace(/^[^0-9]+/,""));return e<t?1:t<e?-1:0}),e}function h(e){var r=document.querySelector(e),e=g(r.querySelectorAll(e+" [id^=group]")),t=(0===e.length&&e.push(r),[]);return e.forEach(function(e,r){e=g(e.querySelectorAll("[id^=line]"));t.push(e)}),t}function y(){var e,r,t,n,a,o;return MATCH("A")&&(o=gsap.timeline(),r=m("#headline1")[0],(t=gsap.timeline()).from(r,{duration:1,x:-70,autoAlpha:0,ease:function(e){return e=1-e,e=1-(e*=e*e*e*e)},stagger:.2}),(n=gsap.timeline()).to(r,{duration:.75,autoAlpha:0,ease:function(e){return e=Math.pow(e,2)},stagger:.075}),r=m("#endframe-headline")[0],(a=gsap.timeline()).from(r,{duration:1,y:25,autoAlpha:0,ease:function(e){return e=1-e,e=1-(e*=e*e*e*e)},stagger:.15}),a.from("#endframe-headline #heart",{duration:.5,scale:4,transformOrigin:"50% 40%",autoAlpha:0,ease:c(3).easeIn},"-=0.75"),o.to("#super-cover",.75,{autoAlpha:0},0),o.add(t,.2),o.add(n,1.45),o.add(a,2.2),o.delay(.25),e=o),MATCH("B")&&(r=gsap.timeline(),t=h("#headline1")[0],(n=gsap.timeline()).from(t,{duration:1,x:-70,autoAlpha:0,ease:function(e){return e=1-e,e=1-(e*=e*e*e*e)},stagger:.2}),(a=gsap.timeline()).to(t,{duration:.75,autoAlpha:0,ease:function(e){return e=Math.pow(e,2)},stagger:.075}),t=h("#endframe-headline")[0],(o=gsap.timeline()).from(t,{duration:1,y:25,autoAlpha:0,ease:function(e){return e=1-e,e=1-(e*=e*e*e*e)},stagger:.15}),o.from("#endframe-headline #heart",{duration:.5,scale:4,transformOrigin:"50% 40%",autoAlpha:0,ease:c(3).easeIn},"-=0.75"),(t=gsap.timeline()).add(d(),0),t.timeScale(1.75),r.to("#super-cover",.75,{autoAlpha:0},0),r.add(t,0),r.add(n,.4),r.add(a,1.65),r.add(o,2.4),r.delay(.25),e=r),MATCH("C")&&(e=function(){var e=gsap.timeline(),r=p("#headline1")[0],t=gsap.timeline(),n=(t.from(r,i({duration:2.5,x:-70,autoAlpha:0,ease:function(e){return e=1-e,e=1-(e*=e*e*e*e)},stagger:.2},VER(null,{"728x90":{duration:2.5,x:0,y:70,autoAlpha:0,stagger:.2}}))),gsap.timeline()),r=(n.to(r,{duration:.75,autoAlpha:0,ease:function(e){return e=Math.pow(e,2)},stagger:.075}),p("#endframe-headline")[0]),a=gsap.timeline();a.from(r,{duration:2,y:25,autoAlpha:0,ease:function(e){return e=1-e,e=1-(e*=e*e*e*e)},stagger:.15}),a.from("#endframe-headline #heart",{duration:2,scale:4,transformOrigin:"50% 40%",autoAlpha:0,ease:Elastic.easeOut.config(.5,.3)},"-=1.0");(r=gsap.timeline()).to("#QN-logo",{duration:.75,autoAlpha:0});var o=gsap.timeline();return o.from("#cta-mover",{duration:2,autoAlpha:0}),t.timeScale(1.25),n.timeScale(1.25),a.timeScale(1.25),e.add(t,1),e.add(n,"+=.25"),e.add(r,"-=.5"),e.add(a,"+=0"),e.add(o,"-=1.65"),e.timeScale(1.5),e.add(d(),0),e.to("#super-cover",1.2,{autoAlpha:0},0),e.delay(.25),e}()),setTimeout(function(){document.body.classList.remove("init"),document.body.classList.add("ready"),e&&e.play()},250),{mainTL:e}}function v(){setTimeout(function(){var e=y();window.banner=e,window.IS_DEV&&window.scrollTo(0,0)},250)}t(2,1),t(1,2),window.CONFIG=i({match:function(e){var r,t=!0,n=l(e.split(","));try{for(n.s();!(r=n.n()).done;){var a,o=r.value,i=!1;for(a in s)if(s[a].toString()==o){i=!0;break}if(!i){t=!1;break}}}catch(e){n.e(e)}finally{n.f()}return t},selectValue:function(e,r){for(var t in r)if(this.match(t))return r[t]}},s=window.CONFIG),CSSPlugin.defaultSkewType="simple",-1<navigator.userAgent.toLowerCase().indexOf("safari")&&-1<navigator.vendor.toLowerCase().indexOf("apple")&&(document.getElementsByTagName("html")[0].className+=" browser-safari"),"complete"==document.readyState?v():window.addEventListener("load",function(){v()})});