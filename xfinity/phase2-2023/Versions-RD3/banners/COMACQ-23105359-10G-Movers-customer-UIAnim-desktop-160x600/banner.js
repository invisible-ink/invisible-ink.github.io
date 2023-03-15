(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    var bannerBounds;
    function localizeBounds(bounds) {
      if (!bannerBounds) bannerBounds = document.querySelector('#banner-inner').getBoundingClientRect();
      var newBounds = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      newBounds.top = bounds.top - bannerBounds.top;
      newBounds.left = bounds.left - bannerBounds.left;
      newBounds.bottom = bounds.bottom - bannerBounds.top;
      newBounds.right = bounds.right - bannerBounds.left;
      newBounds.x = newBounds.left;
      newBounds.y = newBounds.top;
      newBounds.width = newBounds.right - newBounds.left;
      newBounds.height = newBounds.bottom - newBounds.top;
      return newBounds;
    }

    function createReplay(el) {
      var replayRotation = 0;
      el.addEventListener('click', function (ev) {
        Banner.instance.replay();
      });
      el.addEventListener('mouseenter', function (ev) {
        replayRotation += 360;
        gsap.to(el.querySelector('g'), 1, {
          svgOrigin: '8 8',
          rotation: replayRotation,
          ease: Power4.easeOut
        });
      });
    }

    function createLegal() {
      console.log('createLegal');
      /** @type HTMLElement */

      var legalClickEl = document.querySelector('#legal-click');
      /** @type HTMLElement */

      var legalEl = document.querySelector('#legal'); // adjust legal position and arrow

      if (legalClickEl && legalClickEl.offsetParent !== null) {
        var legalInnerEl = document.querySelector('#legal > .inner');
        var arrowEl = document.querySelector('#legal .arrow');
        gsap.set(arrowEl, {
          left: 0
        });
        var legalClickBounds = localizeBounds(legalClickEl.getBoundingClientRect());
        var arrowBounds = localizeBounds(arrowEl.getBoundingClientRect());
        var arrowType;
        var arrowCSS = getComputedStyle(arrowEl);

        if (parseInt(arrowCSS.top) > 0) {
          arrowType = 'BOTTOM';
        } else if (parseInt(arrowCSS.bottom) > 0) {
          arrowType = 'TOP';
        }

        if (arrowType) {
          if (arrowType == 'TOP') {
            gsap.set(legalInnerEl, {
              top: legalClickBounds.bottom + 1
            });
          }

          if (arrowType == 'BOTTOM') {
            gsap.set(legalInnerEl, {
              bottom: window['CONFIG'].height - (legalClickBounds.top - 1)
            });
          }

          var legalClickCenterX = legalClickBounds.left + legalClickBounds.width / 2;
          var arrowLeft = legalClickCenterX - arrowBounds.left - arrowBounds.width / 2;
          gsap.set(arrowEl, {
            left: arrowLeft
          });
        }
      } // hiding/showing


      var isLegalShowing = false;

      function showLegal() {
        isLegalShowing = true;
        gsap.to(legalEl, 0.2, {
          autoAlpha: 1
        });
      }

      function hideLegal() {
        isLegalShowing = false;
        gsap.to(legalEl, 0.2, {
          autoAlpha: 0
        });
      }

      function toggleLegal() {
        if (isLegalShowing) {
          hideLegal();
        } else {
          showLegal();
        }
      }

      if (legalClickEl && legalEl) {
        gsap.set(legalEl, {
          opacity: 0,
          visibility: 'hidden'
        });
        legalClickEl.addEventListener('click', function (ev) {
          console.log('CLICK');
          toggleLegal();
          ev.stopPropagation();
        });
        document.addEventListener('click', function (ev) {
          hideLegal();
        });
      }
    }

    function createEndframe() {
      createLegal();
      if (document.querySelector('#replay')) createReplay(document.querySelector('#replay'));
    }

    function createBanner(config) {
      var versionMapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      document.querySelectorAll('clone').forEach(function (cloneEl) {
        var _cloneEl$parentElemen;

        var selector = cloneEl.dataset.selector;
        var cloneMe = (_cloneEl$parentElemen = cloneEl.parentElement.querySelector(selector)) !== null && _cloneEl$parentElemen !== void 0 ? _cloneEl$parentElemen : document.querySelector(selector);

        if (!cloneMe) {
          console.error("cloneMe isn't there: ", selector, cloneEl);
          throw new Error('Real Error');
        }

        var newEl = cloneMe.cloneNode(true);
        newEl.setAttribute('class', cloneEl.getAttribute('class'));
        cloneEl.replaceWith(newEl);
      });
      var mainTL;
      if (!mainTL) mainTL = versionMapper['createMainTL']();
      createEndframe();

      function animate() {
        if (window['fnStartAnimation']) {
          // this doesn't start the ticker, just sets everything up
          window['fnStartAnimation']();
        }

        if (mainTL) {
          mainTL.play(); // this.mainTL.time(7.5)
          // this.mainTL.pause()
        }
      }

      setTimeout(function () {
        document.body.classList.remove('init');
        document.body.classList.add('ready');
        animate();
      }, 250);
      return {
        mainTL: mainTL,
        config: config
      };
    }

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }

      return target;
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }

    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;

      var _s, _e;

      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it) o = it;
          var i = 0;

          var F = function () {};

          return {
            s: F,
            n: function () {
              if (i >= o.length) return {
                done: true
              };
              return {
                done: false,
                value: o[i++]
              };
            },
            e: function (e) {
              throw e;
            },
            f: F
          };
        }

        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      var normalCompletion = true,
          didErr = false,
          err;
      return {
        s: function () {
          it = it.call(o);
        },
        n: function () {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        },
        e: function (e) {
          didErr = true;
          err = e;
        },
        f: function () {
          try {
            if (!normalCompletion && it.return != null) it.return();
          } finally {
            if (didErr) throw err;
          }
        }
      };
    }

    var config;
    function createConfig(values) {
      function match(selector) {
        if (selector[0] === '*') return matchAnywhere(selector.substring(1));
        var allFound = true;
        var strs = selector.split(',');

        var _iterator = _createForOfIteratorHelper(strs),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var str = _step.value;
            var found = false;

            for (var prop in values) {
              if (values[prop].toString() == str) {
                found = true;
                break;
              }
            }

            if (!found) {
              allFound = false;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return allFound;
      }

      function matchAnywhere(str) {
        console.log('matchAnywhere', str);
        return Object.values(values).some(function (value) {
          if (typeof value !== 'string') return false;
          return value.includes(str);
        });
      }

      function selectValue(defaultValue, selectors) {
        for (var selector in selectors) {
          if (this.match(selector)) {
            return selectors[selector];
          }
        }

        return defaultValue;
      }

      config = _objectSpread2({
        match: match,
        matchAnywhere: matchAnywhere,
        selectValue: selectValue
      }, values);
      return config;
    }

    var styleProp$3 = 'filter'; // function getValuesFromStr(str) {
    //     console.log('str', str)
    //     let pos = 0
    //     for (let i = 0; i < 10; i++) {
    //         const dsPos = (pos = str.indexOf('drop-shadow', pos))
    //         if (pos === -1) break
    //         pos = str.indexOf(')', pos)
    //         const args = str.substring(dsPos + 12, pos + 1)
    //     }
    // }

    var glowPlugin = {
      name: 'glow',
      init: function init(target, value) {
        console.log(' # glowPlugin.init', value);
        var endValue = value.value,
            glows = value.glows;

        if (!glows) {
          throw new Error('glowPlugin: Glows prop must be set.');
        }

        this.start = endValue;
        this.end = endValue !== null && endValue !== void 0 ? endValue : 1;
        this.diff = this.end - this.start;
        console.log('   ', this.start, this.end, this.diff);
        this.glows = glows;
        this.target = target;
      },
      render: function render(ratio, data) {
        console.log(' # render', ratio, 'start', data.start, 'diff', data.diff);
        var value = data.start + data.diff * ratio;
        console.log('   value', data.value);
        var filterStr = '';
        data.glows.forEach(function (glow) {
          console.log('   glow', glow);
          filterStr += ' drop-shadow(';
          filterStr += (glow.offsetX || 0).toFixed(1) + 'px ';
          filterStr += (glow.offsetY || 0).toFixed(1) + 'px ';
          filterStr += ((glow.radius || 0) * value).toFixed(1) + 'px ';
          filterStr += glow.color || '#fff';
          filterStr += ') ';
        });
        console.log('   filterStr', filterStr);
        data.target.style[styleProp$3] = filterStr;
        return;
      }
    };

    var styleProp$2 = 'filter';

    function getValueFromStr(str) {
      var match = str.match(/brightness\((.*?)\)/);
      if (!match) return 0;
      if (!match[1]) return 0;
      return parseFloat(match[1]);
    }

    var brightnessPlugin = {
      name: 'brightness',
      init: function init(target, value) {
        var brightness = getValueFromStr(window.getComputedStyle(target)[styleProp$2]);
        this.start = brightness;
        this.end = value;
        this.diff = this.end - this.start;
        this.target = target;
      },
      render: function render(ratio, data) {
        var newBrightness = data.start + data.diff * ratio;
        data.target.style[styleProp$2] = "brightness(".concat(newBrightness, ")");
      }
    };

    var styleProp$1 = 'webkitMaskPosition'; // █▄ ▄█ █ █ ▄▀▀ ▀█▀    ██▄ ██▀    █▀▄ █ ▀▄▀ ██▀ █
    // █ ▀ █ ▀▄█ ▄█▀  █     █▄█ █▄▄    █▀  █ █ █ █▄▄ █▄▄

    function getValuesFromStr$1(str) {
      var _split = (str || '0 0').split(' '),
          _split2 = _slicedToArray(_split, 2),
          xStr = _split2[0],
          yStr = _split2[1];

      var x = parseFloat(xStr);
      var y = parseFloat(yStr);
      return [x, y, xStr, yStr];
    }

    var maskPositionXPlugin = {
      name: 'maskPositionX',
      init: function init(target, value) {
        var _getValuesFromStr = getValuesFromStr$1(window.getComputedStyle(target)[styleProp$1]),
            _getValuesFromStr2 = _slicedToArray(_getValuesFromStr, 4),
            x = _getValuesFromStr2[0];
            _getValuesFromStr2[1];
            _getValuesFromStr2[2];
            _getValuesFromStr2[3];

        this.start = x;
        this.end = value;
        this.diff = this.end - this.start;
        this.target = target;
      },
      render: function render(ratio, data) {
        var positionX = data.start + data.diff * ratio;

        var _getValuesFromStr3 = getValuesFromStr$1(data.target.style[styleProp$1]),
            _getValuesFromStr4 = _slicedToArray(_getValuesFromStr3, 4);
            _getValuesFromStr4[0];
            _getValuesFromStr4[1];
            _getValuesFromStr4[2];
            var yStr = _getValuesFromStr4[3];

        data.target.style[styleProp$1] = "".concat(positionX.toFixed(1), "px ").concat(yStr);
      }
    };
    var maskPositionYPlugin = {
      name: 'maskPositionY',
      init: function init(target, value) {
        var _getValuesFromStr5 = getValuesFromStr$1(window.getComputedStyle(target)[styleProp$1]),
            _getValuesFromStr6 = _slicedToArray(_getValuesFromStr5, 4);
            _getValuesFromStr6[0];
            var y = _getValuesFromStr6[1];
            _getValuesFromStr6[2];
            _getValuesFromStr6[3];

        this.start = y;
        this.end = value;
        this.diff = this.end - this.start;
        this.target = target;
      },
      render: function render(ratio, data) {
        var positionY = data.start + data.diff * ratio;

        var _getValuesFromStr7 = getValuesFromStr$1(data.target.style[styleProp$1]),
            _getValuesFromStr8 = _slicedToArray(_getValuesFromStr7, 4);
            _getValuesFromStr8[0];
            _getValuesFromStr8[1];
            var xStr = _getValuesFromStr8[2];
            _getValuesFromStr8[3];

        data.target.style[styleProp$1] = "".concat(xStr, " ").concat(positionY.toFixed(1), "px");
      }
    };

    var styleProp = 'webkitMaskSize'; // █▄ ▄█ █ █ ▄▀▀ ▀█▀    ██▄ ██▀    █▀▄ ██▀ █▀▄ ▄▀▀ ██▀ █▄ █ ▀█▀ ▄▀▄ ▄▀  ██▀
    // █ ▀ █ ▀▄█ ▄█▀  █     █▄█ █▄▄    █▀  █▄▄ █▀▄ ▀▄▄ █▄▄ █ ▀█  █  █▀█ ▀▄█ █▄▄

    function getValuesFromStr(str) {
      var _split = (str || '0 0').split(' '),
          _split2 = _slicedToArray(_split, 2),
          xStr = _split2[0],
          yStr = _split2[1];

      var x = parseFloat(xStr) / 100;
      var y = parseFloat(yStr) / 100;
      return [x, y, xStr, yStr];
    }

    var maskSizeXPlugin = {
      name: 'maskSizeX',
      init: function init(target, value) {
        var _getValuesFromStr = getValuesFromStr(window.getComputedStyle(target)[styleProp]),
            _getValuesFromStr2 = _slicedToArray(_getValuesFromStr, 4),
            x = _getValuesFromStr2[0];
            _getValuesFromStr2[1];
            _getValuesFromStr2[2];
            _getValuesFromStr2[3];

        this.start = x;
        this.end = value;
        this.diff = this.end - this.start;
        this.target = target;
      },
      render: function render(ratio, data) {
        var sizeX = data.start + data.diff * ratio;

        var _getValuesFromStr3 = getValuesFromStr(data.target.style[styleProp]),
            _getValuesFromStr4 = _slicedToArray(_getValuesFromStr3, 4);
            _getValuesFromStr4[0];
            _getValuesFromStr4[1];
            _getValuesFromStr4[2];
            var yStr = _getValuesFromStr4[3];

        data.target.style[styleProp] = "".concat((sizeX * 100).toFixed(1), "% ").concat(yStr);
      }
    };
    var maskSizeYPlugin = {
      name: 'maskSizeY',
      init: function init(target, value) {
        var _getValuesFromStr5 = getValuesFromStr(window.getComputedStyle(target)[styleProp]),
            _getValuesFromStr6 = _slicedToArray(_getValuesFromStr5, 4);
            _getValuesFromStr6[0];
            var y = _getValuesFromStr6[1];
            _getValuesFromStr6[2];
            _getValuesFromStr6[3];

        this.start = y;
        this.end = value;
        this.diff = this.end - this.start;
        this.target = target;
      },
      render: function render(ratio, data) {
        var sizeY = data.start + data.diff * ratio;

        var _getValuesFromStr7 = getValuesFromStr(data.target.style[styleProp]),
            _getValuesFromStr8 = _slicedToArray(_getValuesFromStr7, 4);
            _getValuesFromStr8[0];
            _getValuesFromStr8[1];
            var xStr = _getValuesFromStr8[2];
            _getValuesFromStr8[3];

        data.target.style[styleProp] = "".concat(xStr, " ").concat((sizeY * 100).toFixed(1), "%");
      }
    };

    /** @returns {(r: any) => any} */

    function combine() {
      for (var _len = arguments.length, eases = new Array(_len), _key = 0; _key < _len; _key++) {
        eases[_key] = arguments[_key];
      }

      var total = eases.length;

      var ease = function ease(r) {
        var or = r;

        for (var i = 0; i < total; i++) {
          r = eases[i](r, or);
        }

        return r;
      };
      return ease;
    }
    var _number2Ease = [gsap['parse' + 'Ease']('Power0'), gsap['parse' + 'Ease']('Power1'), gsap['parse' + 'Ease']('Power2'), gsap['parse' + 'Ease']('Power3'), gsap['parse' + 'Ease']('Power4')];
    function inOut(powIn, powOut) {
      return combine(power(powIn).easeIn, power(powOut).easeOut);
    }
    /**
     *
     * @param {number} pw
     * @returns {{
     *              easeIn:(r:number)=>number,
     *              easeOut:(r:number)=>number,
     *              easeInOut:(r:number)=>number
     *          }}
     */

    function power(pw) {
      // we split here because Math.pow is quite slow...
      if (pw % 1 === 0) {
        // the built in ones are fine...
        if (pw <= 4) {
          return _number2Ease[pw];
        }

        return {
          easeIn: function easeIn(p) {
            var ratio = p; // int version

            for (var i = 1, orig = ratio; i < pw; i++) {
              ratio *= orig;
            }

            return ratio;
          },
          easeOut: function easeOut(p) {
            var ratio = 1 - p; // int version

            for (var i = 1, orig = ratio; i < pw; i++) {
              ratio *= orig;
            }

            return 1 - ratio;
          },
          easeInOut: function easeInOut(p) {
            var ratio = p < 0.5 ? p * 2 : (1 - p) * 2; // int version

            for (var i = 1, orig = ratio; i < pw; i++) {
              ratio *= orig;
            }

            return p < 0.5 ? ratio / 2 : 1 - ratio / 2;
          }
        };
      } else {
        return {
          easeIn: function easeIn(p) {
            var ratio = p;
            ratio = Math.pow(ratio, pw);
            return ratio;
          },
          easeOut: function easeOut(p) {
            var ratio = 1 - p;
            ratio = Math.pow(ratio, pw);
            return 1 - ratio;
          },
          easeInOut: function easeInOut(p) {
            var ratio = p < 0.5 ? p * 2 : (1 - p) * 2;
            ratio = Math.pow(ratio, pw);
            return p < 0.5 ? ratio / 2 : 1 - ratio / 2;
          }
        };
      }
    }
    inOut(2, 1);
    inOut(1, 2); // https://stackoverflow.com/questions/16227300/how-to-draw-bezier-curves-with-native-javascript-code-without-ctx-beziercurveto

    function cubicBezierGetPointAtT(x0, y0, x1, y1, x2, y2, x3, y3, t) {
      var cX = 3 * (x1 - x0),
          bX = 3 * (x2 - x1) - cX,
          aX = x3 - x0 - cX - bX;
      var cY = 3 * (y1 - y0),
          bY = 3 * (y2 - y1) - cY,
          aY = y3 - y0 - cY - bY;
      var x = aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + x0;
      var y = aY * Math.pow(t, 3) + bY * Math.pow(t, 2) + cY * t + y0;
      return [x, y];
    } // https://coderedirect.com/questions/219412/y-coordinate-for-a-given-x-cubic-bezier
    //we actually need a target x value to go with the middle control
    //points, don't we? ;)


    function cubicBezierGetYatX(xTarget, x1, y1, x2, y2) {
      var xTolerance = 0.0001; //adjust as you please

      var myBezier = function myBezier(t) {
        return cubicBezierGetPointAtT(0, 0, x1, y1, x2, y2, 1, 1, t);
      }; //we could do something less stupid, but since the x is monotonic
      //increasing given the problem constraints, we'll do a binary search.
      //establish bounds


      var lower = 0;
      var upper = 1;
      var percent = (upper + lower) / 2; //get initial x

      var x = myBezier(percent)[0]; //loop until completion

      while (Math.abs(xTarget - x) > xTolerance) {
        if (xTarget > x) lower = percent;else upper = percent;
        percent = (upper + lower) / 2;
        x = myBezier(percent)[0];
      } //we're within tolerance of the desired x value.
      //return the y value.


      return myBezier(percent)[1];
    } //https://cubic-bezier.com/      <--  website for cubic bezier values
    function lockedEase(x, y) {
      // return CustomEase.create('custom', `M0,0,C${x},${y},${x},${y},1,1`)
      return function (r) {
        return cubicBezierGetYatX(r, x, y, x, y);
      };
    }
    function bendTime(ease) {
      var pow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

      if (pow < 0) {
        pow = Math.abs(pow);
        return function (r) {
          r = 1 - r;
          r = Math.pow(r, pow);
          r = 1 - r;
          return ease(r);
        };
      }

      return function (r) {
        r = Math.pow(r, pow);
        return ease(r);
      };
    }

    function createGhostsTL(targets, animFunc) {
      var tl = gsap.timeline();

      for (var i = 0; i < targets.length; i++) {
        tl.add.apply(tl, _toConsumableArray(animFunc(targets[i], i, i === 0)));
      }

      return tl;
    }

    function createFastEnterEffect(root) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // console.log(' # createFastEnterEffect', root)
      options = _objectSpread2({
        alphaOnEnter: false
      }, options);
      var tl = gsap.timeline();
      var ease, duration;
      duration = 0.3;
      ease = Power4.easeOut;
      var letters = root.querySelectorAll('.top [id^=letter]');

      if (!letters || letters.length < 1) {
        return tl;
      }

      var dist = VER(-100, {
        'wide,exclusionMarkets': -250,
        '970x250': -350
      });
      tl.fromTo(letters, _objectSpread2({
        x: '+=' + dist
      }, {
        autoAlpha: 0
      }), _objectSpread2(_objectSpread2({
        duration: duration,
        x: '-=' + dist
      }, {
        autoAlpha: 1
      }), {}, {
        ease: ease,
        stagger: 0.05
      }), 0);
      tl.add(createGhostsTL(root.querySelectorAll('.ghost'), function (target, index, isMaster) {
        if (index > 4) {
          gsap.set(target, {
            display: 'none'
          });
        }

        var tl = gsap.timeline();

        if (!isMaster) {
          gsap.set(target, {
            opacity: 0.4
          });
        }

        if (MATCH('add-trails')) {
          if (index > 0) {
            gsap.set(target, {
              opacity: 0.8
            });
            target.classList.add('blender');
            target.classList.add(['red', 'green'][index % 2]);
          }
        }

        var pos = index * (0.075 / 2);
        tl.fromTo(target.querySelectorAll('[id^=letter]'), _objectSpread2({
          x: '+=' + dist
        }, {
          autoAlpha: 0
        }), _objectSpread2(_objectSpread2({
          duration: duration,
          x: '-=' + dist
        }, {
          autoAlpha: 1
        }), {}, {
          ease: ease,
          stagger: 0.05
        }), pos);

        if (!isMaster) {
          tl.from(target, {
            duration: duration * 0.125,
            autoAlpha: 0
          }, pos + duration * 0.1);
        }

        if (index > 2) {
          tl.to(target, {
            duration: 0.001,
            autoAlpha: 0
          });
        }

        return [tl, 0];
      }), 0);
      return tl;
    }

    function createFastLoopEffect(root) {
      var maxDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
      var tl = gsap.timeline();
      var childTL;
      var targets = Array.from(root.children).filter(function (el) {
        return el.matches('.loop-me');
      });
      var slowestLoopDur = VER(0.2, {
        '728x90': 0.4,
        '970x90': 0.4,
        tiny: 0.4
      });
      var fastestLoopDur = VER(0.1, {
        '728x90': 0.2,
        '970x90': 0.2,
        tiny: 0.2
      });
      var ghostHalfDist = VER(200, {
        '728x90': 600,
        '970x90': 600,
        tiny: 600
      });
      var ghostTotal = VER(15, {
        '728x90': 60,
        '970x90': 60,
        tiny: 60
      });
      var loopsTL = gsap.timeline();
      targets.forEach(function (el, index) {
        var per = index / targets.length;
        childTL = gsap.timeline(); // start loop

        childTL.fromTo(el, {
          x: 0
        }, {
          duration: VER(0.3, {
            '728x90': 0.6,
            '970x90': 0.6,
            tiny: 0.6
          }),
          x: ghostHalfDist,
          ease: power(1.2).easeIn
        });
        var totalDuration = 0; // real loop

        for (var i = 0; i < ghostTotal; i++) {

          var per0to1 = i / (ghostTotal - 1);
          var loopDur = slowestLoopDur + (fastestLoopDur - slowestLoopDur) * per0to1;
          totalDuration += loopDur;
          if (totalDuration > maxDuration) break;
          childTL.fromTo(el, {
            x: -ghostHalfDist
          }, {
            duration: loopDur,
            x: ghostHalfDist,
            ease: Linear.easeNone
          });
        }

        childTL.fromTo(el, {
          autoAlpha: 0
        }, {
          duration: 0.05,
          autoAlpha: 0.25
        }, 0);
        loopsTL.add(childTL, index * VER(fastestLoopDur, {
          '728x90': fastestLoopDur * 0.35,
          '970x90': fastestLoopDur * 0.35,
          tiny: fastestLoopDur * 0.35
        }) + per * VER(fastestLoopDur, {
          '728x90': fastestLoopDur,
          '970x90': fastestLoopDur,
          tiny: fastestLoopDur
        }));
      });
      tl.add(loopsTL, 0);

      if (root.querySelector('.blur')) {
        var blurEl = root.querySelector('.blur');
        tl.fromTo(blurEl, {
          autoAlpha: 0
        }, {
          duration: 2,
          autoAlpha: 1
        }, 0.4);
        tl.fromTo(blurEl, {
          scaleX: 0.25,
          x: -100,
          transformOrigin: '0 0'
        }, {
          duration: 2,
          x: -200,
          scaleX: VER(3, {
            '728x90': 6,
            '970x90': 6,
            tiny: 6
          }),
          transformOrigin: '0 0'
        }, 0.4); // tl.add(childTL, 0)
      }

      tl.to(root, {
        duration: tl.duration(),
        skewX: -15,
        ease: Linear.easeNone
      }, 0);
      return tl;
    }

    function grabAll(selector) {
      var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      return Array.from(root.querySelectorAll(selector));
    }
    function grab(selector) {
      var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      return root.querySelector(selector);
    }

    var effect_2_Func = {
      FastEnter: createFastEnterEffect,
      FastLoop: createFastLoopEffect
    };

    var pass = function pass() {
      for (var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++) {
        a[_key] = arguments[_key];
      }

      return [].concat(a);
    };

    function createFrameTL(target) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options = _objectSpread2({
        hasExit: true,
        enterDuration: 2,
        exitDuration: 0.5,
        totalDuration: 3,
        lineStagger: VER(0.2, {
          '728x90': 0.4
        }),
        reverseLines: false,
        lineOrder: null,
        position: function position(target, value) {
          return value;
        },
        offsetX: function offsetX(target, value) {
          return value;
        },
        driftArgs: pass,
        FastEnterOptions: {}
      }, options);
      var tl = gsap.timeline();
      var enterOrder = [];
      var enterOrderEls = grabAll('[id*=enter-order-],[class*=enter-order-]', target);
      enterOrderEls.forEach(function (el) {
        var _el$id$match = el.id.match(/enter-order-(\d+)/),
            _el$id$match2 = _slicedToArray(_el$id$match, 2),
            orderStr = _el$id$match2[1];

        var orderNum = parseFloat(orderStr);
        if (!enterOrder[orderNum]) enterOrder[orderNum] = [];
        enterOrder[orderNum].push(el);
      });
      // start hidden

      tl.from(target, {
        duration: 0.001,
        autoAlpha: 0
      }, 0);
      var childTL, ease, duration;
      duration = options.enterDuration;
      var driftX = VER(6, {
        '160x600': 2
      });
      var driftShiftX = VER(13, {
        '160x600': 2
      });
      var startX = -driftX * options.totalDuration - driftShiftX;
      var endX = driftX * options.totalDuration - driftShiftX;
      tl.fromTo.apply(tl, _toConsumableArray(options.driftArgs(grabAll('.drift', target), {
        x: startX
      }, {
        duration: options.totalDuration,
        x: endX,
        ease: Linear.easeNone
      }, 0))); // ENTER

      var headlines = grabAll('.headline', target); // if (MATCH('728x90') || MATCH('970x90') || MATCH('tiny')) {
      //     headlines.reverse()
      // }

      if (options.reverseLines) headlines.reverse();

      if (options.lineOrder) {
        var order = options.lineOrder.split(',');
        headlines = order.map(function (num) {
          return headlines.find(function (headlineEl) {
            return headlineEl.id.replace('line', '') === num;
          });
        });
        console.log('lineOrder', options.lineOrder, headlines);
      }

      headlines.forEach(function (lineEl, index) {
        headlines.length - index - 1;
        childTL = gsap.timeline();
        var layers = grabAll('.layer', lineEl);

        if (lineEl.classList.contains('enter-anim')) {
          childTL.from(lineEl, {
            duration: duration,
            x: options.offsetX(lineEl, VER(-100, {
              '160x600': -50,
              'XMDedicated,728x90': -200
            })),
            ease: Power3.easeOut
          }, 0);
        }

        childTL.fromTo(grabAll('.fade-in:not(.manual)', lineEl), {
          maskPositionX: -900
        }, {
          duration: duration,
          maskPositionX: function maskPositionX(i, target) {
            var overWidth = Math.max(0, target.clientWidth - 500) * 0.5;
            return overWidth;
          },
          ease: ease
        }, 0); // childTL.fromTo(
        //     grabAll('.flare-in:not(.manual)', lineEl),
        //     {
        //         maskPositionX: -600,
        //     },
        //     {
        //         duration: duration * 1.2,
        //         maskPositionX: (i, target) => {
        //             const overWidth =
        //                 Math.max(0, target.clientWidth - 500) * 0.5
        //             return overWidth
        //         },
        //         ease: Linear.easeNone,
        //     },
        //     options.position('flare-in', 0)
        // )

        layers.forEach(function (layerEl) {
          var effectFunc = effect_2_Func[layerEl.dataset.effect];

          if (effectFunc) {
            childTL.add(effectFunc(layerEl, options[layerEl.dataset.effect + 'Options']), 0.2);
            return;
          }

          var words = grabAll('[id^=word]', layerEl);
          if (layerEl.classList.contains('reverse-words')) words.reverse();
          childTL.from(words, {
            duration: duration,
            x: function x(index) {
              return '+=' + index * VER(-15, {
                '728x90': -25
              });
            },
            ease: ease
          }, options.position(layerEl, 0));

          if (layerEl.classList.contains('flare-in')) {
            childTL.fromTo(layerEl, {
              maskPositionX: -600
            }, {
              duration: duration * 1.2,
              maskPositionX: function maskPositionX(i, target) {
                var overWidth = Math.max(0, target.clientWidth - 500) * 0.5;
                return overWidth;
              },
              ease: Linear.easeNone
            }, options.position('flare-in', 0));
          }
        });
        childTL.to(grabAll('.flare-in:not(.manual)', lineEl), {
          duration: 0.001,
          autoAlpha: 0
        });
        var pos = options.lineStagger * index;
        pos = options.position(lineEl, pos);
        tl.add(childTL, pos);
      });


      duration = options.exitDuration;
      var pos = options.totalDuration - options.exitDuration;

      if (options.hasExit) {
        headlines.forEach(function (lineEl, index) {
          childTL = gsap.timeline();
          childTL.to(lineEl, {
            duration: duration,
            x: VER(20, {
              '728x90': 50
            }),
            autoAlpha: 0,
            ease: Power2.easeIn
          }, 0);
          tl.add(childTL, pos + 0.1 * index);
        }); // end hidden

        tl.to(target, {
          duration: 0.001,
          autoAlpha: 0
        });
      }

      return tl;
    }

    if (!Math['imul']) Math['imul'] = function (a, b) {
      var aHi = a >>> 16 & 0xffff;
      var aLo = a & 0xffff;
      var bHi = b >>> 16 & 0xffff;
      var bLo = b & 0xffff; // the shift by 0 fixes the sign on the high part
      // the final |0 converts the unsigned value into a signed value

      return aLo * bLo + (aHi * bLo + aLo * bHi << 16 >>> 0) | 0;
    };

    function createArcEffect(root) {
      var tl = gsap.timeline();
      var duration = 1.5;
      tl.from(grab('.main', root), {
        duration: duration * 0.5,
        autoAlpha: 0,
        ease: Power1.easeOut
      }, 0);
      tl.from(grab('.main', root), {
        duration: duration,
        transformOrigin: '0 0',
        skewY: 10,
        y: 10,
        ease: Power1.easeOut
      }, 0);
      tl.from(root, {
        duration: duration * 2,
        maskPositionX: -500,
        ease: Linear.easeNone
      }, 0);
      return tl;
    }

    /*!
     * DrawSVGPlugin 3.8.0
     * https://greensock.com
     *
     * @license Copyright 2008-2021, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
    */

    /* eslint-disable */
    var gsap$1,
        _toArray,
        _win,
        _isEdge,
        _coreInitted,
        _windowExists = function _windowExists() {
      return typeof window !== "undefined";
    },
        _getGSAP = function _getGSAP() {
      return gsap$1 || _windowExists() && (gsap$1 = window.gsap) && gsap$1.registerPlugin && gsap$1;
    },
        _numExp = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
        //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
    _types = {
      rect: ["width", "height"],
      circle: ["r", "r"],
      ellipse: ["rx", "ry"],
      line: ["x2", "y2"]
    },
        _round = function _round(value) {
      return Math.round(value * 10000) / 10000;
    },
        _parseNum = function _parseNum(value) {
      return parseFloat(value) || 0;
    },
        _parseSingleVal = function _parseSingleVal(value, length) {
      var num = _parseNum(value);

      return ~value.indexOf("%") ? num / 100 * length : num;
    },
        _getAttributeAsNumber = function _getAttributeAsNumber(target, attr) {
      return _parseNum(target.getAttribute(attr));
    },
        _sqrt = Math.sqrt,
        _getDistance = function _getDistance(x1, y1, x2, y2, scaleX, scaleY) {
      return _sqrt(Math.pow((_parseNum(x2) - _parseNum(x1)) * scaleX, 2) + Math.pow((_parseNum(y2) - _parseNum(y1)) * scaleY, 2));
    },
        _warn = function _warn(message) {
      return console.warn(message);
    },
        _hasNonScalingStroke = function _hasNonScalingStroke(target) {
      return target.getAttribute("vector-effect") === "non-scaling-stroke";
    },
        _bonusValidated = 1,
        //<name>DrawSVGPlugin</name>
    //accepts values like "100%" or "20% 80%" or "20 50" and parses it into an absolute start and end position on the line/stroke based on its length. Returns an an array with the start and end values, like [0, 243]
    _parse = function _parse(value, length, defaultStart) {
      var i = value.indexOf(" "),
          s,
          e;

      if (i < 0) {
        s = defaultStart !== undefined ? defaultStart + "" : value;
        e = value;
      } else {
        s = value.substr(0, i);
        e = value.substr(i + 1);
      }

      s = _parseSingleVal(s, length);
      e = _parseSingleVal(e, length);
      return s > e ? [e, s] : [s, e];
    },
        _getLength = function _getLength(target) {
      target = _toArray(target)[0];

      if (!target) {
        return 0;
      }

      var type = target.tagName.toLowerCase(),
          style = target.style,
          scaleX = 1,
          scaleY = 1,
          length,
          bbox,
          points,
          prevPoint,
          i,
          rx,
          ry;

      if (_hasNonScalingStroke(target)) {
        //non-scaling-stroke basically scales the shape and then strokes it at the screen-level (after transforms), thus we need to adjust the length accordingly.
        scaleY = target.getScreenCTM();
        scaleX = _sqrt(scaleY.a * scaleY.a + scaleY.b * scaleY.b);
        scaleY = _sqrt(scaleY.d * scaleY.d + scaleY.c * scaleY.c);
      }

      try {
        //IE bug: calling <path>.getTotalLength() locks the repaint area of the stroke to whatever its current dimensions are on that frame/tick. To work around that, we must call getBBox() to force IE to recalculate things.
        bbox = target.getBBox(); //solely for fixing bug in IE - we don't actually use the bbox.
      } catch (e) {
        //firefox has a bug that throws an error if the element isn't visible.
        _warn("Some browsers won't measure invisible elements (like display:none or masks inside defs).");
      }

      var _ref = bbox || {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
          x = _ref.x,
          y = _ref.y,
          width = _ref.width,
          height = _ref.height;

      if ((!bbox || !width && !height) && _types[type]) {
        //if the element isn't visible, try to discern width/height using its attributes.
        width = _getAttributeAsNumber(target, _types[type][0]);
        height = _getAttributeAsNumber(target, _types[type][1]);

        if (type !== "rect" && type !== "line") {
          //double the radius for circles and ellipses
          width *= 2;
          height *= 2;
        }

        if (type === "line") {
          x = _getAttributeAsNumber(target, "x1");
          y = _getAttributeAsNumber(target, "y1");
          width = Math.abs(width - x);
          height = Math.abs(height - y);
        }
      }

      if (type === "path") {
        prevPoint = style.strokeDasharray;
        style.strokeDasharray = "none";
        length = target.getTotalLength() || 0;
        scaleX !== scaleY && _warn("Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled.");
        length *= (scaleX + scaleY) / 2;
        style.strokeDasharray = prevPoint;
      } else if (type === "rect") {
        length = width * 2 * scaleX + height * 2 * scaleY;
      } else if (type === "line") {
        length = _getDistance(x, y, x + width, y + height, scaleX, scaleY);
      } else if (type === "polyline" || type === "polygon") {
        points = target.getAttribute("points").match(_numExp) || [];
        type === "polygon" && points.push(points[0], points[1]);
        length = 0;

        for (i = 2; i < points.length; i += 2) {
          length += _getDistance(points[i - 2], points[i - 1], points[i], points[i + 1], scaleX, scaleY) || 0;
        }
      } else if (type === "circle" || type === "ellipse") {
        rx = width / 2 * scaleX;
        ry = height / 2 * scaleY;
        length = Math.PI * (3 * (rx + ry) - _sqrt((3 * rx + ry) * (rx + 3 * ry)));
      }

      return length || 0;
    },
        _getPosition = function _getPosition(target, length) {
      target = _toArray(target)[0];

      if (!target) {
        return [0, 0];
      }

      length || (length = _getLength(target) + 1);

      var cs = _win.getComputedStyle(target),
          dash = cs.strokeDasharray || "",
          offset = _parseNum(cs.strokeDashoffset),
          i = dash.indexOf(",");

      i < 0 && (i = dash.indexOf(" "));
      dash = i < 0 ? length : _parseNum(dash.substr(0, i));
      dash > length && (dash = length);
      return [-offset || 0, dash - offset || 0];
    },
        _initCore = function _initCore() {
      if (_windowExists()) {
        _win = window;
        _coreInitted = gsap$1 = _getGSAP();
        _toArray = gsap$1.utils.toArray;
        _isEdge = ((_win.navigator || {}).userAgent || "").indexOf("Edge") !== -1; //Microsoft Edge has a bug that causes it not to redraw the path correctly if the stroke-linecap is anything other than "butt" (like "round") and it doesn't match the stroke-linejoin. A way to trigger it is to change the stroke-miterlimit, so we'll only do that if/when we have to (to maximize performance)
      }
    };

    var DrawSVGPlugin = {
      version: "3.8.0",
      name: "drawSVG",
      register: function register(core) {
        gsap$1 = core;

        _initCore();
      },
      init: function init(target, value, tween, index, targets) {
        if (!target.getBBox) {
          return false;
        }

        _coreInitted || _initCore();

        var length = _getLength(target),
            start,
            end,
            cs;

        this._style = target.style;
        this._target = target;

        if (value + "" === "true") {
          value = "0 100%";
        } else if (!value) {
          value = "0 0";
        } else if ((value + "").indexOf(" ") === -1) {
          value = "0 " + value;
        }

        start = _getPosition(target, length);
        end = _parse(value, length, start[0]);
        this._length = _round(length);
        this._dash = _round(start[1] - start[0]); //some browsers render artifacts if dash is 0, so we use a very small number in that case.

        this._offset = _round(-start[0]);
        this._dashPT = this.add(this, "_dash", this._dash, _round(end[1] - end[0]));
        this._offsetPT = this.add(this, "_offset", this._offset, _round(-end[0]));

        if (_isEdge) {
          //to work around a bug in Microsoft Edge, animate the stroke-miterlimit by 0.0001 just to trigger the repaint (unnecessary if it's "round" and stroke-linejoin is also "round"). Imperceptible, relatively high-performance, and effective. Another option was to set the "d" <path> attribute to its current value on every tick, but that seems like it'd be much less performant.
          cs = _win.getComputedStyle(target);

          if (cs.strokeLinecap !== cs.strokeLinejoin) {
            end = _parseNum(cs.strokeMiterlimit);
            this.add(target.style, "strokeMiterlimit", end, end + 0.01);
          }
        }

        this._live = _hasNonScalingStroke(target) || ~(value + "").indexOf("live");
        this._nowrap = ~(value + "").indexOf("nowrap");

        this._props.push("drawSVG");

        return _bonusValidated;
      },
      render: function render(ratio, data) {
        var pt = data._pt,
            style = data._style,
            length,
            lengthRatio,
            dash,
            offset;

        if (pt) {
          //when the element has vector-effect="non-scaling-stroke" and the SVG is resized (like on a window resize), it actually changes the length of the stroke! So we must sense that and make the proper adjustments.
          if (data._live) {
            length = _getLength(data._target);

            if (length !== data._length) {
              lengthRatio = length / data._length;
              data._length = length;

              if (data._offsetPT) {
                data._offsetPT.s *= lengthRatio;
                data._offsetPT.c *= lengthRatio;
              }

              if (data._dashPT) {
                data._dashPT.s *= lengthRatio;
                data._dashPT.c *= lengthRatio;
              } else {
                data._dash *= lengthRatio;
              }
            }
          }

          while (pt) {
            pt.r(ratio, pt.d);
            pt = pt._next;
          }

          dash = data._dash || ratio && ratio !== 1 && 0.0001 || 0; // only let it be zero if it's at the start or end of the tween.

          length = data._length - dash + 0.1;
          offset = data._offset;
          dash && offset && dash + Math.abs(offset % data._length) > data._length - 0.2 && (offset += offset < 0 ? 0.1 : -0.1) && (length += 0.1);
          style.strokeDashoffset = dash ? offset : offset + 0.001;
          style.strokeDasharray = length < 0.2 ? "none" : dash ? dash + "px," + (data._nowrap ? 999999 : length) + "px" : "0px, 999999px";
        }
      },
      getLength: _getLength,
      getPosition: _getPosition
    };
    _getGSAP() && gsap$1.registerPlugin(DrawSVGPlugin);

    gsap.registerPlugin(DrawSVGPlugin);
    function createPhoneUIAnimEffect() {
      var tl = gsap.timeline();
      var ease, duration;
      ease = lockedEase(0.2, 1); // ▄▀▄ █ █ ▄▀▄ █
      // ▀▄▀ ▀▄▀ █▀█ █▄▄

      tl.from(['#phones svg #oval-outter', '#phones svg #oval-inner'], {
        duration: 0.75,
        scale: 0,
        transformOrigin: '50% 50%',
        ease: ease,
        stagger: 0.175
      }, 0); // ▀█▀ ██▀ ▀▄▀ ▀█▀
      //  █  █▄▄ █ █  █
      // good-luck-1-text good-luck-2-text transfer-text

      tl.from(['#phones svg #transfer-text'], {
        duration: 0.9,
        y: '+=50',
        opacity: 0,
        ease: ease
      }, 0.2);
      tl.from(['#phones svg #good-luck-2-text'], {
        duration: 0.9,
        y: '-=50',
        opacity: 0,
        ease: ease
      }, 0.2);
      tl.from(['#phones svg #good-luck-1-text'], {
        duration: 0.9,
        y: '-=50',
        opacity: 0,
        ease: ease
      }, 0.2 + 0.2); // ▄▀▀ █▄█ ██▀ ▄▀▀ █▄▀ █▄ ▄█ ▄▀▄ █▀▄ █▄▀
      // ▀▄▄ █ █ █▄▄ ▀▄▄ █ █ █ ▀ █ █▀█ █▀▄ █ █

      ease = Elastic.easeOut.config(0.5, 0.4);
      ease = combine(Power1.easeIn, ease); // EaseViz.show(ease)

      var pos = 0.65;
      duration = 0.7;
      tl.fromTo(['#phones svg #check-mark', '#phones svg #check-mark-white'], {
        drawSVG: '0'
      }, {
        duration: duration,
        drawSVG: '86%',
        ease: ease
      }, pos);
      tl.to(['#phones svg #check-mark', '#phones svg #check-mark-white'], {
        duration: duration * 0.25,
        y: '+=6',
        ease: Power1.easeOut
      }, pos);
      tl.to(['#phones svg #check-mark', '#phones svg #check-mark-white'], {
        duration: duration * 0.25,
        y: '-=6',
        ease: Power1.easeOut
      }, duration * 0.25 + pos); // tl.fromTo(
      //     ['#phones svg #check-mark', '#phones svg #check-mark-white'],
      //     {
      //         scale: 0.35,
      //         transformOrigin: '22% 90%',
      //         ease: EaseUtil.lockedEase(0.5, 1),
      //     },
      //     {
      //         duration: duration * 0.7,
      //         scale: 1,
      //         transformOrigin: '22% 90%',
      //         ease: EaseUtil.lockedEase(0.2, 1),
      //     },
      //     pos
      // )

      return tl;
    }

    gsap.registerPlugin(DrawSVGPlugin);
    function createPhoneXLogoAnimEffect() {
      var tl = gsap.timeline();
      var ease, duration;
      ease = Elastic.easeOut.config(0.5, 0.4);
      ease = combine(Power1.easeIn, ease); // EaseViz.show(ease)

      duration = 1.1;
      tl.fromTo(['#phones svg #x-cross-stroke-B'], {
        drawSVG: '0'
      }, {
        duration: duration,
        drawSVG: '100%',
        ease: ease
      }, 0);
      tl.fromTo(['#phones svg #x-cross-stroke-A'], {
        drawSVG: '0'
      }, {
        duration: duration,
        drawSVG: '100%',
        ease: ease
      }, 0.5);
      var data = {
        glowAmount: 1
      };
      var glowTarget = grab('#phones svg#phone-x-logo');

      function drawGlow(glowAmount) {
        var filterStr = '';
        filterStr += " drop-shadow(0 0 ".concat(1 * glowAmount.toFixed(1), "px #fff) ");
        filterStr += " drop-shadow(0 0 ".concat(2 * glowAmount.toFixed(1), "px #fff) ");
        filterStr += " drop-shadow(0 0 ".concat(6 * glowAmount.toFixed(1), "px #fff) ");
        glowTarget.style.filter = filterStr;
      }

      drawGlow(data.glowAmount);
      tl.to(data, {
        duration: 2,
        glowAmount: 0,
        onUpdate: function onUpdate() {
          drawGlow(data.glowAmount);
        },
        ease: bendTime(Power2.easeInOut, 1)
      }, 0.2);
      return tl;
    }

    function createMainTL() {
      var tl = gsap.timeline();
      var ease, duration;
      duration = 2;
      ease = Linear.easeNone;
      var totalDuration = 3; // █▀ █▀▄ ▄▀▄ █▄ ▄█ ██▀   ▀█
      // █▀ █▀▄ █▀█ █ ▀ █ █▄▄   ▄█▄
      // const frame1TL = createFrameTL(grab('#frame1'))
      // tl.addLabel('frame1', '.5')
      // tl.add(frame1TL, '.5')
      // █▀ █▀▄ ▄▀▄ █▄ ▄█ ██▀    ▀▀▄
      // █▀ █▀▄ █▀█ █ ▀ █ █▄▄    █▄▄

      var frame2TL = createFrameTL(grab('#frame2'), {
        totalDuration: totalDuration,
        position: function position(target, defaultPos) {
          if (MATCH('tiny') && target === 'flare-in') {
            console.log('ADDED TIME', target);
            return defaultPos + 0.2;
          }

          return defaultPos;
        }
      }); // tl.addLabel('frame2', VER('-=.65', { '300x600': '-=.4' }))
      // tl.add(frame2TL, VER('-=.65', { '300x600': '-=.4', '728x90': '-=.4' }))

      tl.addLabel('frame2', '.5');
      tl.add(frame2TL, '.5'); // █▀ █▀▄ ▄▀▄ █▄ ▄█ ██▀    ▀██
      // █▀ █▀▄ █▀█ █ ▀ █ █▄▄    ▄▄█

      var frame3TL = createFrameTL(grab('#frame3'), {
        totalDuration: 3.75
      });
      tl.addLabel('frame3', '-=.1').add(frame3TL, 'frame3'); // █▀ █▀▄ ▄▀▄ █▄ ▄█ ██▀    █ █
      // █▀ █▀▄ █▀█ █ ▀ █ █▄▄    ▀▀█

      var frame4TL = createFrameTL(grab('#frame4'), {
        hasExit: false,
        offsetX: function offsetX(target, value) {
          console.log('offsetX', target);
          if (target.id === 'line3') return -100;
          if (target.id === 'line4') return -100;
          if (!MATCH('tiny') && target.id === 'cta-headline') return -175;
          if (MATCH('tiny') && target.id === 'cta-headline') return -100;
          return value;
        },
        position: function position(target, defaultPos) {
          if (MATCH('728x90') && target.id === 'cta-headline') {
            console.log('ADDED TIME', target);
            return defaultPos - 0.4;
          }

          if (MATCH('tiny') && target.id === 'cta-headline') {
            console.log('ADDED TIME', target);
            return defaultPos - 0.4;
          }

          if (target === 'flare-in') return defaultPos + 0.6;
          return defaultPos;
        }
      });
      frame4TL.from('#endframe-inline-legal', 1, {
        opacity: 0
      }, 1.25);

      if (!MATCH('tiny')) {

        var arcTL = createArcEffect(grab('#arc'));
        frame4TL.add(arcTL, 1);
        var phonesTL = gsap.timeline();
        duration = 2;
        var gradDuration = 2.5;

        if (MATCH('300x250')) {
          duration = 2.5;
          gradDuration = 3;
        }

        ease = lockedEase(0.5, 1);
        phonesTL.from('#phones .phone.front', _objectSpread2({
          duration: duration,
          x: 200,
          rotationY: -120,
          ease: ease
        }, VER(null, {
          '728x90': {
            x: 30,
            y: 170
          },
          '300x600': {
            x: 180
          },
          tiny: {
            x: 30,
            y: 170
          }
        })), 0);
        var opacityStart = 1;
        var opacityEnd = 0.2;

        if (MATCH('customer') && MATCH('300x250')) {
          opacityStart = 0.4;
          opacityEnd = 0.2;
        }

        if (MATCH('customer') && MATCH('728x90')) {
          opacityStart = 0.4;
          opacityEnd = 0.2;
        }

        phonesTL.fromTo('#phones .phone.front #grad', gradDuration, {
          x: -350,
          y: -200,
          scaleX: 1,
          scaleY: 2,
          rotation: 25,
          opacity: opacityStart,
          transformOrigin: '50% 50%',
          ease: Power1.easeOut
        }, {
          x: 350,
          y: 200,
          opacity: opacityEnd,
          ease: Power1.easeOut
        }, 0.1);
        frame4TL.add(phonesTL, 1);
      }

      if (MATCH('728x90')) {
        frame4TL.from('#xfinity-logo', {
          duration: 1,
          y: -21,
          ease: Power1.easeInOut
        }, 0.5);
      }

      if (MATCH('tiny')) {
        var _arcTL = createArcEffect(grab('#arc'));

        frame4TL.add(_arcTL, 1);
        frame4TL.from('#xfinity-logo', {
          duration: 1,
          x: 6,
          y: -12,
          ease: Power1.easeInOut
        }, 0);
      }

      MATCH('UIAnim') && frame4TL.add(createPhoneUIAnimEffect(), 1.9);
      MATCH('XLogoAnim') && frame4TL.add(createPhoneXLogoAnimEffect(), 1.9);
      tl.addLabel('frame4', '-=.5').add(frame4TL, 'frame4');
      tl.to('#super-cover', 0.75, {
        autoAlpha: 0
      }, 0);
      tl.delay(0.25);
      return tl;
    }

    window.CONFIG = createConfig(window.CONFIG);
    CSSPlugin['defaultSkewType'] = 'simple';
    gsap.config({
      nullTargetWarn: false
    });
    gsap.registerPlugin(glowPlugin);
    gsap.registerPlugin(brightnessPlugin);
    gsap.registerPlugin(maskPositionXPlugin);
    gsap.registerPlugin(maskPositionYPlugin);
    gsap.registerPlugin(maskSizeXPlugin);
    gsap.registerPlugin(maskSizeYPlugin); // concept specific imports

    if (navigator.userAgent.toLowerCase().indexOf('safari') > -1 && navigator.vendor.toLowerCase().indexOf('apple') > -1) {
      document.getElementsByTagName('html')[0].className += ' browser-safari';
    } // LOADING and INIT


    function start() {
      console.log('start');
      setTimeout(function () {
        var banner = createBanner(window.CONFIG, {
          createMainTL: createMainTL
        });
        window.banner = banner;
      }, 250);
    } // LOADING and INIT


    var isWindowReady = false;

    function checkAll() {
      if (isWindowReady) {
        setTimeout(function () {
          start();
        }, 250);
      }
    }

    if (document.readyState == 'complete') {
      isWindowReady = true;
      checkAll();
    } else {
      window.addEventListener('load', function () {
        isWindowReady = true;
        checkAll();
      });
    }

}));
//# sourceMappingURL=banner__customer.js.map
