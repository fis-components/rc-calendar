'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _monthMonthPanel = require('./month/MonthPanel');

var _monthMonthPanel2 = _interopRequireDefault(_monthMonthPanel);

var _mixinCalendarMixin = require('./mixin/CalendarMixin');

var _mixinCalendarMixin2 = _interopRequireDefault(_mixinCalendarMixin);

var _mixinCommonMixin = require('./mixin/CommonMixin');

var _mixinCommonMixin2 = _interopRequireDefault(_mixinCommonMixin);

var _rcUtil = require('rc-util');

var MonthCalendar = _react2['default'].createClass({
  displayName: 'MonthCalendar',

  mixins: [_mixinCommonMixin2['default'], _mixinCalendarMixin2['default']],

  onKeyDown: function onKeyDown(event) {
    var keyCode = event.keyCode;
    var ctrlKey = event.ctrlKey || event.metaKey;
    var stateValue = this.state.value;
    var value = stateValue;
    switch (keyCode) {
      case _rcUtil.KeyCode.DOWN:
        value = stateValue.clone();
        value.addMonth(3);
        break;
      case _rcUtil.KeyCode.UP:
        value = stateValue.clone();
        value.addMonth(-3);
        break;
      case _rcUtil.KeyCode.LEFT:
        value = stateValue.clone();
        if (ctrlKey) {
          value.addYear(-1);
        } else {
          value.addMonth(-1);
        }
        break;
      case _rcUtil.KeyCode.RIGHT:
        value = stateValue.clone();
        if (ctrlKey) {
          value.addYear(1);
        } else {
          value.addMonth(1);
        }
        break;
      case _rcUtil.KeyCode.ENTER:
        this.onSelect(stateValue);
        event.preventDefault();
        return 1;
      default:
        return undefined;
    }
    if (value !== stateValue) {
      this.setValue(value);
      event.preventDefault();
      return 1;
    }
  },

  render: function render() {
    var props = this.props;
    var children = _react2['default'].createElement(_monthMonthPanel2['default'], { locale: props.locale,
      disabledDate: props.disabledDate,
      style: { position: 'relative' },
      value: this.state.value,
      rootPrefixCls: props.prefixCls,
      onChange: this.setValue,
      onSelect: this.onSelect });
    return this.renderRoot({
      children: children
    });
  }
});

exports['default'] = MonthCalendar;
module.exports = exports['default'];