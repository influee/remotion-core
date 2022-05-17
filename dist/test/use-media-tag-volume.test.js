"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const use_media_tag_volume_1 = require("../use-media-tag-volume");
const render_hook_1 = require("./render-hook");
describe('Should update state when volume changes', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(react_1.default, 'useState');
    beforeEach(() => {
        // @ts-expect-error
        useStateSpy.mockImplementation((init) => [init, setState]);
    });
    afterEach(() => {
        useStateSpy.mockRestore();
    });
    test('has the volume been set', () => {
        const addEventListener = jest.fn();
        const removeEventListener = jest.fn();
        let audioRef = {
            current: { volume: 0.5, addEventListener, removeEventListener },
        };
        const { rerender } = (0, render_hook_1.renderHook)(({ mediaRef }) => (0, use_media_tag_volume_1.useMediaTagVolume)(mediaRef), {
            initialProps: { mediaRef: audioRef },
        });
        expect(setState).toHaveBeenCalledWith(0.5);
        audioRef = {
            current: { ...audioRef.current, volume: 0.75 },
        };
        rerender({ mediaRef: audioRef });
        expect(setState).toHaveBeenCalledWith(0.75);
        expect(addEventListener).toHaveBeenCalledWith('volumechange', expect.anything());
        expect(removeEventListener).toHaveBeenCalledWith('volumechange', expect.anything());
    });
});
test('Should listen for volume changes', () => {
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();
    const audioRef = {
        current: { volume: 0.5, addEventListener, removeEventListener },
    };
    (0, render_hook_1.renderHook)(({ mediaRef }) => (0, use_media_tag_volume_1.useMediaTagVolume)(mediaRef), {
        initialProps: { mediaRef: audioRef },
    });
    expect(addEventListener).toHaveBeenCalledTimes(1);
});
