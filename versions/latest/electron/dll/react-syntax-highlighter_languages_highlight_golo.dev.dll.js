(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_golo"],{

/***/ "./node_modules/highlight.js/lib/languages/golo.js":
/*!*********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/golo.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Golo\nAuthor: Philippe Charriere <ph.charriere@gmail.com>\nDescription: a lightweight dynamic language for the JVM\nWebsite: http://golo-lang.org/\n*/\n\nfunction golo(hljs) {\n    return {\n      name: 'Golo',\n      keywords: {\n        keyword:\n          'println readln print import module function local return let var ' +\n          'while for foreach times in case when match with break continue ' +\n          'augment augmentation each find filter reduce ' +\n          'if then else otherwise try catch finally raise throw orIfNull ' +\n          'DynamicObject|10 DynamicVariable struct Observable map set vector list array',\n        literal:\n          'true false null'\n      },\n      contains: [\n        hljs.HASH_COMMENT_MODE,\n        hljs.QUOTE_STRING_MODE,\n        hljs.C_NUMBER_MODE,\n        {\n          className: 'meta', begin: '@[A-Za-z]+'\n        }\n      ]\n    }\n}\n\nmodule.exports = golo;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/golo.js?");

/***/ })

}]);