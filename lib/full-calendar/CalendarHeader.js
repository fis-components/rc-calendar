'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function noop() {}

var CalendarHeader = (function (_Component) {
  _inherits(CalendarHeader, _Component);

  function CalendarHeader() {
    _classCallCheck(this, CalendarHeader);

    _get(Object.getPrototypeOf(CalendarHeader.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(CalendarHeader, [{
    key: 'onYearChange',
    value: function onYearChange(year) {
      var newValue = this.props.value.clone();
      newValue.setYear(parseInt(year, 10));
      this.props.onValueChange(newValue);
    }
  }, {
    key: 'onMonthChange',
    value: function onMonthChange(month) {
      var newValue = this.props.value.clone();
      newValue.setMonth(parseInt(month, 10));
      this.props.onValueChange(newValue);
    }
  }, {
    key: 'getYearSelectElement',
    value: function getYearSelectElement(year) {
      var _props = this.props;
      var yearSelectOffset = _props.yearSelectOffset;
      var yearSelectTotal = _props.yearSelectTotal;
      var locale = _props.locale;
      var prefixCls = _props.prefixCls;
      var Select = _props.Select;

      var start = year - yearSelectOffset;
      var end = start + yearSelectTotal;
      var suffix = locale.year === '年' ? '年' : '';

      var options = [];
      for (var index = start; index < end; index++) {
        options.push(_react2['default'].createElement(
          Select.Option,
          { key: '' + index },
          index + suffix
        ));
      }
      return _react2['default'].createElement(
        Select,
        {
          className: prefixCls + '-header-year-select',
          onChange: this.onYearChange.bind(this),
          dropdownStyle: { zIndex: 2000 },
          dropdownMenuStyle: { maxHeight: 250, overflow: 'auto', fontSize: 12 },
          optionLabelProp: 'children',
          value: String(year),
          showSearch: false },
        options
      );
    }
  }, {
    key: 'getMonthSelectElement',
    value: function getMonthSelectElement(month) {
      var props = this.props;
      var months = props.locale.format.months;
      var prefixCls = props.prefixCls;

      var options = [];
      var Select = props.Select;

      for (var index = 0; index < 12; index++) {
        options.push(_react2['default'].createElement(
          Select.Option,
          { key: '' + index },
          months[index]
        ));
      }

      return _react2['default'].createElement(
        Select,
        {
          className: prefixCls + '-header-month-select',
          dropdownStyle: { zIndex: 2000 },
          dropdownMenuStyle: { maxHeight: 250, overflow: 'auto', overflowX: 'hidden', fontSize: 12 },
          optionLabelProp: 'children',
          value: String(month),
          showSearch: false,
          onChange: this.onMonthChange.bind(this) },
        options
      );
    }
  }, {
    key: 'changeTypeToDate',
    value: function changeTypeToDate() {
      this.props.onTypeChange('date');
    }
  }, {
    key: 'changeTypeToMonth',
    value: function changeTypeToMonth() {
      this.props.onTypeChange('month');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var value = _props2.value;
      var locale = _props2.locale;
      var prefixCls = _props2.prefixCls;
      var type = _props2.type;
      var showTypeSwitch = _props2.showTypeSwitch;
      var headerComponents = _props2.headerComponents;

      var year = value.getYear();
      var month = value.getMonth();
      var yearSelect = this.getYearSelectElement(year);
      var monthSelect = type === 'month' ? null : this.getMonthSelectElement(month);
      var switchCls = prefixCls + '-header-switcher';
      var typeSwitcher = showTypeSwitch ? _react2['default'].createElement(
        'span',
        { className: switchCls },
        type === 'date' ? _react2['default'].createElement(
          'span',
          { className: switchCls + '-focus' },
          locale.month
        ) : _react2['default'].createElement(
          'span',
          { onClick: this.changeTypeToDate.bind(this), className: switchCls + '-normal' },
          locale.month
        ),
        type === 'month' ? _react2['default'].createElement(
          'span',
          { className: switchCls + '-focus' },
          locale.year
        ) : _react2['default'].createElement(
          'span',
          { onClick: this.changeTypeToMonth.bind(this), className: switchCls + '-normal' },
          locale.year
        )
      ) : null;

      return _react2['default'].createElement(
        'div',
        { className: prefixCls + '-header' },
        typeSwitcher,
        monthSelect,
        yearSelect,
        headerComponents
      );
    }
  }]);

  return CalendarHeader;
})(_react.Component);

CalendarHeader.propTypes = {
  value: _react.PropTypes.object,
  locale: _react.PropTypes.object,
  yearSelectOffset: _react.PropTypes.number,
  yearSelectTotal: _react.PropTypes.number,
  onValueChange: _react.PropTypes.func,
  onTypeChange: _react.PropTypes.func,
  Select: _react.PropTypes.func,
  prefixCls: _react.PropTypes.string,
  type: _react.PropTypes.string,
  showTypeSwitch: _react.PropTypes.bool,
  headerComponents: _react.PropTypes.array
};
CalendarHeader.defaultProps = {
  yearSelectOffset: 10,
  yearSelectTotal: 20,
  onValueChange: noop,
  onTypeChange: noop
};

exports['default'] = CalendarHeader;
module.exports = exports['default'];