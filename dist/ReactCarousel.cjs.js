'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactSpring = require('react-spring');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function useResizeHandler(ref) {
  var _useState = React.useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      height = _useState2[0],
      setHeight = _useState2[1];

  var _useState3 = React.useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      width = _useState4[0],
      setWidth = _useState4[1];

  var resizeHandler = function resizeHandler(els) {
    setHeight(els[0].contentRect.height);
    setWidth(els[0].contentRect.width);
  };

  var observer = React.useRef(new ResizeObserver(resizeHandler));
  React.useEffect(function () {
    observer.current.observe(ref.current);
    return function () {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      observer.current.disconnect();
    };
  }, [ref]);
  return [width, height];
}

var BEFORE = "BEFORE";
var CENTER = "CENTER";
var AFTER = "AFTER";

function isBeforeSelected(index, selectedIndex) {
  return index < selectedIndex;
}
function isAfterSelected(index, selectedIndex) {
  return index > selectedIndex;
}
function getPositionName(index, selectedIndex) {
  if (isBeforeSelected(index, selectedIndex)) {
    return BEFORE;
  } else if (isAfterSelected(index, selectedIndex)) {
    return AFTER;
  }

  return CENTER;
}

var defaultAnimationConfig = {
  transform: {
    rotateY: true,
    translateX: true,
    translateY: true
  },
  zIndex: true,
  left: true,
  top: true,
  filter: {
    brightness: true
  }
};
function getSpringConfig(configProp) {
  if (configProp === undefined) {
    return {
      mass: 2,
      tension: 170,
      friction: 26,
      clamp: false,
      precision: 0.001
    };
  }

  if (typeof configProp === "string") {
    return reactSpring.config[configProp];
  }

  return configProp;
}

function isObject(obj) {
  return _typeof(obj) === "object";
}
function hasKeys(obj) {
  for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  return Object.keys(obj).every(function (key) {
    return keys.includes(key);
  });
}

var _rotateY, _translateX, _translateY, _zIndex, _left, _top, _brightness;
var rotateY = (_rotateY = {}, _defineProperty(_rotateY, AFTER, function () {
  return "rotateY(-55deg)";
}), _defineProperty(_rotateY, CENTER, function () {
  return "rotateY(0deg)";
}), _defineProperty(_rotateY, BEFORE, function () {
  return "rotateY(55deg)";
}), _rotateY);
var translateX = (_translateX = {}, _defineProperty(_translateX, AFTER, function () {
  return "translateX(0%)";
}), _defineProperty(_translateX, CENTER, function () {
  return "translateX(-50%)";
}), _defineProperty(_translateX, BEFORE, function () {
  return "translateX(0%)";
}), _translateX);
var translateY = (_translateY = {}, _defineProperty(_translateY, AFTER, function () {
  return "translateY(-50%)";
}), _defineProperty(_translateY, CENTER, function () {
  return "translateY(-50%)";
}), _defineProperty(_translateY, BEFORE, function () {
  return "translateY(-50%)";
}), _translateY);
var zIndex = (_zIndex = {}, _defineProperty(_zIndex, AFTER, function () {
  return 1;
}), _defineProperty(_zIndex, CENTER, function () {
  return 0;
}), _defineProperty(_zIndex, BEFORE, function () {
  return 1;
}), _zIndex);
var left = (_left = {}, _defineProperty(_left, AFTER, function (containerWidth, diff) {
  return "".concat(containerWidth * -diff * 9 / 10, "px");
}), _defineProperty(_left, CENTER, function (containerWidth) {
  return "".concat(containerWidth / 2, "px");
}), _defineProperty(_left, BEFORE, function (containerWidth, diff, imageWidth) {
  return "".concat(imageWidth * (-diff * 2 + 1) + containerWidth / 10, "px");
}), _left);
var top = (_top = {}, _defineProperty(_top, AFTER, function () {
  return "50%";
}), _defineProperty(_top, CENTER, function () {
  return "50%";
}), _defineProperty(_top, BEFORE, function () {
  return "50%";
}), _top);
var brightness = (_brightness = {}, _defineProperty(_brightness, AFTER, function () {
  return "brightness(0.32)";
}), _defineProperty(_brightness, CENTER, function () {
  return "brightness(1)";
}), _defineProperty(_brightness, BEFORE, function () {
  return "brightness(0.32)";
}), _brightness);
var transform = {
  rotateY: rotateY,
  translateX: translateX,
  translateY: translateY
};
var filter = {
  brightness: brightness
};
var defaultAnimationProperties = {
  transform: transform,
  zIndex: zIndex,
  left: left,
  top: top,
  filter: filter
};

