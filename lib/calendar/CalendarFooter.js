'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _timeTime = require('../time/Time');

var _timeTime2 = _interopRequireDefault(_timeTime);

var _rcUtil = require('rc-util');

var _rcUtil2 = _interopRequireDefault(_rcUtil);

var _util = require('../util/');

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

  render: function render() {
    var props = this.props;
    var value = props.value;
    var locale = props.locale;
    var prefixCls = props.prefixCls;

    var footerEl = null;
    if (props.showToday || props.showTime) {
      var nowEl = undefined;
      if (props.showToday) {
        nowEl = (0, _util.getTodayElement)(props);
      }
      var okBtn = undefined;
      if (props.showOk) {
        okBtn = (0, _util.getOkElement)(props);
      }
      var footerBtn = undefined;
      if (nowEl || okBtn) {
        footerBtn = _react2['default'].createElement(
          'span',
          { className: prefixCls + '-footer-btn' },
          toFragment([nowEl, okBtn])
        );
      }
      var timeEl = undefined;
      if (props.showTime) {
        timeEl = _react2['default'].createElement(_timeTime2['default'], { value: value, prefixCls: prefixCls,
          disabled: props.timeDisabled,
          locale: locale, onChange: this.onSelect });
      }
      footerEl = _react2['default'].createElement(
        'div',
        { className: prefixCls + '-footer' },
        timeEl,
        footerBtn
      );
    }

    return footerEl;
  }
});

exports['default'] = CalendarFooter;
module.exports = exports['default'];