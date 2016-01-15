'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var DateInput = _react2['default'].createClass({
  displayName: 'DateInput',

  propTypes: {
    formatter: _react.PropTypes.object,
    locale: _react.PropTypes.object,
    gregorianCalendarLocale: _react.PropTypes.object,
    disabledDate: _react.PropTypes.func,
    onChange: _react.PropTypes.func,
    onClear: _react.PropTypes.func,
    placeholder: _react.PropTypes.string,
    onSelect: _react.PropTypes.func,
    value: _react.PropTypes.object
  },

  getInitialState: function getInitialState() {
    var value = this.props.value;
    return {
      str: value && this.props.formatter.format(value) || '',
      invalid: false
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    // when popup show, click body will call this, bug!
    var value = nextProps.value;
    this.setState({
      str: value && nextProps.formatter.format(value) || '',
      invalid: false
    });
  },

  onInputChange: function onInputChange(event) {
    var str = event.target.value;
    this.setState({
      str: str
    });
    var value = undefined;
    var _props = this.props;
    var disabledDate = _props.disabledDate;
    var formatter = _props.formatter;
    var gregorianCalendarLocale = _props.gregorianCalendarLocale;
    var onChange = _props.onChange;

    if (str) {
      try {
        value = formatter.parse(str, {
          locale: gregorianCalendarLocale,
          obeyCount: true
        });
      } catch (ex) {
        this.setState({
          invalid: true
        });
        return;
      }
      if (value && (!disabledDate || !disabledDate(value))) {
        var originalValue = this.props.value;
        if (originalValue && value) {
          if (originalValue.getTime() !== value.getTime()) {
            onChange(value);
          }
        } else if (originalValue !== value) {
          onChange(value);
        }
      } else {
        this.setState({
          invalid: true
        });
        return;
      }
    } else {
      onChange(null);
    }
    this.setState({
      invalid: false
    });
  },

  onClear: function onClear() {
    this.setState({ str: '' });
    this.props.onClear(null);
  },

  render: function render() {
    var props = this.props;
    var _state = this.state;
    var invalid = _state.invalid;
    var str = _state.str;
    var locale = props.locale;
    var prefixCls = props.prefixCls;
    var placeholder = props.placeholder;

    var invalidClass = invalid ? prefixCls + '-input-invalid' : '';
    return _react2['default'].createElement(
      'div',
      { className: prefixCls + '-input-wrap' },
      _react2['default'].createElement('input', { className: prefixCls + '-input  ' + invalidClass,
        value: str,
        placeholder: placeholder,
        onChange: this.onInputChange }),
      props.showClear ? _react2['default'].createElement('a', { className: prefixCls + '-clear-btn',
        role: 'button',
        title: locale.clear,
        onClick: this.onClear }) : null
    );
  }
});

exports['default'] = DateInput;
module.exports = exports['default'];