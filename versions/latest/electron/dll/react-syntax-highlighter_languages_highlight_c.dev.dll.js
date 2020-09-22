(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_c"],{

/***/ "./node_modules/highlight.js/lib/languages/c.js":
/*!******************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/c.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: C\nCategory: common, system\nWebsite: https://en.wikipedia.org/wiki/C_(programming_language)\nRequires: c-like.js\n*/\n\n/** @type LanguageFn */\nfunction c(hljs) {\n  var lang = hljs.requireLanguage('c-like').rawDefinition();\n  // Until C is actually different than C++ there is no reason to auto-detect C\n  // as it's own language since it would just fail auto-detect testing or\n  // simply match with C++.\n  //\n  // See further comments in c-like.js.\n\n  // lang.disableAutodetect = false;\n  lang.name = 'C';\n  lang.aliases = ['c', 'h'];\n  return lang;\n}\n\nmodule.exports = c;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/c.js?");

/***/ })

}]);