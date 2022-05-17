"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delay_render_1 = require("../delay-render");
describe('Ready Manager tests', () => {
    let handle;
    test('delayRender sets window.ready to false', () => {
        window.ready = true;
        handle = (0, delay_render_1.delayRender)();
        expect(typeof handle).toBe('number');
        expect(window.ready).toBe(false);
    });
    test('continueRender sets window.ready to true', () => {
        (0, delay_render_1.continueRender)(handle);
        expect(window.ready).toBe(true);
    });
    test('Render is only continued if all handles have been finished', () => {
        handle = (0, delay_render_1.delayRender)();
        const handle2 = (0, delay_render_1.delayRender)();
        expect(window.ready).toBe(false);
        (0, delay_render_1.continueRender)(handle);
        expect(window.ready).toBe(false);
        (0, delay_render_1.continueRender)(handle2);
        expect(window.ready).toBe(true);
    });
});
