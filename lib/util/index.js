'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getTodayTime = getTodayTime;
exports.getTitleString = getTitleString;
exports.compareByDay = compareByDay;
exports.getFormatter = getFormatter;
exports.getTodayElement = getTodayElement;
exports.getOkElement = getOkElement;
exports.syncTime = syncTime;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gregorianCalendarFormat = require('gregorian-calendar-format');

var _gregorianCalendarFormat2 = _interopRequireDefault(_gregorianCalendarFormat);

function getTodayTime(value) {
  var today = value.clone();
  today.setTime(Date.now());
  return today;
}

function getTitleString(value) {
  return value.getYear() + '-' + (value.getMonth() + 1) + '-' + value.getDayOfMonth();
}

function getTodayTimeStr(value) {
  var today = getTodayTime(value);
  return getTitleString(today);
}

function compareByDay(v1, v2) {
  if (v1.getYear() > v2.getYear()) {
    return 1;
  }
  if (v1.getYear() < v2.getYear()) {
    return -1;
  }
  if (v1.getMonth() > v2.getMonth()) {
    return 1;
  }
  if (v1.getMonth() < v2.getMonth()) {
    return -1;
  }

  if (v1.getDayOfMonth() > v2.getDayOfMonth()) {
    return 1;
  }
  if (v1.getDayOfMonth() < v2.getDayOfMonth()) {
    return -1;
  }

  return 0;
}

function getFormatter(format, locale) {
  if (typeof format === 'string') {
    return new _gregorianCalendarFormat2['default'](format, locale.format);
  }
  return format;
}

function getTodayElement(componentProps) {
  var prefixCls = componentProps.prefixCls;
  var locale = componentProps.locale;
  var value = componentProps.value;

  var disabledToday = false;
  var localeNow = locale.today;
  if (componentProps.showTime) {
    localeNow = locale.now || locale.today;
  }
  var disabledTodayClass = '';
  if (componentProps.disabledDate) {
    disabledToday = componentProps.disabledDate(getTodayTime(value), value);
    if (disabledToday) {
      disabledTodayClass = prefixCls + '-today-btn-disabled';
    }
  }
  return _react2['default'].createElement(
    'a',
    { className: prefixCls + '-today-btn ' + disabledTodayClass,
      role: 'button',
      onClick: disabledToday ? null : componentProps.onToday,
      title: getTodayTimeStr(componentProps.value) },
    localeNow
  );
}

function getOkElement(componentProps) {
  var prefixCls = componentProps.prefixCls;
  var locale = componentProps.locale;

  var className = prefixCls + '-ok-btn';
  if (componentProps.okDisabled) {
    className += ' ' + prefixCls + '-ok-btn-disabled';
  }
  return _react2['default'].createElement(
    'a',
    { className: className,
      role: 'button',
      onClick: componentProps.okDisabled ? null : componentProps.onOk },
    locale.ok
  );
}

function syncTime(from, to) {
  to.setHourOfDay(from.getHourOfDay());
  to.setMinutes(from.getMinutes());
  to.setSeconds(from.getSeconds());
}