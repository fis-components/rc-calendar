'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUtil = require('rc-util');

var _rcUtil2 = _interopRequireDefault(_rcUtil);

var _TimePanel = require('./TimePanel');

var _TimePanel2 = _interopRequireDefault(_TimePanel);

var setHourOfDay = 'setHourOfDay';
var setMinutes = 'setMinutes';
var setSeconds = 'setSeconds';

function padding(number) {
  var ret = number;
  if (ret < 10) {
    ret = '0' + ret;
  }
  return ret;
}

function loop(value, min, max) {
  var ret = value;
  if (ret === min - 1) {
    ret = max;
  } else if (ret === max + 1) {
    ret = min;
  }
  return ret;
}

function keyDownWrap(method, min, max) {
  return function onKeyDown(event) {
    if (this.props.disabled) {
      return;
    }
    var value = event.target.value;
    var number = parseInt(value, 10);
    var keyCode = event.keyCode;
    var handled = undefined;
    if (keyCode === _rcUtil.KeyCode.DOWN) {
      number++;
      event.stopPropagation();
      event.preventDefault();
      handled = 1;
    } else if (keyCode === _rcUtil.KeyCode.UP) {
      number--;
      event.stopPropagation();
      event.preventDefault();
      handled = 1;
    }
    if (handled) {
      number = loop(number, min, max);
      var time = this.props.value.clone();
      time[method](number);
      this.props.onChange(time, event);
    }
  };
}

var Time = (function (_React$Component) {
  _inherits(Time, _React$Component);

  function Time(props) {
    var _this = this;

    _classCallCheck(this, Time);

    _get(Object.getPrototypeOf(Time.prototype), 'constructor', this).call(this, props);
    this.state = {
      showHourPanel: 0,
      showMinutePanel: 0,
      showSecondPanel: 0
    };
    var events = ['onHourKeyDown', 'onMinuteKeyDown', 'onSecondKeyDown', 'onHourClick', 'onMinuteClick', 'onSecondClick', 'onSelectPanel'];
    events.forEach(function (method) {
      _this[method] = _this[method].bind(_this);
    });
  }

  _createClass(Time, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return _rcUtil2['default'].PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
    }
  }, {
    key: 'onSelectPanel',
    value: function onSelectPanel(value, setter) {
      var _this2 = this;

      this.setState({
        showHourPanel: 0,
        showMinutePanel: 0,
        showSecondPanel: 0
      }, function () {
        // ie9 has broken focus
        _this2.refs[setter].focus();
      });
      this.props.onChange(value);
    }
  }, {
    key: 'onHourClick',
    value: function onHourClick() {
      if (this.props.disabled) {
        return;
      }
      this.setState({
        showHourPanel: 1,
        showMinutePanel: 0,
        showSecondPanel: 0
      });
    }
  }, {
    key: 'onMinuteClick',
    value: function onMinuteClick() {
      if (this.props.disabled) {
        return;
      }
      this.setState({
        showHourPanel: 0,
        showMinutePanel: 1,
        showSecondPanel: 0
      });
    }
  }, {
    key: 'onSecondClick',
    value: function onSecondClick() {
      if (this.props.disabled) {
        return;
      }
      this.setState({
        showHourPanel: 0,
        showMinutePanel: 0,
        showSecondPanel: 1
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var state = this.state;
      var props = this.props;
      var disabled = props.disabled;
      var prefixCls = props.prefixCls;
      var value = props.value;
      var locale = props.locale;
      var hour = value.getHourOfDay();
      var minute = value.getMinutes();
      var second = value.getSeconds();
      var panel = undefined;
      var commonProps = {
        value: value,
        onSelect: this.onSelectPanel,
        rootPrefixCls: prefixCls
      };
      if (state.showHourPanel) {
        panel = _react2['default'].createElement(_TimePanel2['default'], _extends({ rowCount: 6, colCount: 4, getter: 'getHourOfDay', setter: setHourOfDay,
          title: locale.hourPanelTitle
        }, commonProps));
      } else if (state.showMinutePanel) {
        panel = _react2['default'].createElement(_TimePanel2['default'], _extends({ rowCount: 6, colCount: 10, getter: 'getMinutes', setter: setMinutes,
          title: locale.minutePanelTitle
        }, commonProps));
      } else if (state.showSecondPanel) {
        panel = _react2['default'].createElement(_TimePanel2['default'], _extends({ rowCount: 6, colCount: 10, getter: 'getSeconds', setter: setSeconds,
          title: locale.secondPanelTitle
        }, commonProps));
      }
      return _react2['default'].createElement(
        'span',
        { className: prefixCls + '-time' },
        _react2['default'].createElement('input', { className: prefixCls + '-time-input',
          title: locale.hourInput,
          ref: setHourOfDay,
          readOnly: true,
          disabled: disabled,
          value: padding(hour),
          onClick: this.onHourClick,
          onKeyDown: this.onHourKeyDown }),
        _react2['default'].createElement(
          'span',
          { className: prefixCls + '-time-minute' },
          _react2['default'].createElement(
            'span',
            null,
            ' : '
          ),
          _react2['default'].createElement('input', { className: prefixCls + '-time-input',
            title: locale.minuteInput,
            ref: setMinutes,
            readOnly: true,
            disabled: disabled,
            value: padding(minute),
            onClick: this.onMinuteClick,
            onKeyDown: this.onMinuteKeyDown })
        ),
        _react2['default'].createElement(
          'span',
          { className: prefixCls + '-time-second' },
          _react2['default'].createElement(
            'span',
            null,
            ' : '
          ),
          _react2['default'].createElement('input', { className: prefixCls + '-time-input',
            title: locale.secondInput,
            ref: setSeconds,
            readOnly: true,
            disabled: disabled,
            value: padding(second),
            onClick: this.onSecondClick,
            onKeyDown: this.onSecondKeyDown })
        ),
        panel
      );
    }
  }]);

  return Time;
})(_react2['default'].Component);

exports['default'] = Time;

Time.prototype.onHourKeyDown = keyDownWrap('setHourOfDay', 0, 23);
Time.prototype.onMinuteKeyDown = keyDownWrap('setMinutes', 0, 59);
Time.prototype.onSecondKeyDown = keyDownWrap('setSeconds', 0, 59);

Time.propTypes = {
  onChange: _react.PropTypes.func,
  disabled: _react.PropTypes.bool
};

Time.defaultProps = {
  onChange: function onChange() {}
};
module.exports = exports['default'];