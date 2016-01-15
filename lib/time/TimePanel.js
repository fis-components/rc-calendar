'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUtil = require('rc-util');

function choose(hour, event) {
  var next = this.state.value.clone();
  var method = this.props.setter;
  next[method](hour);
  this.props.onSelect(next, method);
  event.preventDefault();
}

var TimePanel = (function (_React$Component) {
  _inherits(TimePanel, _React$Component);

  function TimePanel(props) {
    _classCallCheck(this, TimePanel);

    _get(Object.getPrototypeOf(TimePanel.prototype), 'constructor', this).call(this, props);
    this.state = {
      value: props.value
    };
    this.prefixCls = props.rootPrefixCls + '-time-panel';
  }

  _createClass(TimePanel, [{
    key: 'render',
    value: function render() {
      var _this = this;

      var value = this.state.value;
      var props = this.props;
      var method = props.getter;
      var currentHour = value[method]();
      var data = [];
      var prefixCls = this.prefixCls;
      var ROW = props.rowCount;
      var COL = props.colCount;

      for (var rowIndex = 0; rowIndex < ROW; rowIndex++) {
        data[rowIndex] = [];
        for (var colIndex = 0; colIndex < COL; colIndex++) {
          data[rowIndex][colIndex] = rowIndex * COL + colIndex;
        }
      }

      var hoursEls = data.map(function (row, index) {
        var tds = row.map(function (hour) {
          var _classNameMap;

          var classNameMap = (_classNameMap = {}, _defineProperty(_classNameMap, prefixCls + '-cell', 1), _defineProperty(_classNameMap, prefixCls + '-selected-cell', hour === currentHour), _classNameMap);
          return _react2['default'].createElement(
            'td',
            {
              key: hour,
              onClick: choose.bind(_this, hour),
              role: 'gridcell',
              className: (0, _rcUtil.classSet)(classNameMap) },
            _react2['default'].createElement(
              'a',
              {
                className: prefixCls + '-time' },
              hour
            )
          );
        });
        return _react2['default'].createElement(
          'tr',
          { key: index, role: 'row' },
          tds
        );
      });

      return _react2['default'].createElement(
        'div',
        { className: prefixCls },
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-header' },
          _react2['default'].createElement(
            'div',
            { className: prefixCls + '-title' },
            props.title
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-body' },
          _react2['default'].createElement(
            'table',
            { className: prefixCls + '-table', cellSpacing: '0', role: 'grid' },
            _react2['default'].createElement(
              'tbody',
              { className: prefixCls + '-tbody' },
              hoursEls
            )
          )
        )
      );
    }
  }]);

  return TimePanel;
})(_react2['default'].Component);

exports['default'] = TimePanel;

TimePanel.propTypes = {
  value: _react.PropTypes.object,
  rootPrefixCls: _react.PropTypes.string
};

TimePanel.defaultProps = {
  onSelect: function onSelect() {}
};
module.exports = exports['default'];