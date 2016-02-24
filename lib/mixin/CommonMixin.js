'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _localeEn_US = require('../locale/en_US');

var _localeEn_US2 = _interopRequireDefault(_localeEn_US);

var _utilIndex = require('../util/index');

function noop() {}

exports['default'] = {
  propTypes: {
    className: _react.PropTypes.string,
    locale: _react.PropTypes.object,
    style: _react.PropTypes.object,
    visible: _react.PropTypes.bool,
    onSelect: _react.PropTypes.func,
    prefixCls: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    onOk: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      locale: _localeEn_US2['default'],
      style: {},
      visible: true,
      prefixCls: 'rc-calendar',
      className: '',
      onSelect: noop,
      onChange: noop
    };
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    return this.props.visible || nextProps.visible;
  },

  getFormatter: function getFormatter() {
    var formatter = this.props.formatter;
    var locale = this.props.locale;
    if (formatter) {
      if (formatter === this.lastFormatter) {
        return this.normalFormatter;
      }
      this.normalFormatter = (0, _utilIndex.getFormatter)(formatter, locale);
      this.lastFormatter = formatter;
      return this.normalFormatter;
    }
    if (!this.showDateFormatter) {
      this.showDateFormatter = (0, _utilIndex.getFormatter)('yyyy-MM-dd', locale);
    }
    return this.showDateFormatter;
  }
};
module.exports = exports['default'];