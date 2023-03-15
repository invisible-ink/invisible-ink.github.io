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

    var svgEl;
    var innerEl;
    var size = 200;
    var colors = ['#a1ef79', '#ff8b9c', '#ffaeb6', '#8e478c', '#bf7958', '#2e3740', '#8d87a2', '#64468d', '#39314b', '#564064', '#827094', '#472d3c', '#e1534a', '#eea160', '#101e29', '#f8f8f8', '#00a383', '#4f546b', '#dff6f5', '#92f4ff', '#3978a8', '#00635c', '#7d7071', '#f4b41b', '#42cafd', '#5a5353', '#ffce00', '#3fc778', '#71aa34', '#243f72', '#50576b', '#fbfcaa', '#b6d53c', '#005f1b', '#a05b53', '#ae57a4', '#cfc6b8', '#f47e1b', '#5e3643', '#ea71bd', '#bcb7c5', '#a0938e', '#7a444a', '#a93b3b', '#3f7e00', '#f4cca1', '#302c2e'];
    function init() {
      if (svgEl) return;
      svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      document.body.appendChild(svgEl);
      svgEl.id = 'inklib-ease-viz';
      svgEl.classList.add('see-all-move-me');
      var left = 10;
      var top = 10;

      if (window.CONFIG.height > 400) {
        left = window.CONFIG.width + 150;
      } else {
        top = window.CONFIG.height + 50;
      }

      svgEl.setAttribute('width', size + 100 + '');
      svgEl.setAttribute('height', size + 100 + '');
      svgEl['s' + 'tyle'] = "\n        position: absolute;\n        left: ".concat(left, "px;\n        top: ").concat(top, "px;\n        background: #eee;\n        border: 1px solid black;\n        display: ").concat(window.IS_DEV ? 'block' : 'none', ";\n        ");
      innerEl = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      innerEl.setAttribute('style', 'transform: translate(50px,50px)');
      svgEl.appendChild(innerEl);

      function liner(x1, y1, x2, y2) {
        var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'black';
        var opacity = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
        var dash = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';
        var lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        innerEl.appendChild(lineEl);
        lineEl.setAttribute('x1', x1 + '');
        lineEl.setAttribute('y1', y1 + '');
        lineEl.setAttribute('x2', x2 + '');
        lineEl.setAttribute('y2', y2 + '');
        lineEl.setAttribute('fill', 'none');
        lineEl.setAttribute('stroke', color);
        lineEl.setAttribute('opacity', opacity + '');
        lineEl.setAttribute('stroke-dasharray', dash);
      }

      liner(0, size, size, 0, 'black', 0.2, '2');
      liner(size / 2, 0, size / 2, size, 'red', 0.1);
      liner(0, size / 2, size, size / 2, 'red', 0.1);
      return svgEl;
    }
    function show(easeFunc) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options = _objectSpread2({
        color: colors.pop(),
        opacity: 1,
        strokeWidth: 2,
        dashed: false
      }, options);
      init();
      var pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      innerEl.appendChild(pathEl);
      pathEl.setAttribute('stroke', options.color);
      pathEl.setAttribute('stroke-width', options.strokeWidth);
      pathEl.setAttribute('fill', 'none');
      pathEl.setAttribute('opacity', options.opacity + '');

      if (options.dashed) {
        pathEl.setAttribute('stroke-dasharray', '2');
      }

      var d = "M0,".concat(size, " ");

      for (var i = 0; i < size; i++) {
        var _easeFunc$getRatio;

        var per = i / (size - 1);
        var y = ((_easeFunc$getRatio = easeFunc.getRatio) !== null && _easeFunc$getRatio !== void 0 ? _easeFunc$getRatio : easeFunc)(per);
        y = (1 - y) * size;
        d += "L".concat(i, ",").concat(y, " ");
      }

      pathEl.setAttribute('d', d);
      return easeFunc;
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

    function LU(A, fast) {
      var abs = Math.abs;
      var i, j, k, absAjk, Akk, Ak, Pk, Ai;
      var max;
      var n = A.length,
          n1 = n - 1;
      var P = new Array(n); // if (!fast) A = clone(A)

      for (k = 0; k < n; ++k) {
        Pk = k;
        Ak = A[k];
        max = abs(Ak[k]);

        for (j = k + 1; j < n; ++j) {
          absAjk = abs(A[j][k]);

          if (max < absAjk) {
            max = absAjk;
            Pk = j;
          }
        }

        P[k] = Pk;

        if (Pk != k) {
          A[k] = A[Pk];
          A[Pk] = Ak;
          Ak = A[k];
        }

        Akk = Ak[k];

        for (i = k + 1; i < n; ++i) {
          A[i][k] /= Akk;
        }

        for (i = k + 1; i < n; ++i) {
          Ai = A[i];

          for (j = k + 1; j < n1; ++j) {
            Ai[j] -= Ai[k] * Ak[j];
            ++j;
            Ai[j] -= Ai[k] * Ak[j];
          }

          if (j === n1) Ai[j] -= Ai[k] * Ak[j];
        }
      }

      return {
        LU: A,
        P: P
      };
    }

    function LUsolve(LUP, b) {
      var i, j;
      var LU = LUP.LU;
      var n = LU.length; // var x = clone(b)

      var x = JSON.parse(JSON.stringify(b));
      var P = LUP.P;
      var Pi, LUi, tmp;

      for (i = n - 1; i !== -1; --i) {
        x[i] = b[i];
      }

      for (i = 0; i < n; ++i) {
        Pi = P[i];

        if (P[i] !== i) {
          tmp = x[i];
          x[i] = x[Pi];
          x[Pi] = tmp;
        }

        LUi = LU[i];

        for (j = 0; j < i; ++j) {
          x[i] -= x[j] * LUi[j];
        }
      }

      for (i = n - 1; i >= 0; --i) {
        LUi = LU[i];

        for (j = i + 1; j < n; ++j) {
          x[i] -= x[j] * LUi[j];
        }

        x[i] /= LUi[i];
      }

      return x;
    }

    function solve(A, b, fast) {
      return LUsolve(LU(A), b);
    }

    function createCSSTransformFromCorners(src, dst) {
      // src and dst should have length 4 each
      var count = 4;
      var a = []; // (2*count) x 8 matrix

      var b = []; // (2*count) vector

      for (var i = 0; i < 2 * count; ++i) {
        a.push([0, 0, 0, 0, 0, 0, 0, 0]);
        b.push(0);
      }

      for (var i = 0; i < count; ++i) {
        var j = i + count;
        a[i][0] = a[j][3] = src[i][0];
        a[i][1] = a[j][4] = src[i][1];
        a[i][2] = a[j][5] = 1;
        a[i][3] = a[i][4] = a[i][5] = a[j][0] = a[j][1] = a[j][2] = 0;
        a[i][6] = -src[i][0] * dst[i][0];
        a[i][7] = -src[i][1] * dst[i][0];
        a[j][6] = -src[i][0] * dst[i][1];
        a[j][7] = -src[i][1] * dst[i][1];
        b[i] = dst[i][0];
        b[j] = dst[i][1];
      }

      var x = solve(a, b); // matrix3d is homogenous coords in column major!
      // the z coordinate is unused

      var m = [x[0], x[3], 0, x[6], x[1], x[4], 0, x[7], 0, 0, 1, 0, x[2], x[5], 0, 1];
      var transform = 'matrix3d(';

      for (var i = 0; i < m.length - 1; ++i) {
        transform += m[i] + ',';
      }

      transform += m[15] + ')';
      return transform;
    }

    function createDrawPoint(destEl) {
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'red';
      var el = document.createElement('div');
      el.style = "\n            position: absolute;\n            left: 0px;\n            top: 0px;\n            width: 0;\n            height: 0;\n            outline: 2px solid ".concat(color, ";\n        ");
      destEl.appendChild(el);
      return el;
    }

    function drawPoint(point, x, y) {
      point.style.left = x.toFixed(1) + 'px';
      point.style.top = y.toFixed(1) + 'px';
    }

    var dpTop0, dpTop90, dpTop180, dpTop270, dpBot0, dpBot90, dpBot180, dpBot270;

    function drawPoints(pT1, pT2, pT3, pT4, pB1, pB2, pB3, pB4) {
      drawPoint(dpTop0, pT1[0], pT1[1]);
      drawPoint(dpTop90, pT2[0], pT2[1]);
      drawPoint(dpTop180, pT3[0], pT3[1]);
      drawPoint(dpTop270, pT4[0], pT4[1]);
      drawPoint(dpBot0, pB1[0], pB1[1]);
      drawPoint(dpBot90, pB2[0], pB2[1]);
      drawPoint(dpBot180, pB3[0], pB3[1]);
      drawPoint(dpBot270, pB4[0], pB4[1]);
    }

    function createModemTurnEffect(root) {
      var tl = gsap.timeline();
      var ease, duration;
      var leftEl = grab('#left', root);
      var frontEl = grab('#front', root);
      var topEl = grab('#top', root);
      var shouldDraw = window.IS_DEV;

      if (shouldDraw) {
        dpTop0 = createDrawPoint(root, 'red');
        dpTop90 = createDrawPoint(root, 'blue');
        dpTop180 = createDrawPoint(root, 'green');
        dpTop270 = createDrawPoint(root, 'orange');
        dpBot0 = createDrawPoint(root, 'red');
        dpBot90 = createDrawPoint(root, 'blue');
        dpBot180 = createDrawPoint(root, 'green');
        dpBot270 = createDrawPoint(root, 'orange');
      }

      var topCenter = [56, 22];
      var radiusWidthTop = 40;
      var radiusHeightTop = 7;
      var squashTop = radiusHeightTop / radiusWidthTop;
      var botCenter = [56, 135];
      var radiusWidthBot = 36;
      var radiusHeightBot = 12;
      var squashBot = radiusHeightBot / radiusWidthBot;
      var data = {
        rotation: -6,
        squashMod: 1
      };

      function createPointsAtRotation(rotation) {
        var squashMod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var rads = rotation / (180 / Math.PI);
        var rads90 = Math.PI / 2;
        var p0Rads = rads + rads90 * 0;
        var p90Rads = rads + rads90 * 1;
        var p180Rads = rads + rads90 * 2;
        var p270Rads = rads + rads90 * 3; // TOP

        var pTop0 = [Math.cos(p0Rads) * radiusWidthTop, Math.sin(p0Rads) * radiusWidthTop];
        var pTop90 = [Math.cos(p90Rads) * radiusWidthTop, Math.sin(p90Rads) * radiusWidthTop];
        var pTop180 = [Math.cos(p180Rads) * radiusWidthTop, Math.sin(p180Rads) * radiusWidthTop];
        var pTop270 = [Math.cos(p270Rads) * radiusWidthTop, Math.sin(p270Rads) * radiusWidthTop]; // pTop180[1] += 8 / squashTop
        // pTop270[1] += 5 / squashTop

        pTop0[1] *= squashTop * squashMod;
        pTop90[1] *= squashTop * squashMod;
        pTop180[1] *= squashTop * squashMod;
        pTop270[1] *= squashTop * squashMod;
        pTop0[0] += topCenter[0];
        pTop0[1] += topCenter[1];
        pTop90[0] += topCenter[0];
        pTop90[1] += topCenter[1];
        pTop180[0] += topCenter[0];
        pTop180[1] += topCenter[1];
        pTop270[0] += topCenter[0];
        pTop270[1] += topCenter[1]; // BOTTOM

        var pBot0 = [Math.cos(p0Rads) * radiusWidthBot, Math.sin(p0Rads) * radiusWidthBot];
        var pBot90 = [Math.cos(p90Rads) * radiusWidthBot, Math.sin(p90Rads) * radiusWidthBot];
        var pBot180 = [Math.cos(p180Rads) * radiusWidthBot, Math.sin(p180Rads) * radiusWidthBot];
        var pBot270 = [Math.cos(p270Rads) * radiusWidthBot, Math.sin(p270Rads) * radiusWidthBot];
        pBot0[1] *= squashBot * squashMod;
        pBot90[1] *= squashBot * squashMod;
        pBot180[1] *= squashBot * squashMod;
        pBot270[1] *= squashBot * squashMod;
        pBot0[0] += botCenter[0];
        pBot0[1] += botCenter[1];
        pBot90[0] += botCenter[0];
        pBot90[1] += botCenter[1];
        pBot180[0] += botCenter[0];
        pBot180[1] += botCenter[1];
        pBot270[0] += botCenter[0];
        pBot270[1] += botCenter[1];
        return [pTop0, pTop90, pTop180, pTop270, pBot0, pBot90, pBot180, pBot270];
      }

      function createSourceCorners(pTL, pTR, pBL, pBR) {
        return [_toConsumableArray(pTL), _toConsumableArray(pTR), _toConsumableArray(pBL), _toConsumableArray(pBR)];
      }

      var startPoints = createPointsAtRotation(data.rotation);
      var sourceCornersLeft = createSourceCorners(startPoints[1], startPoints[0], startPoints[4], startPoints[5]);
      var sourceCornersFront = createSourceCorners(startPoints[2], startPoints[1], startPoints[5], startPoints[6]);
      var sourceCornersTop = createSourceCorners(startPoints[3], startPoints[0], startPoints[1], startPoints[2]);
      duration = VER(1.5, {
        '300x600': 1.5 * 1.6,
        '728x90': 1.5 * 1.2,
        '970x90': 1.5 * 1.2
      });
      ease = lockedEase(0.5, 1);
      show(ease);
      tl.from(data, {
        duration: duration,
        rotation: 60,
        squashMod: 0.5,
        ease: lockedEase(0.7, 1),
        onUpdate: function onUpdate() {
          var destCorners = createPointsAtRotation(data.rotation, data.squashMod);
          if (shouldDraw) drawPoints.apply(void 0, _toConsumableArray(destCorners));
          leftEl.style.transform = createCSSTransformFromCorners(sourceCornersLeft, [destCorners[1], destCorners[0], destCorners[4], destCorners[5]]);
          frontEl.style.transform = createCSSTransformFromCorners(sourceCornersFront, [destCorners[2], destCorners[1], destCorners[5], destCorners[6]]);
          topEl.style.transform = createCSSTransformFromCorners(sourceCornersTop, [destCorners[3], destCorners[0], destCorners[1], destCorners[2]]);
        }
      }, 0);

      if (!MATCH('wide')) {
        tl.from(root, _objectSpread2(_objectSpread2({
          duration: duration,
          x: 175
        }, VER(null, {
          '300x600': {
            x: 300
          },
          '160x600': {
            x: 150
          }
        })), {}, {
          ease: ease
        }), 0);
      } else {
        tl.from(root, {
          duration: duration,
          y: 130,
          scale: 0.85,
          ease: ease
        }, 0);
        tl.from(root, {
          duration: duration,
          x: VER(100, {
            tiny: 50
          }),
          ease: bendTime(ease, 1.5)
        }, 0);
      }

      tl.from(grab('.mask', root), {
        duration: duration,
        scaleX: 0.88,
        skewY: -3.5,
        y: 1,
        transformOrigin: '90px 0',
        ease: ease
      }, 0);
      return tl;
    }

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

    function createMainTL() {
      var tl = gsap.timeline();
      var ease, duration;
      duration = 2;
      ease = Linear.easeNone;
      // █▀ █▀▄ █▀█ █ ▀ █ █▄▄   ▄█▄
      // const frame1TL = createFrameTL(grab('#frame1'))
      // // scaler
      // frame1TL.to(
      //     '#frame1 .pulse-anim',
      //     {
      //         duration: 1.5,
      //         scale: VER(1.3, {
      //             '160x600': 1.15,
      //             '728x90': 1.2,
      //             '970x90': 1.2,
      //             tiny: 1.2,
      //         }),
      //         ease: EaseUtil.bendTime(
      //             EaseUtil.combine(
      //                 EaseUtil.thereAndBack(),
      //                 EaseUtil.lockedEase(0.2, 0.9)
      //             ),
      //             1.1
      //         ),
      //     },
      //     0.9
      // )
      // tl.add(frame1TL, '.5')
      // █▀ █▀▄ ▄▀▄ █▄ ▄█ ██▀    ▀▀▄
      // █▀ █▀▄ █▀█ █ ▀ █ █▄▄    █▄▄

      var frame2TL = createFrameTL(grab('#frame2'), {
        position: function position(target, defaultPos) {
          if (MATCH('300x250') && target.id === 'line2') {
            console.log('ADDED TIME', target);
            return defaultPos + 0.25;
          }

          if (MATCH('tiny') && target === 'flare-in') {
            console.log('ADDED TIME', target);
            return defaultPos + 0.25;
          }

          return defaultPos;
        } // ...(MATCH('wide') && {
        //     enterWithWords: true,
        // }),

      });
      tl.add(frame2TL, '.5'); // █▀ █▀▄ ▄▀▄ █▄ ▄█ ██▀    ▀██
      // █▀ █▀▄ █▀█ █ ▀ █ █▄▄    ▄▄█

      var frame3TL = createFrameTL(grab('#frame3'), {
        totalDuration: 3.75,
        position: function position(target, defaultPos) {
          if (MATCH('tiny') && target === 'flare-in') {
            console.log('ADDED TIME', target);
            return defaultPos + 0.75;
          }

          return defaultPos;
        } // ...(MATCH('wide') && {
        //     reverseLines: true,
        // }),

      });
      tl.add(frame3TL, '-=.5'); // █▀ █▀▄ ▄▀▄ █▄ ▄█ ██▀    █ █
      // █▀ █▀▄ █▀█ █ ▀ █ █▄▄    ▀▀█

      var frame4TL = createFrameTL(grab('#frame4'), {
        hasExit: false,
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
        } // ...(MATCH('wide') &&
        //     {
        //         // reverseLines: true,
        //     }),

      });
      frame4TL.from('#endframe-inline-legal', 1, {
        opacity: 0
      }, 1.25);
      var arcTL = createArcEffect(grab('#arc'));
      frame4TL.add(createModemTurnEffect(grab('#frame4 #modem-XB8')), 1);
      frame4TL.add(arcTL, 1);

      if (MATCH('728x90')) {
        frame4TL.from('#xfinity-logo', _objectSpread2(_objectSpread2({
          duration: 1,
          y: -22
        }, MATCH('728x90') && {
          x: 0,
          y: -21
        }), {}, {
          ease: Power1.easeInOut
        }), 0.4);
      }

      if (MATCH('tiny')) {
        frame4TL.from('#xfinity-logo', {
          duration: 1,
          x: 6,
          y: -12,
          ease: Power1.easeInOut
        }, 0);
      }

      {
        var tabletTL = gsap.timeline();
        var tabletStart = 0;
        var tabletGradStart = 0.1;

        if (MATCH('300x600')) {
          tabletStart = 0.5;
          tabletGradStart = 0.6;
        } else if (MATCH('728x90')) {
          tabletStart = 0.2;
          tabletGradStart = 0.3;
        }

        duration = 2;
        ease = lockedEase(0.5, 1);
        tabletTL.from('#tablet > .inner', _objectSpread2({
          duration: duration,
          x: 150,
          rotationY: -120,
          rotationZ: 10,
          ease: ease
        }, VER(null, {
          '728x90': {
            x: 120,
            y: 170
          }
        })), tabletStart);
        var sheenOpacityMod = 1.25;
        tabletTL.fromTo('#tablet #grad', 2, {
          x: -350,
          y: -200,
          scaleX: 1,
          scaleY: 2,
          rotation: 25,
          opacity: 0.1 * sheenOpacityMod,
          transformOrigin: '50% 50%',
          ease: Power1.easeOut
        }, {
          x: 350,
          y: 200,
          opacity: 0.2 * sheenOpacityMod,
          ease: Power1.easeOut
        }, tabletGradStart);
        frame4TL.add(tabletTL, 1);
      }
      tl.add(frame4TL, '-=.5');
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
//# sourceMappingURL=banner__noOffer.js.map
