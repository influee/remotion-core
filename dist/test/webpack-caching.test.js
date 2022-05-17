"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_caching_1 = require("../config/webpack-caching");
const expect_to_throw_1 = require("./expect-to-throw");
test('getWebpackCaching - default value', () => {
    expect((0, webpack_caching_1.getWebpackCaching)()).toEqual(webpack_caching_1.DEFAULT_WEBPACK_CACHE_ENABLED);
});
test('webpack caching - setter - valid input', () => {
    const valuesToTest = [true, false];
    valuesToTest.forEach((entry) => {
        (0, webpack_caching_1.setWebpackCaching)(entry);
        expect((0, webpack_caching_1.getWebpackCaching)()).toEqual(entry);
    });
});
test('webpack caching - setter - invalid input', () => {
    const valuesToTest = [undefined, 'true', 'false'];
    valuesToTest.forEach((entry) => {
        (0, expect_to_throw_1.expectToThrow)(() => {
            // @ts-expect-error
            (0, webpack_caching_1.setWebpackCaching)(entry);
        }, /Caching flag must be a boolean./);
    });
});
