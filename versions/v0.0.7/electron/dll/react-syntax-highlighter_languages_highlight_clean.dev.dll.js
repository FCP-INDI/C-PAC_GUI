(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_clean"],{

/***/ "./node_modules/highlight.js/lib/languages/clean.js":
/*!**********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/clean.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Clean\nAuthor: Camil Staps <info@camilstaps.nl>\nCategory: functional\nWebsite: http://clean.cs.ru.nl\n*/\n\n/** @type LanguageFn */\nfunction clean(hljs) {\n  return {\n    name: 'Clean',\n    aliases: ['clean','icl','dcl'],\n    keywords: {\n      keyword:\n        'if let in with where case of class instance otherwise ' +\n        'implementation definition system module from import qualified as ' +\n        'special code inline foreign export ccall stdcall generic derive ' +\n        'infix infixl infixr',\n      built_in:\n        'Int Real Char Bool',\n      literal:\n        'True False'\n    },\n    contains: [\n\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.C_BLOCK_COMMENT_MODE,\n      hljs.APOS_STRING_MODE,\n      hljs.QUOTE_STRING_MODE,\n      hljs.C_NUMBER_MODE,\n\n      {begin: '->|<-[|:]?|#!?|>>=|\\\\{\\\\||\\\\|\\\\}|:==|=:|<>'} // relevance booster\n    ]\n  };\n}\n\nmodule.exports = clean;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/clean.js?");

/***/ })

}]);