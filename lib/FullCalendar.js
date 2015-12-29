'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dateDateTable = require('./date/DateTable');

var _dateDateTable2 = _interopRequireDefault(_dateDateTable);

var _monthMonthTable = require('./month/MonthTable');

var _monthMonthTable2 = _interopRequireDefault(_monthMonthTable);

var _mixinCalendarMixin = require('./mixin/CalendarMixin');

var _mixinCalendarMixin2 = _interopRequireDefault(_mixinCalendarMixin);

var _mixinCommonMixin = require('./mixin/CommonMixin');

var _mixinCommonMixin2 = _interopRequireDefault(_mixinCommonMixin);

var _fullCalendarCalendarHeader = require('./full-calendar/CalendarHeader');

var _fullCalendarCalendarHeader2 = _interopRequireDefault(_fullCalendarCalendarHeader);

var FullCalendar = _react2['default'].createClass({
  displayName: 'FullCalendar',

  propTypes: {
    defaultType: _react.PropTypes.string,
    type: _react.PropTypes.string,
    onTypeChange: _react.PropTypes.func,
    fullscreen: _react.PropTypes.bool,
    monthCellRender: _react.PropTypes.func,
    dateCellRender: _react.PropTypes.func,
    showTypeSwitch: _react.PropTypes.bool,
    Select: _react.PropTypes.func.isRequired,
    headerComponents: _react.PropTypes.array,
    headerComponent: _react.PropTypes.object, // The whole header component
    headerRender: _react.PropTypes.func,
    showHeader: _react.PropTypes.bool
  },
  mixins: [_mixinCommonMixin2['default'], _mixinCalendarMixin2['default']],
  getDefaultProps: function getDefaultProps() {
    return {
      defaultType: 'date',
      fullscreen: false,
      showTypeSwitch: true,
      showHeader: true,
      onTypeChange: function onTypeChange() {}
    };
  },
  getInitialState: function getInitialState() {
    var type = undefined;
    if ('type' in this.props) {
      type = this.props.type;
    } else {
      type = this.props.defaultType;
    }
    return { type: type };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('type' in nextProps) {
      this.setState({
        type: nextProps.type
      });
    }
  },
  onMonthSelect: function onMonthSelect(value) {
    this.onSelect(value, { target: 'month' });
  },
  setType: function setType(type) {
    if (!('type' in this.props)) {
      this.setState({ type: type });
    }
    this.props.onTypeChange(type);
  },
  render: function render() {
    var props = this.props;
    var locale = props.locale;
    var prefixCls = props.prefixCls;
    var fullscreen = props.fullscreen;
    var showHeader = props.showHeader;
    var headerComponent = props.headerComponent;
    var headerRender = props.headerRender;
    var _state = this.state;
    var value = _state.value;
    var type = _state.type;

    var header = null;
    if (showHeader) {
      if (headerRender) {
        header = headerRender(value, type, locale);
      } else {
        var TheHeader = headerComponent || _fullCalendarCalendarHeader2['default'];
        header = _react2['default'].createElement(TheHeader, _extends({ key: 'calendar-header'
        }, props, {
          prefixCls: prefixCls + '-full',
          type: type,
          value: value,
          onTypeChange: this.setType,
          onValueChange: this.setValue }));
      }
    }

    var table = type === 'date' ? _react2['default'].createElement(_dateDateTable2['default'], {
      dateRender: props.dateCellRender,
      locale: locale,
      prefixCls: prefixCls,
      onSelect: this.onSelect,
      value: value }) : _react2['default'].createElement(_monthMonthTable2['default'], {
      cellRender: props.monthCellRender,
      locale: locale,
      onSelect: this.onMonthSelect,
      prefixCls: prefixCls + '-month-panel',
      value: value });

    var children = [header, _react2['default'].createElement(
      'div',
      { key: 'calendar-body', className: prefixCls + '-calendar-body' },
      table
    )];

    var className = [prefixCls + '-full'];

    if (fullscreen) {
      className.push(prefixCls + '-fullscreen');
    }

    return this.renderRoot({ children: children, className: className.join(' ') });
  }
});

exports['default'] = FullCalendar;
module.exports = exports['default'];