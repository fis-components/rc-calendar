'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gregorianCalendar = require('gregorian-calendar');

var _gregorianCalendar2 = _interopRequireDefault(_gregorianCalendar);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _rangeCalendarCalendarPart = require('./range-calendar/CalendarPart');

var _rangeCalendarCalendarPart2 = _interopRequireDefault(_rangeCalendarCalendarPart);

var _util = require('./util/');

var _calendarTodayButton = require('./calendar/TodayButton');

var _calendarTodayButton2 = _interopRequireDefault(_calendarTodayButton);

var _calendarOkButton = require('./calendar/OkButton');

var _calendarOkButton2 = _interopRequireDefault(_calendarOkButton);

var _mixinCommonMixin = require('./mixin/CommonMixin');

var _mixinCommonMixin2 = _interopRequireDefault(_mixinCommonMixin);

function noop() {}

function getNow() {
  var selectedValue = new _gregorianCalendar2['default']();
  selectedValue.setTime(Date.now());
  return selectedValue;
}

function onValueChange(direction, current) {
  var value = undefined;
  value = current;
  if (direction === 'right') {
    value.addMonth(-1);
  }
  this.fireValueChange(value);
}

function normalizeAnchor(props, init) {
  var selectedValue = props.selectedValue || init && props.defaultSelectedValue || [];
  var value = props.value;
  if (Array.isArray(value)) {
    value = value[0];
  }
  var defaultValue = props.defaultValue;
  if (Array.isArray(defaultValue)) {
    defaultValue = defaultValue[0];
  }
  return value || init && defaultValue || selectedValue[0] || init && getNow();
}

function onTimeSelect(direction, value) {
  var index = direction === 'left' ? 0 : 1;
  var selectedValue = this.state.selectedValue;
  if (selectedValue[index]) {
    selectedValue = selectedValue.concat();
    selectedValue[index] = selectedValue[index].clone();
    (0, _util.syncTime)(value, selectedValue[index]);
    this.fireSelectValueChange(selectedValue);
  }
}

function onInputSelect(direction, value) {
  if (!value) {
    return;
  }
  var originalValue = this.state.selectedValue;
  var selectedValue = originalValue.concat();
  var index = direction === 'left' ? 0 : 1;
  selectedValue[index] = value;
  if (selectedValue[0] && selectedValue[1]) {
    if (selectedValue[0].getTime() > selectedValue[1].getTime()) {
      selectedValue.length = 1;
    }
  }
  this.fireSelectValueChange(selectedValue);
}

