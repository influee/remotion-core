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
const internals_1 = require("../internals");
const video_1 = require("../video");
const expect_to_throw_1 = require("./expect-to-throw");
const Wrapper = ({ children }) => {
    const compositions = (0, react_2.useContext)(internals_1.Internals.CompositionManager);
    return ((0, jsx_runtime_1.jsx)(internals_1.Internals.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(internals_1.Internals.CompositionManager.Provider
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
describe('Render correctly with props', () => {
    test('It should render Video without startFrom / endAt props', () => {
        expect(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(video_1.Video, { src: "test" }, void 0) }, void 0))).not.toThrow();
    });
    test('It should render Video with startFrom props', () => {
        expect(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(video_1.Video, { src: "test", startFrom: 10 }, void 0) }, void 0))).not.toThrow();
    });
    test('It should render Video with endAt props', () => {
        expect(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(video_1.Video, { src: "test", endAt: 10 }, void 0) }, void 0))).not.toThrow();
    });
    test('It should render Video with startFrom and endAt props', () => {
        expect(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsx)(video_1.Video, { src: "test", startFrom: 10, endAt: 15 }, void 0) }, void 0))).not.toThrow();
    });
    test('It should throw if videoConfig/Wrapper is missing', () => {
        (0, expect_to_throw_1.expectToThrow)(() => (0, react_1.render)((0, jsx_runtime_1.jsx)(video_1.Video, { startFrom: 10, endAt: 15 }, void 0)), /No video config found/);
    });
});
