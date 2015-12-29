'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rcUtil = require('rc-util');

var _rcUtil2 = _interopRequireDefault(_rcUtil);

var _calendarTodayButton = require('../calendar/TodayButton');

var _calendarTodayButton2 = _interopRequireDefault(_calendarTodayButton);

var _calendarOkButton = require('../calendar/OkButton');

var _calendarOkButton2 = _interopRequireDefault(_calendarOkButton);

var _utilIndex = require('../util/index');

var toFragment = _rcUtil2['default'].Children.mapSelf;

var CalendarFooter = _react2['default'].createClass({
  displayName: 'CalendarFooter',

  propTypes: {
    onSelect: _react.PropTypes.func,
    value: _react.PropTypes.object,
    defaultValue: _react.PropTypes.object
  },

  onSelect: function onSelect(value) {
    this.props.onSelect(value);
  },

  getRootDOMNode: function getRootDOMNode() {
    return _reactDom2['default'].findDOMNode(this);
  },

  render: function render() {
    var props = this.props;
    var value = props.value;
    var prefixCls = props.prefixCls;
    var showDateInput = props.showDateInput;
    var disabledTime = props.disabledTime;
    var gregorianCalendarLocale = props.gregorianCalendarLocale;
    var selectedValue = props.selectedValue;

    var timePicker = !showDateInput && props.timePicker || null;
    var disabledTimeConfig = disabledTime && timePicker ? (0, _utilIndex.getTimeConfig)(selectedValue, disabledTime) : null;
    var footerEl = null;
    if (props.showToday || timePicker) {
      var nowEl = undefined;
      if (props.showToday) {
        nowEl = _react2['default'].createElement(_calendarTodayButton2['default'], _extends({}, props, { value: value }));
      }
      var okBtn = undefined;
      if (props.showOk) {
        okBtn = _react2['default'].createElement(_calendarOkButton2['default'], props);
      }
      var footerBtn = undefined;
      if (nowEl || okBtn) {
        footerBtn = _react2['default'].createElement(
          'span',
          { className: prefixCls + '-footer-btn' },
          toFragment([nowEl, okBtn])
        );
      }
      if (timePicker) {
        timePicker = _react2['default'].cloneElement(timePicker, _extends({
          onChange: this.onSelect,
          allowEmpty: false,
          gregorianCalendarLocale: gregorianCalendarLocale
        }, disabledTimeConfig, {
          getPopupContainer: this.getRootDOMNode,
          value: selectedValue
        }));
      }
      footerEl = _react2['default'].createElement(
        'div',
        { className: prefixCls + '-footer' },
        timePicker,
        footerBtn
      );
    }

    return footerEl;
  }
});

exports['default'] = CalendarFooter;
module.exports = exports['default'];