"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const react_2 = __importStar(require("react"));
const __1 = require("..");
const loop_1 = require("../loop");
const expect_to_throw_1 = require("./expect-to-throw");
const Wrapper = ({ children }) => {
    const compositions = (0, react_2.useContext)(__1.Internals.CompositionManager);
    return ((0, jsx_runtime_1.jsx)(__1.Internals.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(__1.Internals.CompositionManager.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        , { 
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value: {
                ...compositions,
                compositions: [
                    {
                        height: 1080,
                        width: 1080,
                        fps: 30,
                        durationInFrames: 30,
                        id: 'markup',
                        nonce: 0,
                        component: react_2.default.lazy(() => Promise.resolve({
                            default: (() => null),
                        })),
                        defaultProps: undefined,
                        folderName: null,
                        parentFolderName: null,
                    },
                ],
                currentComposition: 'markup',
            }, children: children }, void 0) }, void 0));
};
describe('Loop-validation render should throw with invalid props', () => {
    describe('Throw with invalid durationInFrames prop', () => {
        test('It should throw if Loop has non-number durationInFrames', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(loop_1.Loop, { durationInFrames: '1', children: "hi" }, void 0) }, void 0)), /The "durationInFrames" prop of the <Loop \/> component must be a number, but you passed a value of type string/);
        });
        test('It should throw if Loop has non-integer durationInFrames', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(loop_1.Loop, { durationInFrames: 1.1, children: "hi" }, void 0) }, void 0)), /The "durationInFrames" prop of the <Loop \/> component must be an integer, but got 1.1./);
        });
        test('It should throw if Loop has a negative duration', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(loop_1.Loop, { durationInFrames: -1, children: "hi" }, void 0) }, void 0)), /The "durationInFrames" prop of the <Loop \/> component must be positive, but got -1./);
        });
    });
    describe('Throw with invalid times prop', () => {
        test('It should throw if Loop has non-number times', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(loop_1.Loop, { durationInFrames: 50, times: "1", children: "hi" }, void 0) }, void 0)), /You passed to "times" an argument of type string, but it must be a number./);
        });
        test('It should throw if Loop has non-integer times', () => {
            (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(loop_1.Loop, { durationInFrames: 50, times: 1.1, children: "hi" }, void 0) }, void 0)), /The "times" prop of a loop must be an integer, but got 1.1./);
        });
    });
});
describe('Should NOT throw with valid props', () => {
    test('It should allow null as children', () => {
        expect(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(loop_1.Loop, { durationInFrames: 50, children: null }, void 0) }, void 0))).not.toThrow();
    });
    test('It should allow undefined as children', () => {
        expect(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(loop_1.Loop, { durationInFrames: 50, children: undefined }, void 0) }, void 0))).not.toThrow();
    });
});
