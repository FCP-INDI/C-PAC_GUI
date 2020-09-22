(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_cpp"],{

/***/ "./node_modules/highlight.js/lib/languages/cpp.js":
/*!********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/cpp.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: C++\nCategory: common, system\nWebsite: https://isocpp.org\nRequires: c-like.js\n*/\n\n/** @type LanguageFn */\nfunction cpp(hljs) {\n  var lang = hljs.requireLanguage('c-like').rawDefinition();\n  // return auto-detection back on\n  lang.disableAutodetect = false;\n  lang.name = 'C++';\n  lang.aliases = ['cc', 'c++', 'h++', 'hpp', 'hh', 'hxx', 'cxx'];\n  return lang;\n}\n\nmodule.exports = cpp;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/cpp.js?");

/***/ })

}]);