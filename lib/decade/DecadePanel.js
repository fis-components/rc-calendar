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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var ROW = 4;
var COL = 3;

function goYear(direction) {
  var next = this.state.value.clone();
  next.addYear(direction);
  this.setState({
    value: next
  });
}

function chooseDecade(year, event) {
  var next = this.state.value.clone();
  next.setYear(year);
  next.rollSetMonth(this.state.value.getMonth());
  this.props.onSelect(next);
  event.preventDefault();
}

var DecadePanel = (function (_React$Component) {
  _inherits(DecadePanel, _React$Component);

  function DecadePanel(props) {
    _classCallCheck(this, DecadePanel);

    _get(Object.getPrototypeOf(DecadePanel.prototype), 'constructor', this).call(this, props);
    this.state = {
      value: props.value || props.defaultValue
    };

    // bind methods
    this.prefixCls = props.rootPrefixCls + '-decade-panel';
    this.nextCentury = goYear.bind(this, 100);
    this.previousCentury = goYear.bind(this, -100);
  }

  _createClass(DecadePanel, [{
    key: 'render',
    value: function render() {
      var _this = this;

      var value = this.state.value;
      var locale = this.props.locale;
      var currentYear = value.getYear();
      var startYear = parseInt(currentYear / 100, 10) * 100;
      var preYear = startYear - 10;
      var endYear = startYear + 99;
      var decades = [];
      var index = 0;
      var prefixCls = this.prefixCls;

      for (var rowIndex = 0; rowIndex < ROW; rowIndex++) {
        decades[rowIndex] = [];
        for (var colIndex = 0; colIndex < COL; colIndex++) {
          var startDecade = preYear + index * 10;
          var endDecade = preYear + index * 10 + 9;
          decades[rowIndex][colIndex] = {
            startDecade: startDecade,
            endDecade: endDecade
          };
          index++;
        }
      }

      var decadesEls = decades.map(function (row, decadeIndex) {
        var tds = row.map(function (decadeData) {
          var _classNameMap;

          var dStartDecade = decadeData.startDecade;
          var dEndDecade = decadeData.endDecade;
          var isLast = dStartDecade < startYear;
          var isNext = dEndDecade > endYear;
          var classNameMap = (_classNameMap = {}, _defineProperty(_classNameMap, prefixCls + '-cell', 1), _defineProperty(_classNameMap, prefixCls + '-selected-cell', dStartDecade <= currentYear && currentYear <= dEndDecade), _defineProperty(_classNameMap, prefixCls + '-last-century-cell', isLast), _defineProperty(_classNameMap, prefixCls + '-next-century-cell', isNext), _classNameMap);
          var content = undefined;
          var clickHandler = undefined;
          if (isLast) {
            clickHandler = _this.previousCentury;
          } else if (isNext) {
            clickHandler = _this.nextCentury;
          } else {
            content = dStartDecade + '-' + dEndDecade;
            clickHandler = chooseDecade.bind(_this, dStartDecade);
          }
          return _react2['default'].createElement(
            'td',
            {
              key: dStartDecade,
              onClick: clickHandler,
              role: 'gridcell',
              className: (0, _classnames2['default'])(classNameMap)
            },
            _react2['default'].createElement(
              'a',
              {
                className: prefixCls + '-decade' },
              content
            )
          );
        });
        return _react2['default'].createElement(
          'tr',
          { key: decadeIndex, role: 'row' },
          tds
        );
      });

      return _react2['default'].createElement(
        'div',
        { className: this.prefixCls },
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-header' },
          _react2['default'].createElement(
            'a',
            { className: prefixCls + '-prev-century-btn',
              role: 'button',
              onClick: this.previousCentury,
              title: locale.previousCentury },
            '«'
          ),
          _react2['default'].createElement(
            'div',
            { className: prefixCls + '-century' },
            startYear,
            '-',
            endYear
          ),
          _react2['default'].createElement(
            'a',
            { className: prefixCls + '-next-century-btn',
              role: 'button',
              onClick: this.nextCentury,
              title: locale.nextCentury },
            '»'
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
              decadesEls
            )
          )
        )
      );
    }
  }]);

  return DecadePanel;
})(_react2['default'].Component);

exports['default'] = DecadePanel;

DecadePanel.propTypes = {
  locale: _react.PropTypes.object,
  value: _react.PropTypes.object,
  defaultValue: _react.PropTypes.object,
  rootPrefixCls: _react.PropTypes.string
};

DecadePanel.defaultProps = {
  onSelect: function onSelect() {}
};
module.exports = exports['default'];