var RangeCalendar = _react2['default'].createClass({
  displayName: 'RangeCalendar',

  propTypes: {
    defaultValue: _react.PropTypes.any,
    value: _react.PropTypes.any,
    selectedValue: _react.PropTypes.array,
    defaultSelectedValue: _react.PropTypes.array,
    onOk: _react.PropTypes.func,
    onChange: _react.PropTypes.func,
    onSelect: _react.PropTypes.func,
    onValueChange: _react.PropTypes.func,
    formatter: _react.PropTypes.object
  },

  mixins: [_mixinCommonMixin2['default']],

  getDefaultProps: function getDefaultProps() {
    return {
      defaultSelectedValue: [],
      onValueChange: noop
    };
  },

  getInitialState: function getInitialState() {
    var props = this.props;
    var selectedValue = props.selectedValue || props.defaultSelectedValue;
    var value = normalizeAnchor(props, 1);
    return { selectedValue: selectedValue, value: value };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var newState = {};
    if ('value' in nextProps) {
      if (nextProps.value) {
        newState.value = nextProps.value;
      } else {
        newState.value = normalizeAnchor(nextProps, 0);
      }
      this.setState(newState);
    }
    if ('selectedValue' in nextProps) {
      newState.selectedValue = nextProps.selectedValue;
      this.setState(newState);
    }
  },

  onSelect: function onSelect(value) {
    var originalValue = this.state.selectedValue;
    var selectedValue = originalValue.concat();
    var changed = false;
    if (!selectedValue.length || selectedValue.length === 2 && !originalValue.hovering) {
      selectedValue.length = 1;
      selectedValue[0] = value;
      changed = true;
    } else if (selectedValue[0].getTime() < value.getTime()) {
      selectedValue[1] = value;
      changed = true;
    } else if (selectedValue[0].getTime() > value.getTime()) {
      selectedValue.length = 1;
      selectedValue[0] = value;
      changed = true;
    }
    if (changed) {
      this.fireSelectValueChange(selectedValue);
    }
  },

  onDayHover: function onDayHover(hoverValue) {
    var selectedValue = this.state.selectedValue;
    if (!selectedValue.length || selectedValue.length === 2 && !selectedValue.hovering) {
      return;
    }
    if (hoverValue.getTime() < selectedValue[0].getTime()) {
      return;
    }
    selectedValue = selectedValue.concat();
    selectedValue[1] = hoverValue;
    selectedValue.hovering = 1;
    this.fireSelectValueChange(selectedValue);
  },

  onToday: function onToday() {
    this.setState({
      value: (0, _util.getTodayTime)(this.state.value)
    });
  },

  onOk: function onOk() {
    this.props.onOk(this.state.selectedValue);
  },

  getStartValue: function getStartValue() {
    var value = this.state.value;
    var selectedValue = this.state.selectedValue;
    if (selectedValue[0]) {
      value = value.clone();
      (0, _util.syncTime)(selectedValue[0], value);
    }
    return value;
  },

  getEndValue: function getEndValue() {
    var endValue = this.state.value.clone();
    endValue.addMonth(1);
    var selectedValue = this.state.selectedValue;
    if (selectedValue[1]) {
      (0, _util.syncTime)(selectedValue[1], endValue);
    }
    return endValue;
  },

  fireSelectValueChange: function fireSelectValueChange(selectedValue) {
    if (!('selectedValue' in this.props)) {
      this.setState({ selectedValue: selectedValue });
    }
    this.props.onChange(selectedValue);
    if (selectedValue.length === 2 && !selectedValue.hovering) {
      this.props.onSelect(selectedValue);
    }
  },

  fireValueChange: function fireValueChange(value) {
    var props = this.props;
    if (!('value' in props)) {
      this.setState({ value: value });
    }
    props.onValueChange(value);
  },

  render: function render() {
    var _className;

    var props = this.props;
    var state = this.state;
    var prefixCls = props.prefixCls;
    var dateInputPlaceholder = props.dateInputPlaceholder;

    var className = (_className = {}, _defineProperty(_className, props.className, !!props.className), _defineProperty(_className, prefixCls, 1), _defineProperty(_className, prefixCls + '-hidden', !props.visible), _defineProperty(_className, prefixCls + '-range', 1), _defineProperty(_className, prefixCls + '-week-number', props.showWeekNumber), _className);
    var classes = (0, _classnames2['default'])(className);
    var newProps = {
      selectedValue: state.selectedValue,
      onSelect: this.onSelect,
      onDayHover: this.onDayHover
    };

    var placeholder1 = undefined;
    var placeholder2 = undefined;

    if (dateInputPlaceholder) {
      if (Array.isArray(dateInputPlaceholder)) {
        var _dateInputPlaceholder = _slicedToArray(dateInputPlaceholder, 2);

        placeholder1 = _dateInputPlaceholder[0];
        placeholder2 = _dateInputPlaceholder[1];
      } else {
        placeholder1 = placeholder2 = dateInputPlaceholder;
      }
    }
    return _react2['default'].createElement(
      'div',
      { className: classes, style: props.style,
        tabIndex: '0' },
      _react2['default'].createElement(_rangeCalendarCalendarPart2['default'], _extends({}, props, newProps, { direction: 'left',
        formatter: this.getFormatter(),
        value: this.getStartValue(),
        placeholder: placeholder1,
        onInputSelect: onInputSelect.bind(this, 'left'),
        onTimeSelect: onTimeSelect.bind(this, 'left'),
        onValueChange: onValueChange.bind(this, 'left') })),
      _react2['default'].createElement(
        'span',
        { className: prefixCls + '-range-middle' },
        '~'
      ),
      _react2['default'].createElement(_rangeCalendarCalendarPart2['default'], _extends({}, props, newProps, { direction: 'right',
        formatter: this.getFormatter(),
        placeholder: placeholder2,
        value: this.getEndValue(),
        onInputSelect: onInputSelect.bind(this, 'right'),
        onTimeSelect: onTimeSelect.bind(this, 'right'),
        onValueChange: onValueChange.bind(this, 'right') })),
      _react2['default'].createElement(
        'div',
        { className: prefixCls + '-range-bottom' },
        _react2['default'].createElement(_calendarTodayButton2['default'], _extends({}, props, { value: state.value,
          onToday: this.onToday })),
        _react2['default'].createElement(_calendarOkButton2['default'], _extends({}, props, { value: state.value,
          onOk: this.onOk,
          okDisabled: state.selectedValue.length !== 2 || state.selectedValue.hovering
        }))
      )
    );
  }
});

exports['default'] = RangeCalendar;
module.exports = exports['default'];