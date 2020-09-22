(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_fsharp"],{

/***/ "./node_modules/highlight.js/lib/languages/fsharp.js":
/*!***********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/fsharp.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: F#\nAuthor: Jonas Follesø <jonas@follesoe.no>\nContributors: Troy Kershaw <hello@troykershaw.com>, Henrik Feldt <henrik@haf.se>\nWebsite: https://docs.microsoft.com/en-us/dotnet/fsharp/\nCategory: functional\n*/\nfunction fsharp(hljs) {\n  var TYPEPARAM = {\n    begin: '<', end: '>',\n    contains: [\n      hljs.inherit(hljs.TITLE_MODE, {begin: /'[a-zA-Z0-9_]+/})\n    ]\n  };\n\n  return {\n    name: 'F#',\n    aliases: ['fs'],\n    keywords:\n      'abstract and as assert base begin class default delegate do done ' +\n      'downcast downto elif else end exception extern false finally for ' +\n      'fun function global if in inherit inline interface internal lazy let ' +\n      'match member module mutable namespace new null of open or ' +\n      'override private public rec return sig static struct then to ' +\n      'true try type upcast use val void when while with yield',\n    illegal: /\\/\\*/,\n    contains: [\n      {\n        // monad builder keywords (matches before non-bang kws)\n        className: 'keyword',\n        begin: /\\b(yield|return|let|do)!/\n      },\n      {\n        className: 'string',\n        begin: '@\"', end: '\"',\n        contains: [{begin: '\"\"'}]\n      },\n      {\n        className: 'string',\n        begin: '\"\"\"', end: '\"\"\"'\n      },\n      hljs.COMMENT('\\\\(\\\\*', '\\\\*\\\\)'),\n      {\n        className: 'class',\n        beginKeywords: 'type', end: '\\\\(|=|$', excludeEnd: true,\n        contains: [\n          hljs.UNDERSCORE_TITLE_MODE,\n          TYPEPARAM\n        ]\n      },\n      {\n        className: 'meta',\n        begin: '\\\\[<', end: '>\\\\]',\n        relevance: 10\n      },\n      {\n        className: 'symbol',\n        begin: '\\\\B(\\'[A-Za-z])\\\\b',\n        contains: [hljs.BACKSLASH_ESCAPE]\n      },\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),\n      hljs.C_NUMBER_MODE\n    ]\n  };\n}\n\nmodule.exports = fsharp;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/fsharp.js?");

/***/ })

}]);