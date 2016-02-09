'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = transformCssModules;

var _path = require('path');

var _postcssCssnext = require('postcss-cssnext');

var _postcssCssnext2 = _interopRequireDefault(_postcssCssnext);

var _postcssImport = require('postcss-import');

var _postcssImport2 = _interopRequireDefault(_postcssImport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultOptions = {
    generateScopedName: '[name]__[local]___[hash:base64:5]'
};

function transformCssModules(_ref) {
    let t = _ref.types;

    return {
        visitor: {
            CallExpression(path, _ref2) {
                let file = _ref2.file;
                let opts = _ref2.opts;

                require('css-modules-require-hook')(_extends({}, defaultOptions, opts, { prepend: [(0, _postcssImport2.default)(), (0, _postcssCssnext2.default)()] }));

                var _path$node = path.node;
                const calleeName = _path$node.callee.name;
                const args = _path$node.arguments;

                if (calleeName !== 'require' || !args.length || !t.isStringLiteral(args[0])) {
                    return;
                }

                if (/\.css/i.test(args[0].value)) {
                    var _args = _slicedToArray(args, 1);

                    const cssPath = _args[0].value;

                    // if parent expression is variable declarator, replace right side with tokens

                    if (!t.isVariableDeclarator(path.parent)) {
                        throw new Error(`You can't import css file ${ cssPath } to a module scope.`);
                    }

                    const tokens = require((0, _path.resolve)(process.cwd(), (0, _path.dirname)(file.opts.filenameRelative), cssPath));

                    /* eslint-disable new-cap */
                    path.replaceWith(t.ObjectExpression(Object.keys(tokens).map(token => t.ObjectProperty(t.StringLiteral(token), t.StringLiteral(tokens[token])))));
                }
            }
        }
    };
}