(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_erb"],{

/***/ "./node_modules/highlight.js/lib/languages/erb.js":
/*!********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/erb.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: ERB (Embedded Ruby)\nRequires: xml.js, ruby.js\nAuthor: Lucas Mazza <lucastmazza@gmail.com>\nContributors: Kassio Borges <kassioborgesm@gmail.com>\nDescription: \"Bridge\" language defining fragments of Ruby in HTML within <% .. %>\nWebsite: https://ruby-doc.org/stdlib-2.6.5/libdoc/erb/rdoc/ERB.html\nCategory: template\n*/\n\nfunction erb(hljs) {\n  return {\n    name: 'ERB',\n    subLanguage: 'xml',\n    contains: [\n      hljs.COMMENT('<%#', '%>'),\n      {\n        begin: '<%[%=-]?', end: '[%-]?%>',\n        subLanguage: 'ruby',\n        excludeBegin: true,\n        excludeEnd: true\n      }\n    ]\n  };\n}\n\nmodule.exports = erb;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/erb.js?");

/***/ })

}]);