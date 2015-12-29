'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _calendarCalendarHeader = require('../calendar/CalendarHeader');

var _calendarCalendarHeader2 = _interopRequireDefault(_calendarCalendarHeader);

var _dateDateTable = require('../date/DateTable');

var _dateDateTable2 = _interopRequireDefault(_dateDateTable);

var _calendarCalendarFooter = require('../calendar/CalendarFooter');

var _calendarCalendarFooter2 = _interopRequireDefault(_calendarCalendarFooter);

var _dateDateInput = require('../date/DateInput');

var _dateDateInput2 = _interopRequireDefault(_dateDateInput);

var Calendar = _react2['default'].createClass({
  displayName: 'Calendar',

  propTypes: {
    onTimeSelect: _react.PropTypes.func
  },

  render: function render() {
    var props = this.props;
    var value = props.value;
    var direction = props.direction;
    var prefixCls = props.prefixCls;
    var locale = props.locale;
    var selectedValue = props.selectedValue;
    var formatter = props.formatter;
    var placeholder = props.placeholder;
    var disabledDate = props.disabledDate;
    var timePicker = props.timePicker;
    var disabledTime = props.disabledTime;

    var rangeClassName = prefixCls + '-range';
    var newProps = { locale: locale, value: value, prefixCls: prefixCls };
    var index = direction === 'left' ? 0 : 1;
    return _react2['default'].createElement(
      'div',
      { className: rangeClassName + '-part ' + rangeClassName + '-' + direction },
      _react2['default'].createElement(_dateDateInput2['default'], { formatter: formatter,
        locale: locale,
        prefixCls: prefixCls,
        timePicker: timePicker,
        disabledDate: disabledDate,
        placeholder: placeholder,
        disabledTime: disabledTime,
        gregorianCalendarLocale: value.locale,
        showClear: false,
        selectedValue: selectedValue[index] || selectedValue[0],
        onChange: props.onInputSelect }),
      _react2['default'].createElement(
        'div',
        { style: { outline: 'none' } },
        _react2['default'].createElement(_calendarCalendarHeader2['default'], _extends({}, newProps, {
          enableNext: direction === 'right',
          enablePrev: direction === 'left',
          onValueChange: props.onValueChange })),
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-calendar-body' },
          _react2['default'].createElement(_dateDateTable2['default'], _extends({}, newProps, {
            selectedValue: selectedValue,
            dateRender: props.dateRender,
            onSelect: props.onSelect,
            onDayHover: props.onDayHover,
            disabledDate: disabledDate,
            showWeekNumber: props.showWeekNumber }))
        ),
        _react2['default'].createElement(_calendarCalendarFooter2['default'], _extends({}, newProps, {
          disabledDate: props.disabledDate,
          timeDisabled: !selectedValue[index] || !!selectedValue.hovering,
          onSelect: this.props.onTimeSelect,
          onToday: this.chooseToday
        }))
      )
    );
  }
});

exports['default'] = Calendar;
module.exports = exports['default'];