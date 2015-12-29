'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gregorianCalendar = require('gregorian-calendar');

var _gregorianCalendar2 = _interopRequireDefault(_gregorianCalendar);

var _rcUtil = require('rc-util');

var _dateDateTable = require('./date/DateTable');

var _dateDateTable2 = _interopRequireDefault(_dateDateTable);

var _calendarCalendarHeader = require('./calendar/CalendarHeader');

var _calendarCalendarHeader2 = _interopRequireDefault(_calendarCalendarHeader);

var _calendarCalendarFooter = require('./calendar/CalendarFooter');

var _calendarCalendarFooter2 = _interopRequireDefault(_calendarCalendarFooter);

var _mixinCalendarMixin = require('./mixin/CalendarMixin');

var _mixinCalendarMixin2 = _interopRequireDefault(_mixinCalendarMixin);

var _mixinCommonMixin = require('./mixin/CommonMixin');

var _mixinCommonMixin2 = _interopRequireDefault(_mixinCommonMixin);

var _dateDateInput = require('./date/DateInput');

var _dateDateInput2 = _interopRequireDefault(_dateDateInput);

function noop() {}

function goStartMonth() {
  var next = this.state.value.clone();
  next.setDayOfMonth(1);
  this.setValue(next);
}

function goEndMonth() {
  var next = this.state.value.clone();
  next.setDayOfMonth(next.getActualMaximum(_gregorianCalendar2['default'].MONTH));
  this.setValue(next);
}

function goMonth(direction) {
  var next = this.state.value.clone();
  next.addMonth(direction);
  this.setValue(next);
}

function goYear(direction) {
  var next = this.state.value.clone();
  next.addYear(direction);
  this.setValue(next);
}

function goWeek(direction) {
  var next = this.state.value.clone();
  next.addWeekOfYear(direction);
  this.setValue(next);
}

function goDay(direction) {
  var next = this.state.value.clone();
  next.addDayOfMonth(direction);
  this.setValue(next);
}