var CarouselAnimation = /*#__PURE__*/function () {
  function CarouselAnimation(customAnimationConfig) {
    _classCallCheck(this, CarouselAnimation);

    var animationConfig = CarouselAnimation.combineObjects(defaultAnimationConfig, customAnimationConfig);
    this._properties = CarouselAnimation.convertConfigToProperties(animationConfig, defaultAnimationProperties);
  }

  _createClass(CarouselAnimation, [{
    key: "getValues",
    value: function getValues(positionName, containerWidth, diff, imageWidth) {
      return _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, this._properties.transform && {
        transform: this.transform[positionName](containerWidth, diff, imageWidth)
      }), this._properties.zIndex && {
        zIndex: this.zIndex[positionName](containerWidth, diff, imageWidth)
      }), this._properties.left && {
        left: this.left[positionName](containerWidth, diff, imageWidth)
      }), this._properties.top && {
        top: this.top[positionName](containerWidth, diff, imageWidth)
      }), this._properties.filter && {
        filter: this.filter[positionName](containerWidth, diff, imageWidth)
      });
    }
  }, {
    key: "nestedPropertyWrapper",
    value: function nestedPropertyWrapper(property, position) {
      return function (containerWidth, diff, imageWidth) {
        return Object.keys(property).map(function (key) {
          return property[key][position];
        }).map(function (valueFunc) {
          return valueFunc(containerWidth, diff, imageWidth);
        }).join(" ");
      };
    }
  }, {
    key: "transform",
    get: function get() {
      var _ref;

      return _ref = {}, _defineProperty(_ref, AFTER, this.nestedPropertyWrapper(this._properties.transform, AFTER)), _defineProperty(_ref, CENTER, this.nestedPropertyWrapper(this._properties.transform, CENTER)), _defineProperty(_ref, BEFORE, this.nestedPropertyWrapper(this._properties.transform, BEFORE)), _ref;
    }
  }, {
    key: "zIndex",
    get: function get() {
      return this._properties.zIndex;
    }
  }, {
    key: "left",
    get: function get() {
      return this._properties.left;
    }
  }, {
    key: "top",
    get: function get() {
      return this._properties.top;
    }
  }, {
    key: "filter",
    get: function get() {
      var _ref2;

      return _ref2 = {}, _defineProperty(_ref2, AFTER, this.nestedPropertyWrapper(this._properties.filter, AFTER)), _defineProperty(_ref2, CENTER, this.nestedPropertyWrapper(this._properties.filter, CENTER)), _defineProperty(_ref2, BEFORE, this.nestedPropertyWrapper(this._properties.filter, BEFORE)), _ref2;
    }
  }], [{
    key: "combineObjects",
    value: function combineObjects(defaultObj, customObj) {
      if (!customObj) {
        return defaultObj;
      }

      return Object.keys(defaultObj).filter(function (key) {
        return customObj[key] !== false;
      }).map(function (key) {
        if (isObject(defaultObj[key])) {
          return _defineProperty({}, key, _objectSpread2(_objectSpread2({}, defaultObj[key]), customObj[key]));
        }

        return customObj[key] !== undefined ? _defineProperty({}, key, customObj[key]) : _defineProperty({}, key, defaultObj[key]);
      }).reduce(function (acc, obj) {
        return _objectSpread2(_objectSpread2({}, acc), obj);
      });
    }
  }, {
    key: "convertConfigToProperties",
    value: function convertConfigToProperties(properties, values) {
      return Object.keys(properties).filter(function (key) {
        return properties[key];
      }).map(function (key) {
        if (isObject(properties[key])) {
          if (hasKeys(properties[key], AFTER, BEFORE, CENTER)) {
            return _defineProperty({}, key, properties[key]);
          }

          var subValue = CarouselAnimation.convertConfigToProperties(properties[key], values[key]);
          return _defineProperty({}, key, subValue);
        }

        return _defineProperty({}, key, values[key]);
      }).reduce(function (acc, obj) {
        return _objectSpread2(_objectSpread2({}, acc), obj);
      });
    }
  }]);

  return CarouselAnimation;
}();

