"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDefaultCSS = exports.injectCSS = void 0;
const injected = {};
const injectCSS = (css) => {
    // Skip in node
    if (typeof document === 'undefined') {
        return;
    }
    if (injected[css]) {
        return;
    }
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
    injected[css] = true;
};
exports.injectCSS = injectCSS;
const makeDefaultCSS = (scope, backgroundColor) => {
    if (!scope) {
        return `
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
	    background-color: ${backgroundColor};
    }
    `;
    }
    return `
    ${scope} * {
      box-sizing: border-box;
    }
    ${scope} *:-webkit-full-screen {
      width: 100%;
      height: 100%;
    }
  `;
};
exports.makeDefaultCSS = makeDefaultCSS;
