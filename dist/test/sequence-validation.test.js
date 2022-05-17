"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const sequencing_1 = require("../sequencing");
const expect_to_throw_1 = require("./expect-to-throw");
describe('Composition-validation render should throw with invalid props', () => {
    describe('Throw with invalid duration props', () => {
        test('It should throw if Sequence has non-integer durationInFrames', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { from: 0, durationInFrames: 1.1, children: "hi" }, void 0)), /The "durationInFrames" of a sequence must be an integer, but got 1.1./);
        });
        test('It should throw if Sequence has negative duration', () => {
            (0, expect_to_throw_1.expectToThrow)(
            // @ts-expect-error
            () => (0, react_1.render)((0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { from: 0, durationInFrames: -1 }, void 0)), /durationInFrames must be positive, but got -1/);
        });
    });
    describe('Throw with invalid from props', () => {
        test('It should throw if "from" props is not a number', () => {
            (0, expect_to_throw_1.expectToThrow)(
            // @ts-expect-error
            () => (0, react_1.render)((0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { from: '0', durationInFrames: 30 }, void 0)), /You passed to the "from" props of your <Sequence> an argument of type string, but it must be a number./);
        });
        test('It should throw if Sequence has non-integer from', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { from: 0.1, durationInFrames: 1, children: "hi" }, void 0)), /The "from" prop of a sequence must be an integer, but got 0.1./);
        });
    });
    test('It should throw for invalid layout value', () => {
        (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)(
        // @ts-expect-error
        (0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { from: 0, durationInFrames: 100, layout: 'invalid-value' }, void 0)), /The layout prop of <Sequence \/> expects either "absolute-fill" or "none", but you passed: invalid-value/);
    });
});
describe('Composition-validation render should NOT throw with valid props', () => {
    test('It should allow null as children', () => {
        expect(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { durationInFrames: 100, from: 0, children: null }, void 0))).not.toThrow();
    });
    test('It should allow undefined as children', () => {
        expect(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { durationInFrames: 100, from: 0, children: undefined }, void 0))).not.toThrow();
    });
});