var Calendar = _react2['default'].createClass({
  displayName: 'Calendar',

  propTypes: {
    value: _react.PropTypes.object,
    selectedValue: _react.PropTypes.object,
    defaultValue: _react.PropTypes.object,
    className: _react.PropTypes.string,
    locale: _react.PropTypes.object,
    showWeekNumber: _react.PropTypes.bool,
    style: _react.PropTypes.object,
    showToday: _react.PropTypes.bool,
    showDateInput: _react.PropTypes.bool,
    visible: _react.PropTypes.bool,
    onSelect: _react.PropTypes.func,
    onOk: _react.PropTypes.func,
    prefixCls: _react.PropTypes.string,
    onKeyDown: _react.PropTypes.func,
    timePicker: _react.PropTypes.element,
    dateInputPlaceholder: _react.PropTypes.string,
    onClear: _react.PropTypes.func,
    onChange: _react.PropTypes.func
  },

  mixins: [_mixinCommonMixin2['default'], _mixinCalendarMixin2['default']],

  getDefaultProps: function getDefaultProps() {
    return {
      showToday: true,
      showDateInput: true,
      timePicker: null,
      onClear: noop,
      onOk: noop
    };
  },

  getInitialState: function getInitialState() {
    // bind methods
    this.nextMonth = goMonth.bind(this, 1);
    this.previousMonth = goMonth.bind(this, -1);
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
    return {};
  },

  onKeyDown: function onKeyDown(event) {
    if (event.target.nodeName.toLowerCase() === 'input') {
      return undefined;
    }
    var keyCode = event.keyCode;
    // mac
    var ctrlKey = event.ctrlKey || event.metaKey;
    switch (keyCode) {
      case _rcUtil.KeyCode.DOWN:
        goWeek.call(this, 1);
        event.preventDefault();
        return 1;
      case _rcUtil.KeyCode.UP:
        goWeek.call(this, -1);
        event.preventDefault();
        return 1;
      case _rcUtil.KeyCode.LEFT:
        if (ctrlKey) {
          this.previousYear();
        } else {
          goDay.call(this, -1);
        }
        event.preventDefault();
        return 1;
      case _rcUtil.KeyCode.RIGHT:
        if (ctrlKey) {
          this.nextYear();
        } else {
          goDay.call(this, 1);
        }
        event.preventDefault();
        return 1;
      case _rcUtil.KeyCode.HOME:
        goStartMonth.call(this);
        event.preventDefault();
        return 1;
      case _rcUtil.KeyCode.END:
        goEndMonth.call(this);
        event.preventDefault();
        return 1;
      case _rcUtil.KeyCode.PAGE_DOWN:
        this.nextMonth();
        event.preventDefault();
        return 1;
      case _rcUtil.KeyCode.PAGE_UP:
        this.previousMonth();
        event.preventDefault();
        return 1;
      case _rcUtil.KeyCode.ENTER:
        this.onSelect(this.state.value);
        event.preventDefault();
        return 1;
      default:
        this.props.onKeyDown(event);
        return 1;
    }
  },

  onClear: function onClear() {
    this.onSelect(null);
    this.props.onClear();
  },

  onOk: function onOk() {
    var selectedValue = this.state.selectedValue;

    if (this.isAllowedDate(selectedValue)) {
      this.props.onOk(selectedValue);
    }
  },

  onDateInputChange: function onDateInputChange(value) {
    this.onSelect(value, {
      source: 'dateInput'
    });
  },

  onDateTableSelect: function onDateTableSelect(value) {
    this.onSelect(value);
  },

  chooseToday: function chooseToday() {
    var today = this.state.value.clone();
    today.setTime(Date.now());
    this.onSelect(today);
  },

  render: function render() {
    var props = this.props;
    var locale = props.locale;
    var prefixCls = props.prefixCls;
    var disabledDate = props.disabledDate;
    var dateInputPlaceholder = props.dateInputPlaceholder;
    var timePicker = props.timePicker;
    var disabledTime = props.disabledTime;

    var state = this.state;
    var value = state.value;
    var selectedValue = state.selectedValue;

    var dateInputElement = props.showDateInput ? _react2['default'].createElement(_dateDateInput2['default'], { formatter: this.getFormatter(),
      key: 'date-input',
      timePicker: timePicker,
      gregorianCalendarLocale: value.locale,
      locale: locale,
      placeholder: dateInputPlaceholder,
      showClear: true,
      disabledTime: disabledTime,
      disabledDate: disabledDate,
      onClear: this.onClear,
      prefixCls: prefixCls,
      selectedValue: selectedValue,
      onChange: this.onDateInputChange }) : null;
    var children = [dateInputElement, _react2['default'].createElement(
      'div',
      { key: 'date-panel',
        className: prefixCls + '-date-panel' },
      _react2['default'].createElement(_calendarCalendarHeader2['default'], {
        locale: locale,
        onValueChange: this.setValue,
        value: value,
        prefixCls: prefixCls }),
      _react2['default'].createElement(
        'div',
        { className: prefixCls + '-calendar-body' },
        _react2['default'].createElement(_dateDateTable2['default'], {
          locale: locale,
          value: value,
          selectedValue: selectedValue,
          prefixCls: prefixCls,
          dateRender: props.dateRender,
          onSelect: this.onDateTableSelect,
          disabledDate: disabledDate,
          showWeekNumber: props.showWeekNumber })
      ),
      _react2['default'].createElement(_calendarCalendarFooter2['default'], {
        locale: locale,
        showOk: props.showOk,
        prefixCls: prefixCls,
        showToday: props.showToday,
        disabledTime: disabledTime,
        gregorianCalendarLocale: value.locale,
        showDateInput: props.showDateInput,
        timePicker: timePicker,
        selectedValue: selectedValue,
        value: value,
        disabledDate: disabledDate,
        onOk: this.onOk,
        onSelect: this.onSelect,
        onToday: this.chooseToday
      })
    )];

    return this.renderRoot({
      children: children,
      className: props.showWeekNumber ? prefixCls + '-week-number' : ''
    });
  }
});

exports['default'] = Calendar;
module.exports = exports['default'];