var CarouselItem = function CarouselItem(_ref) {
  var children = _ref.children,
      index = _ref.index,
      selectedItemIndex = _ref.selectedItemIndex,
      containerWidth = _ref.containerWidth,
      springConfig = _ref.springConfig,
      itemBackgroundStyle = _ref.itemBackgroundStyle,
      carouselConfig = _ref.carouselConfig;
  var imageRef = React.useRef(null);

  var _useState = React.useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      position = _useState2[0],
      setPosition = _useState2[1];

  var _useResizeHandler = useResizeHandler(imageRef),
      _useResizeHandler2 = _slicedToArray(_useResizeHandler, 1),
      imageWidth = _useResizeHandler2[0];

  var carouselAnimation = React.useRef(new CarouselAnimation(carouselConfig));
  var getSpringPosition = React.useCallback(function () {
    var positionName = getPositionName(index, selectedItemIndex);
    var indexDiff = selectedItemIndex - index;
    return carouselAnimation.current.getValues(positionName, containerWidth, indexDiff, imageWidth);
  }, [containerWidth, imageWidth, index, selectedItemIndex]);
  React.useLayoutEffect(function () {
    setPosition(getSpringPosition(index, selectedItemIndex, imageWidth, containerWidth));
  }, [containerWidth, selectedItemIndex, index, imageWidth, getSpringPosition]);
  var animationProps = reactSpring.useSpring(_objectSpread2(_objectSpread2({}, position), {}, {
    config: getSpringConfig(springConfig)
  }));
  var Element = React.Children.only(children);
  var ElementType = Element.type;
  return /*#__PURE__*/React__default['default'].createElement(reactSpring.animated.div, {
    className: "carousel__container--item",
    style: _objectSpread2(_objectSpread2({}, animationProps), itemBackgroundStyle),
    ref: imageRef,
    "data-testid": "container"
  }, /*#__PURE__*/React__default['default'].createElement(ElementType, _extends({}, Element.props, {
    style: _objectSpread2({}, Element.props.style)
  })));
};

var NEXT = "NEXT";
var PREV = "PREV";
var LENGTH_CHANGE = "LENGTH_CHANGE";
function reducer(state, action) {
  switch (action.type) {
    case NEXT:
      return _objectSpread2(_objectSpread2({}, state), state.index === state.length - 1 ? {
        index: 0
      } : {
        index: state.index + 1
      });

    case PREV:
      return _objectSpread2(_objectSpread2({}, state), state.index === 0 ? {
        index: state.length - 1
      } : {
        index: state.index - 1
      });

    case LENGTH_CHANGE:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        length: action.payload
      });

    default:
      return _objectSpread2({}, state);
  }
}

function useCycleIndex(length) {
  var _useReducer = React.useReducer(reducer, {
    length: length,
    index: 0
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  React.useEffect(function () {
    dispatch({
      type: LENGTH_CHANGE,
      payload: length
    });
  }, [length]);

  var next = function next() {
    dispatch({
      type: NEXT
    });
  };

  var prev = function prev() {
    dispatch({
      type: PREV
    });
  };

  return {
    index: state.index,
    next: next,
    prev: prev
  };
}

var ReactCarousel = function ReactCarousel(_ref) {
  var carouselConfig = _ref.carouselConfig,
      children = _ref.children,
      springConfig = _ref.springConfig,
      containerStyle = _ref.containerStyle,
      containerBackgroundStyle = _ref.containerBackgroundStyle,
      itemBackgroundStyle = _ref.itemBackgroundStyle,
      carouselHeight = _ref.carouselHeight,
      prevButtonText = _ref.prevButtonText,
      nextButtonText = _ref.nextButtonText,
      showIndices = _ref.showIndices;
  var containerRef = React.useRef(null);

  var _useResizeHandler = useResizeHandler(containerRef),
      _useResizeHandler2 = _slicedToArray(_useResizeHandler, 1),
      containerWidth = _useResizeHandler2[0];

  var _useCycleIndex = useCycleIndex(children.length),
      selectedIndex = _useCycleIndex.index,
      next = _useCycleIndex.next,
      prev = _useCycleIndex.prev;

  var handleNext = function handleNext() {
    next();
  };

  var handlePrev = function handlePrev() {
    prev();
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "carousel",
    style: _objectSpread2({}, containerStyle)
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "background",
    style: _objectSpread2({}, containerBackgroundStyle)
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "carousel__prev",
    onClick: handlePrev,
    "data-testid": "prev"
  }, prevButtonText), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "carousel__container",
    ref: containerRef,
    style: {
      height: carouselHeight
    }
  }, containerWidth ? children.map(function (element, index) {
    return /*#__PURE__*/React__default['default'].createElement(CarouselItem, {
      key: index,
      index: index,
      selectedItemIndex: selectedIndex,
      containerWidth: containerWidth,
      springConfig: springConfig,
      itemBackgroundStyle: itemBackgroundStyle,
      carouselConfig: carouselConfig
    }, element);
  }) : null), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "carousel__next",
    onClick: handleNext,
    "data-testid": "next"
  }, nextButtonText), showIndices && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "carousel__container--index"
  }, children.map(function (_, index) {
    return /*#__PURE__*/React__default['default'].createElement("span", {
      key: "".concat(index, "dot"),
      className: "".concat(index === selectedIndex && "selected")
    });
  })));
};

exports.AFTER = AFTER;
exports.BEFORE = BEFORE;
exports.CENTER = CENTER;
exports.default = ReactCarousel;
