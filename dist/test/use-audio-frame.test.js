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
const useAudioFrameModule = __importStar(require("../audio/use-audio-frame"));
const use_audio_frame_1 = require("../audio/use-audio-frame");
const sequencing_1 = require("../sequencing");
const useFrameModule = __importStar(require("../use-frame"));
const render_hook_1 = require("./render-hook");
test('Media starts at 0 if it is outside a sequence', () => {
    const wrapper = ({ children }) => ((0, jsx_runtime_1.jsx)(sequencing_1.SequenceContext.Provider, { value: null, children: children }, void 0));
    const { result } = (0, render_hook_1.renderHook)(() => (0, use_audio_frame_1.useMediaStartsAt)(), { wrapper });
    expect(result.current).toEqual(0);
});
test('Media start is shifted back based on sequence', () => {
    const mockSequence = {
        cumulatedFrom: 0,
        relativeFrom: -100,
        parentFrom: 0,
        durationInFrames: 0,
        id: 'mock',
    };
    const wrapper = ({ children }) => ((0, jsx_runtime_1.jsx)(sequencing_1.SequenceContext.Provider, { value: mockSequence, children: children }, void 0));
    const { result } = (0, render_hook_1.renderHook)(() => (0, use_audio_frame_1.useMediaStartsAt)(), { wrapper });
    expect(result.current).toEqual(-100);
});
describe('useFrameForVolumeProp hook tests', () => {
    beforeAll(() => {
        jest
            .spyOn(useAudioFrameModule, 'useMediaStartsAt')
            .mockImplementation(() => -10);
    });
    afterAll(() => {
        jest.spyOn(useAudioFrameModule, 'useMediaStartsAt').mockRestore();
    });
    test('Media not mounted', () => {
        jest.spyOn(useFrameModule, 'useCurrentFrame').mockImplementation(() => 9);
        const { result } = (0, render_hook_1.renderHook)(() => (0, use_audio_frame_1.useFrameForVolumeProp)());
        expect(result.current).toEqual(-1);
    });
    test('Media mounted', () => {
        jest.spyOn(useFrameModule, 'useCurrentFrame').mockImplementation(() => 10);
        const { result } = (0, render_hook_1.renderHook)(() => (0, use_audio_frame_1.useFrameForVolumeProp)());
        expect(result.current).toEqual(0);
    });
    test('Media mounted + 1 frame', () => {
        jest.spyOn(useFrameModule, 'useCurrentFrame').mockImplementation(() => 11);
        const { result } = (0, render_hook_1.renderHook)(() => (0, use_audio_frame_1.useFrameForVolumeProp)());
        expect(result.current).toEqual(1);
    });
});
