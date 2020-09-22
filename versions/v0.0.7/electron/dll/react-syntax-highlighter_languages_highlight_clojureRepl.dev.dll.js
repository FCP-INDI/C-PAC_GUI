(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_clojureRepl"],{

/***/ "./node_modules/highlight.js/lib/languages/clojure-repl.js":
/*!*****************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/clojure-repl.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Clojure REPL\nDescription: Clojure REPL sessions\nAuthor: Ivan Sagalaev <maniac@softwaremaniacs.org>\nRequires: clojure.js\nWebsite: https://clojure.org\nCategory: lisp\n*/\n\n/** @type LanguageFn */\nfunction clojureRepl(hljs) {\n  return {\n    name: 'Clojure REPL',\n    contains: [\n      {\n        className: 'meta',\n        begin: /^([\\w.-]+|\\s*#_)?=>/,\n        starts: {\n          end: /$/,\n          subLanguage: 'clojure'\n        }\n      }\n    ]\n  }\n}\n\nmodule.exports = clojureRepl;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/clojure-repl.js?");

/***/ })

}]);