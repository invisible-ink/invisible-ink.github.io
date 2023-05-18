"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  // Source/scripts/banner/createBanner.js
  function createBanner(config2) {
    var versionMapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var mainTL;
    if (!mainTL) mainTL = versionMapper["createMainTL"]();

    function animate() {
      if (window["fnStartAnimation"]) {
        window["fnStartAnimation"]();
      }

      if (mainTL) {
        mainTL.play();
      }
    }

    setTimeout(function () {
      document.body.classList.remove("init");
      document.body.classList.add("ready");
      animate();
    }, 250);
    return {
      mainTL: mainTL,
      config: config2
    };
  } // Source/scripts/banner/createConfig.js


  var config;

  function createConfig(values) {
    function match(selector) {
      if (selector[0] === "*") return matchAnywhere(selector.substring(1));
      var allFound = true;
      var strs = selector.split(",");

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
      console.log("matchAnywhere", str);
      return Object.values(values).some(function (value) {
        if (typeof value !== "string") return false;
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

    config = _objectSpread({
      match: match,
      matchAnywhere: matchAnywhere,
      selectValue: selectValue
    }, values);
    return config;
  } // Source/scripts/lib/gsap-3-8-0/DrawSVGPlugin.js


  var gsap2;

  var _toArray;

  var _doc;

  var _win;

  var _isEdge;

  var _coreInitted;

  var _windowExists = function _windowExists2() {
    return typeof window !== "undefined";
  };

  var _getGSAP = function _getGSAP2() {
    return gsap2 || _windowExists() && (gsap2 = window.gsap) && gsap2.registerPlugin && gsap2;
  };

  var _numExp = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi;
  var _types = {
    rect: ["width", "height"],
    circle: ["r", "r"],
    ellipse: ["rx", "ry"],
    line: ["x2", "y2"]
  };

  var _round = function _round2(value) {
    return Math.round(value * 1e4) / 1e4;
  };

  var _parseNum = function _parseNum2(value) {
    return parseFloat(value) || 0;
  };

  var _parseSingleVal = function _parseSingleVal2(value, length) {
    var num = _parseNum(value);

    return ~value.indexOf("%") ? num / 100 * length : num;
  };

  var _getAttributeAsNumber = function _getAttributeAsNumber2(target, attr) {
    return _parseNum(target.getAttribute(attr));
  };

  var _sqrt = Math.sqrt;

  var _getDistance = function _getDistance2(x1, y1, x2, y2, scaleX, scaleY) {
    return _sqrt(Math.pow((_parseNum(x2) - _parseNum(x1)) * scaleX, 2) + Math.pow((_parseNum(y2) - _parseNum(y1)) * scaleY, 2));
  };

  var _warn = function _warn2(message) {
    return console.warn(message);
  };

  var _hasNonScalingStroke = function _hasNonScalingStroke2(target) {
    return target.getAttribute("vector-effect") === "non-scaling-stroke";
  };

  var _bonusValidated = 1;

  var _parse = function _parse2(value, length, defaultStart) {
    var i = value.indexOf(" "),
        s,
        e;

    if (i < 0) {
      s = defaultStart !== void 0 ? defaultStart + "" : value;
      e = value;
    } else {
      s = value.substr(0, i);
      e = value.substr(i + 1);
    }

    s = _parseSingleVal(s, length);
    e = _parseSingleVal(e, length);
    return s > e ? [e, s] : [s, e];
  };

  var _getLength = function _getLength2(target) {
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
      scaleY = target.getScreenCTM();
      scaleX = _sqrt(scaleY.a * scaleY.a + scaleY.b * scaleY.b);
      scaleY = _sqrt(scaleY.d * scaleY.d + scaleY.c * scaleY.c);
    }

    try {
      bbox = target.getBBox();
    } catch (e) {
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
      width = _getAttributeAsNumber(target, _types[type][0]);
      height = _getAttributeAsNumber(target, _types[type][1]);

      if (type !== "rect" && type !== "line") {
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
  };

  var _getPosition = function _getPosition2(target, length) {
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
  };

  var _initCore = function _initCore2() {
    if (_windowExists()) {
      _doc = document;
      _win = window;
      _coreInitted = gsap2 = _getGSAP();
      _toArray = gsap2.utils.toArray;
      _isEdge = ((_win.navigator || {}).userAgent || "").indexOf("Edge") !== -1;
    }
  };

  var DrawSVGPlugin = {
    version: "3.8.0",
    name: "drawSVG",
    register: function register(core) {
      gsap2 = core;

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
      this._dash = _round(start[1] - start[0]);
      this._offset = _round(-start[0]);
      this._dashPT = this.add(this, "_dash", this._dash, _round(end[1] - end[0]));
      this._offsetPT = this.add(this, "_offset", this._offset, _round(-end[0]));

      if (_isEdge) {
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

        dash = data._dash || ratio && ratio !== 1 && 1e-4 || 0;
        length = data._length - dash + 0.1;
        offset = data._offset;
        dash && offset && dash + Math.abs(offset % data._length) > data._length - 0.2 && (offset += offset < 0 ? 0.1 : -0.1) && (length += 0.1);
        style.strokeDashoffset = dash ? offset : offset + 1e-3;
        style.strokeDasharray = length < 0.2 ? "none" : dash ? dash + "px," + (data._nowrap ? 999999 : length) + "px" : "0px, 999999px";
      }
    },
    getLength: _getLength,
    getPosition: _getPosition
  };
  _getGSAP() && gsap2.registerPlugin(DrawSVGPlugin); // Source/scripts/bannerBootstrap.js

  function bootstrap(versionMapper) {
    window.CONFIG = createConfig(window.CONFIG);
    CSSPlugin["defaultSkewType"] = "simple";
    gsap.config({
      nullTargetWarn: false
    });

    if (navigator.userAgent.toLowerCase().indexOf("safari") > -1 && navigator.vendor.toLowerCase().indexOf("apple") > -1) {
      document.getElementsByTagName("html")[0].className += " browser-safari";
    }

    function start() {
      console.log("start");
      setTimeout(function () {
        var banner = createBanner(window.CONFIG, versionMapper);
        window.banner = banner;
      }, 250);
    }

    var isWindowReady = false;

    function checkAll() {
      if (isWindowReady) {
        setTimeout(function () {
          start();
        }, 250);
      }
    }

    if (document.readyState == "complete") {
      isWindowReady = true;
      checkAll();
    } else {
      window.addEventListener("load", function () {
        isWindowReady = true;
        checkAll();
      });
    }
  } // Source/scripts/utils/grabber.js


  function grabAll(selector) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return Array.from(root.querySelectorAll(selector));
  }

  function grab(selector) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return root.querySelector(selector);
  } // Source/scripts/banner/effects/graphics.js


  function enterDots(selector) {
    var vars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return gsap.from(selector + " circle", _objectSpread({
      duration: 1e-3,
      ease: "none",
      stagger: -0.03,
      scale: 0
    }, vars));
  }

  function curvedArrowTL(selector) {
    var tl = gsap.timeline();
    tl.from([selector + " [data-name=line]", selector + " #line"], {
      duration: 0.4,
      drawSVG: "100% 100%",
      ease: "power4.easeOut"
    }, 0);
    tl.from([selector + " [data-name=head]", selector + " #head"], {
      duration: 0.4,
      scale: 0,
      ease: "back.out",
      transformOrigin: "0% 50%"
    }, 0.3);
    tl.timeScale(0.7);
    return tl;
  } // Source/scripts/banner/effects/createProductBoxSpinnerTL.js


  function createProductBoxSpinnerTL(rootEl) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.5;

    var _ref2 = arguments.length > 2 ? arguments[2] : undefined,
        _ref2$startX = _ref2.startX,
        startX = _ref2$startX === void 0 ? 400 : _ref2$startX,
        _ref2$startRY = _ref2.startRY,
        startRY = _ref2$startRY === void 0 ? 45 : _ref2$startRY;

    function grab2(selector, rootEl2) {
      return rootEl2.querySelector(selector);
    }

    console.log("startX", startX);
    var tl = gsap.timeline();
    tl.from(grab2("#product-box", rootEl), {
      duration: duration,
      rotationY: startRY,
      x: startX,
      ease: Power2.easeOut
    }, 0);
    tl.from(grab2("#product-box", rootEl), {
      duration: duration,
      z: -90,
      ease: Power4.easeOut
    }, 0);
    tl.from(grab2(".shad", rootEl), {
      duration: duration,
      x: startX * 1.08,
      y: 7,
      scaleX: 0.8,
      skewX: 50,
      // scaleY: 2,
      transformOrigin: "50% 80%",
      ease: Power2.easeOut
    }, 0);
    var data = {
      brightnessSide: 1,
      brightnessFront: 1
    };
    tl.from(data, {
      duration: duration,
      brightnessSide: 0.25,
      brightnessFront: 0.25,
      ease: Power2.easeOut,
      onUpdate: function onUpdate() {
        gsap.set(grab2(".side", rootEl), {
          filter: "brightness(" + data.brightnessSide + ")"
        });
        gsap.set(grab2(".front", rootEl), {
          filter: "brightness(" + data.brightnessFront + ")"
        });
      }
    }, 0);
    return tl;
  } // Source/scripts/banner/effects/fastFade.js


  function fastFadeIn(selector) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.35;
    return gsap.fromTo(selector, {
      autoAlpha: 0
    }, {
      duration: duration,
      autoAlpha: 1
    });
  }

  function fastFadeOut(selector) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.35;
    return gsap.to(selector, {
      duration: duration,
      autoAlpha: 0
    });
  } // Source/scripts/banner/effects/frames.js


  function slideFrameToFrame(inFrameSelector, outFrameSelector) {
    var inVars = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var outVars = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var tl = gsap.timeline();
    tl.from(inFrameSelector, _objectSpread({
      duration: 1.2,
      y: 125,
      ease: "power4.inOut"
    }, inVars), 0);
    tl.to(outFrameSelector, _objectSpread({
      duration: 1.2,
      y: -125,
      ease: "power4.inOut"
    }, outVars), 0);
    return tl;
  } // Source/scripts/banner/effects/supers.js


  function createSuperTL(selector) {
    var tl = gsap.timeline();
    var curLineTop = 0;
    var curLine = null;
    var lineNum = 0;
    var lines = [];
    grabAll(selector + "  path").forEach(function (el) {
      var bounds = el.getBBox();
      var top = bounds.y;

      if (!curLine || top - curLineTop > 30) {
        curLine = [];
        lines.push(curLine);
        curLineTop = top;
        lineNum++;
      }

      curLine.push(el);
    });

    for (var i = 0; i < lines.length; i++) {
      var letters = lines[i];
      var pos = i === 0 ? 0 : "-=0.25";
      tl.fromTo(letters, {
        display: "none",
        y: 20
      }, {
        duration: 0.4,
        display: "block",
        y: 0,
        ease: "back.out",
        stagger: 0.03
      }, pos);
    }

    return tl;
  }

  function superPopupTL(selector) {
    var vars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return gsap.from(selector, _objectSpread({
      duration: 0.6,
      y: 20,
      autoAlpha: 0,
      ease: "back.out"
    }, vars));
  } // Source/scripts/banner/frameTypes/createEndframeTL.js


  function createEndframeTL(frameNum, prevFrameNum) {
    var _prevFrameNum;

    var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref3$superType = _ref3.superType,
        superType = _ref3$superType === void 0 ? "popup" : _ref3$superType,
        _ref3$boxX = _ref3.boxX,
        boxX = _ref3$boxX === void 0 ? -78 : _ref3$boxX;

    var tl = gsap.timeline();
    (_prevFrameNum = prevFrameNum) !== null && _prevFrameNum !== void 0 ? _prevFrameNum : prevFrameNum = frameNum - 1;
    tl.add(fastFadeIn("#frame".concat(frameNum), 1e-3), 0);
    tl.add(slideFrameToFrame(null, "#frame" + prevFrameNum), 0);
    tl.to("#product-box-spinner-wrapper", {
      duration: 1.5,
      x: boxX,
      ease: "power2.inOut"
    }, 0.1);
    tl.from("#wipes", {
      duration: 1.25,
      x: 75,
      y: 50,
      ease: "power4.out"
    }, 0.6);
    var enterPos = 0.7;

    if (superType === "popup") {
      tl.add(superPopupTL("#frame".concat(frameNum, "-elements #super")), enterPos);
    } else {
      tl.add(createSuperTL("#frame".concat(frameNum, "-elements #super")), enterPos);
    }

    var wgybPos = enterPos + 0.7;
    tl.add(createSuperTL("#frame".concat(frameNum, " #wgyb")), wgybPos);
    tl.add(curvedArrowTL("#frame".concat(frameNum, "-elements #arrow-wgyb")), wgybPos);
    tl.add(curvedArrowTL("#frame".concat(frameNum, "-elements #arrow-box")), wgybPos + 0.1);
    tl.add(fastFadeIn("#cta-mover", 0.4), wgybPos + 0.6);
    return tl;
  } // Source/scripts/ink-lib/EaseUtil.js


  var prevEase;

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

    prevEase = ease;
    return ease;
  }

  var _number2Ease = [gsap["parseEase"]("Power0"), gsap["parseEase"]("Power1"), gsap["parseEase"]("Power2"), gsap["parseEase"]("Power3"), gsap["parseEase"]("Power4")];

  function inOut(powIn, powOut) {
    return combine(power(powIn).easeIn, power(powOut).easeOut);
  }

  function power(pw) {
    if (pw % 1 === 0) {
      if (pw <= 4) {
        return _number2Ease[pw];
      }

      return {
        easeIn: function easeIn(p) {
          var ratio = p;

          for (var i = 1, orig = ratio; i < pw; i++) {
            ratio *= orig;
          }

          return ratio;
        },
        easeOut: function easeOut(p) {
          var ratio = 1 - p;

          for (var i = 1, orig = ratio; i < pw; i++) {
            ratio *= orig;
          }

          return 1 - ratio;
        },
        easeInOut: function easeInOut(p) {
          var ratio = p < 0.5 ? p * 2 : (1 - p) * 2;

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

  var in2out1 = inOut(2, 1);
  var in1out2 = inOut(1, 2);

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
  }

  function cubicBezierGetYatX(xTarget, x1, y1, x2, y2) {
    var xTolerance = 1e-4;

    var myBezier = function myBezier(t) {
      return cubicBezierGetPointAtT(0, 0, x1, y1, x2, y2, 1, 1, t);
    };

    var lower = 0;
    var upper = 1;
    var percent = (upper + lower) / 2;
    var x = myBezier(percent)[0];

    while (Math.abs(xTarget - x) > xTolerance) {
      if (xTarget > x) lower = percent;else upper = percent;
      percent = (upper + lower) / 2;
      x = myBezier(percent)[0];
    }

    return myBezier(percent)[1];
  }

  function lockedEase(x, y) {
    return function (r) {
      return cubicBezierGetYatX(r, x, y, x, y);
    };
  }

  var gsapSpecialProps = "callbackScope,data,delay,duration,ease,id,immediateRender,inherit,lazy,onComplete,onCompleteParams,onInterrupt,onInterruptParams,onRepeat,onRepeatParams,onReverseComplete,onReverseCompleteParams,onStart,onStartParams,onUpdate,onUpdateParams,overwrite,paused,repeat,repeatDelay,repeatRefresh,reversed,runBackwards,stagger,startAt,yoyo,yoyoEase,keyframes";
  var gsapSpecialPropsSet = new Set(gsapSpecialProps.split(",")); // Source/scripts/banner/createMainTL__LM__conversion__concept3.js

  function createMainTL() {
    var tl = gsap.timeline({
      onUpdate: function onUpdate() {
        gsap.set("svg.circle-dots-right", {
          rotation: gsap.ticker.time * -4
        });
        gsap.set("svg.circle-dots-left", {
          rotation: gsap.ticker.time * -4
        });
      }
    });
    var duration, ease, childTL, subChildTL;
    var introTL = childTL = gsap.timeline();
    introTL.add(fastFadeIn("#frame1", 1e-3), 0);
    introTL.from("#frame1", {
      duration: 1.5,
      x: 50,
      ease: lockedEase(0.3, 1)
    }, 0);
    introTL.add(createProductBoxSpinnerTL(grab("#product-box-spinner-wrapper"), 1.5, {
      startX: 450
    }), 0.25);
    tl.add(introTL, 0.2);
    var frame1TL = childTL = gsap.timeline();
    frame1TL.add(fastFadeIn("#frame1", 1e-3), 0);
    frame1TL.add(enterDots("#frame1-elements #diaper-dots-left"), 0.25);
    frame1TL.add(enterDots("#frame1-elements #diaper-dots-right"), 0.25);
    frame1TL.add(createSuperTL("#frame1-elements #super1", 0.35));
    tl.add(frame1TL, 1);
    var frame2TL = gsap.timeline();
    frame2TL.add(fastFadeOut("#frame1-elements svg #super1"), 0.25);
    frame2TL.add(createSuperTL("#frame1-elements svg #super2"), 0.25);
    tl.add(frame2TL, "+=1");
    var frame3TL = createEndframeTL(3, 1, {
      superType: "popup",
      boxX: -68
    });
    frame3TL.add(slideFrameToFrame(null, "#frame1", {
      y: 125
    }, {
      y: -125
    }), 0);
    frame3TL.add(fastFadeIn("#legal"), 1);
    tl.add(frame3TL, "+=1");
    tl.to({}, {
      duration: 14
    }, 0);
    tl.to("#super-cover", 0.75, {
      autoAlpha: 0
    }, 0.25);
    tl.delay(0.25);
    return tl;
  } // Source/scripts/banner__LM__conversion__concept3.js


  bootstrap({
    createMainTL: createMainTL
  });
})();
/*!
 * DrawSVGPlugin 3.8.0
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/