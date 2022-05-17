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
const internals_1 = require("../internals");
const use_media_in_timeline_1 = require("../use-media-in-timeline");
const useVideoConfigModule = __importStar(require("../use-video-config"));
const render_hook_1 = require("./render-hook");
beforeAll(() => {
    jest.spyOn(useVideoConfigModule, 'useVideoConfig').mockImplementation(() => ({
        width: 10,
        height: 10,
        fps: 30,
        durationInFrames: 100,
        id: 'hithere',
        defaultProps: () => ({}),
    }));
});
afterAll(() => {
    jest.spyOn(useVideoConfigModule, 'useVideoConfig').mockClear();
});
test('useMediaInTimeline registers and unregisters new sequence', () => {
    const registerSequence = jest.fn();
    const unregisterSequence = jest.fn();
    const wrapper = ({ children }) => ((0, jsx_runtime_1.jsx)(internals_1.Internals.CompositionManager.Provider, { value: 
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        {
            registerSequence,
            unregisterSequence,
        }, children: children }, void 0));
    const audioRef = {
        current: { volume: 0.5 },
    };
    const { unmount } = (0, render_hook_1.renderHook)(() => (0, use_media_in_timeline_1.useMediaInTimeline)({
        volume: 1,
        src: 'test',
        mediaVolume: 1,
        mediaType: 'audio',
        mediaRef: audioRef,
    }), {
        wrapper,
    });
    expect(registerSequence).toHaveBeenCalled();
    unmount();
    expect(unregisterSequence).toHaveBeenCalled();
});
