(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_dockerfile"],{

/***/ "./node_modules/highlight.js/lib/languages/dockerfile.js":
/*!***************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/dockerfile.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Dockerfile\nRequires: bash.js\nAuthor: Alexis Hénaut <alexis@henaut.net>\nDescription: language definition for Dockerfile files\nWebsite: https://docs.docker.com/engine/reference/builder/\nCategory: config\n*/\n\nfunction dockerfile(hljs) {\n  return {\n    name: 'Dockerfile',\n    aliases: ['docker'],\n    case_insensitive: true,\n    keywords: 'from maintainer expose env arg user onbuild stopsignal',\n    contains: [\n      hljs.HASH_COMMENT_MODE,\n      hljs.APOS_STRING_MODE,\n      hljs.QUOTE_STRING_MODE,\n      hljs.NUMBER_MODE,\n      {\n        beginKeywords: 'run cmd entrypoint volume add copy workdir label healthcheck shell',\n        starts: {\n          end: /[^\\\\]$/,\n          subLanguage: 'bash'\n        }\n      }\n    ],\n    illegal: '</'\n  }\n}\n\nmodule.exports = dockerfile;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/dockerfile.js?");

/***/ })

}]);