(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_phpTemplate"],{

/***/ "./node_modules/highlight.js/lib/languages/php-template.js":
/*!*****************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/php-template.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: PHP Template\nRequires: xml.js, php.js\nAuthor: Josh Goebel <hello@joshgoebel.com>\nWebsite: https://www.php.net\nCategory: common\n*/\n\nfunction phpTemplate(hljs) {\n  return {\n    name: \"PHP template\",\n    subLanguage: 'xml',\n    contains: [\n      {\n        begin: /<\\?(php|=)?/,\n        end: /\\?>/,\n        subLanguage: 'php',\n        contains: [\n          // We don't want the php closing tag ?> to close the PHP block when\n          // inside any of the following blocks:\n          {begin: '/\\\\*', end: '\\\\*/', skip: true},\n          {begin: 'b\"', end: '\"', skip: true},\n          {begin: 'b\\'', end: '\\'', skip: true},\n          hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null, className: null, contains: null, skip: true}),\n          hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null, className: null, contains: null, skip: true})\n        ]\n      }\n    ]\n  };\n}\n\nmodule.exports = phpTemplate;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/php-template.js?");

/***/ })

}]);