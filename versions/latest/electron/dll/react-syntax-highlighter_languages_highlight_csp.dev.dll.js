(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_csp"],{

/***/ "./node_modules/highlight.js/lib/languages/csp.js":
/*!********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/csp.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: CSP\nDescription: Content Security Policy definition highlighting\nAuthor: Taras <oxdef@oxdef.info>\nWebsite: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP\n\nvim: ts=2 sw=2 st=2\n*/\n\n/** @type LanguageFn */\nfunction csp(hljs) {\n  return {\n    name: 'CSP',\n    case_insensitive: false,\n    keywords: {\n      $pattern: '[a-zA-Z][a-zA-Z0-9_-]*',\n      keyword: 'base-uri child-src connect-src default-src font-src form-action ' +\n        'frame-ancestors frame-src img-src media-src object-src plugin-types ' +\n        'report-uri sandbox script-src style-src',\n    },\n    contains: [\n    {\n      className: 'string',\n      begin: \"'\", end: \"'\"\n    },\n    {\n      className: 'attribute',\n      begin: '^Content', end: ':', excludeEnd: true,\n    },\n    ]\n  };\n}\n\nmodule.exports = csp;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/csp.js?");

/***/ })

}]);