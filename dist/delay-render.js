"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.continueRender = exports.delayRender = exports.DELAY_RENDER_CALLSTACK_TOKEN = void 0;
const get_environment_1 = require("./get-environment");
const timeout_1 = require("./timeout");
const truthy_1 = require("./truthy");
if (typeof window !== 'undefined') {
    window.ready = false;
}
let handles = [];
const timeouts = {};
exports.DELAY_RENDER_CALLSTACK_TOKEN = 'The delayRender was called:';
/**
 * Call this function to tell Remotion to wait before capturing this frame until data has loaded. Use continueRender() to unblock the render.
 * @param label _optional_ A label to identify the call in case it does time out.
 * @returns {number} An identifier to be passed to continueRender().
 * @link https://www.remotion.dev/docs/delay-render
 */
const delayRender = (label) => {
    var _a, _b;
    if (typeof label !== 'string' && typeof label !== 'undefined') {
        throw new Error('The label parameter of delayRender() must be a string or undefined, got: ' +
            JSON.stringify(label));
    }
    const handle = Math.random();
    handles.push(handle);
    const called = (_b = (_a = Error().stack) === null || _a === void 0 ? void 0 : _a.replace(/^Error/g, '')) !== null && _b !== void 0 ? _b : '';
    if ((0, get_environment_1.getRemotionEnvironment)() === 'rendering') {
        const timeoutToUse = typeof window === 'undefined'
            ? timeout_1.DEFAULT_PUPPETEER_TIMEOUT
            : window.remotion_puppeteerTimeout - 2000;
        timeouts[handle] = setTimeout(() => {
            const message = [
                `A delayRender()`,
                label ? `"${label}"` : null,
                `was called but not cleared after ${timeoutToUse}ms. See https://remotion.dev/docs/timeout for help.`,
                exports.DELAY_RENDER_CALLSTACK_TOKEN,
                called,
            ]
                .filter(truthy_1.truthy)
                .join(' ');
            throw new Error(message);
        }, timeoutToUse);
    }
    if (typeof window !== 'undefined') {
        window.ready = false;
    }
    return handle;
};
exports.delayRender = delayRender;
/**
 * Unblock a render that has been blocked by delayRender()
 * @param handle The return value of delayRender().
 * @link https://www.remotion.dev/docs/continue-render
 */
const continueRender = (handle) => {
    if (typeof handle === 'undefined') {
        throw new TypeError('The continueRender() method must be called with a parameter that is the return value of delayRender(). No value was passed.');
    }
    if (typeof handle !== 'number') {
        throw new TypeError('The parameter passed into continueRender() must be the return value of delayRender() which is a number. Got: ' +
            JSON.stringify(handle));
    }
    handles = handles.filter((h) => {
        if (h === handle) {
            if ((0, get_environment_1.getRemotionEnvironment)() === 'rendering') {
                clearTimeout(timeouts[handle]);
            }
            return false;
        }
        return true;
    });
    if (handles.length === 0 && typeof window !== 'undefined') {
        window.ready = true;
    }
};
exports.continueRender = continueRender;
