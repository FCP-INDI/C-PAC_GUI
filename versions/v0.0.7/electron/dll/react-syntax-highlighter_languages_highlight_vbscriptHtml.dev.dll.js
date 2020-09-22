(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_vbscriptHtml"],{

/***/ "./node_modules/highlight.js/lib/languages/vbscript-html.js":
/*!******************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/vbscript-html.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: VBScript in HTML\nRequires: xml.js, vbscript.js\nAuthor: Ivan Sagalaev <maniac@softwaremaniacs.org>\nDescription: \"Bridge\" language defining fragments of VBScript in HTML within <% .. %>\nWebsite: https://en.wikipedia.org/wiki/VBScript\nCategory: scripting\n*/\n\nfunction vbscriptHtml(hljs) {\n  return {\n    name: 'VBScript in HTML',\n    subLanguage: 'xml',\n    contains: [\n      {\n        begin: '<%', end: '%>',\n        subLanguage: 'vbscript'\n      }\n    ]\n  };\n}\n\nmodule.exports = vbscriptHtml;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/vbscript-html.js?");

/***/ })

}]);