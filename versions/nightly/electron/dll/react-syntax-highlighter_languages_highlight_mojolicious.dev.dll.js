(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_mojolicious"],{

/***/ "./node_modules/highlight.js/lib/languages/mojolicious.js":
/*!****************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/mojolicious.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Mojolicious\nRequires: xml.js, perl.js\nAuthor: Dotan Dimet <dotan@corky.net>\nDescription: Mojolicious .ep (Embedded Perl) templates\nWebsite: https://mojolicious.org\nCategory: template\n*/\nfunction mojolicious(hljs) {\n  return {\n    name: 'Mojolicious',\n    subLanguage: 'xml',\n    contains: [\n      {\n        className: 'meta',\n        begin: '^__(END|DATA)__$'\n      },\n    // mojolicious line\n      {\n        begin: \"^\\\\s*%{1,2}={0,2}\", end: '$',\n        subLanguage: 'perl'\n      },\n    // mojolicious block\n      {\n        begin: \"<%{1,2}={0,2}\",\n        end: \"={0,1}%>\",\n        subLanguage: 'perl',\n        excludeBegin: true,\n        excludeEnd: true\n      }\n    ]\n  };\n}\n\nmodule.exports = mojolicious;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/mojolicious.js?");

/***/ })

}]);