(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_ldif"],{

/***/ "./node_modules/highlight.js/lib/languages/ldif.js":
/*!*********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/ldif.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: LDIF\nContributors: Jacob Childress <jacobc@gmail.com>\nCategory: enterprise, config\nWebsite: https://en.wikipedia.org/wiki/LDAP_Data_Interchange_Format\n*/\nfunction ldif(hljs) {\n  return {\n    name: 'LDIF',\n    contains: [\n      {\n        className: 'attribute',\n        begin: '^dn', end: ': ', excludeEnd: true,\n        starts: {end: '$', relevance: 0},\n        relevance: 10\n      },\n      {\n        className: 'attribute',\n        begin: '^\\\\w', end: ': ', excludeEnd: true,\n        starts: {end: '$', relevance: 0}\n      },\n      {\n        className: 'literal',\n        begin: '^-', end: '$'\n      },\n      hljs.HASH_COMMENT_MODE\n    ]\n  };\n}\n\nmodule.exports = ldif;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/ldif.js?");

/***/ })

}]);