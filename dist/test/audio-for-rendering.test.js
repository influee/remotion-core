"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const AudioForRendering_1 = require("../audio/AudioForRendering");
const internals_1 = require("../internals");
const expect_to_throw_1 = require("./expect-to-throw");
let mockContext;
describe('Register and unregister asset', () => {
    function createMockContext() {
        const registerAsset = jest.fn();
        const unregisterAsset = jest.fn();
        const MockProvider = ({ children }) => {
            return ((0, jsx_runtime_1.jsx)(internals_1.Internals.CompositionManager.Provider, { value: 
                // eslint-disable-next-line react/jsx-no-constructed-context-values
                {
                    registerAsset,
                    unregisterAsset,
                }, children: children }, void 0));
        };
        return {
            MockProvider,
            registerAsset,
            unregisterAsset,
        };
    }
    beforeEach(() => {
        mockContext = createMockContext();
    });
    test('register and unregister asset', () => {
        const props = {
            src: 'test',
            muted: false,
            volume: 50,
        };
        const { unmount } = (0, react_1.render)((0, jsx_runtime_1.jsx)(mockContext.MockProvider, { children: (0, jsx_runtime_1.jsx)(AudioForRendering_1.AudioForRendering, { ...props }, void 0) }, void 0));
        expect(mockContext.registerAsset).toHaveBeenCalled();
        unmount();
        expect(mockContext.unregisterAsset).toHaveBeenCalled();
    });
    test('no src passed', () => {
        const props = {
            src: undefined,
            muted: false,
            volume: 50,
        };
        (0, expect_to_throw_1.expectToThrow)(() => {
            (0, react_1.render)((0, jsx_runtime_1.jsx)(mockContext.MockProvider, { children: (0, jsx_runtime_1.jsx)(AudioForRendering_1.AudioForRendering, { ...props }, void 0) }, void 0));
        }, /No src passed/);
        expect(mockContext.registerAsset).not.toHaveBeenCalled();
        expect(mockContext.unregisterAsset).not.toHaveBeenCalled();
    });
});
let mockUseEffect;
describe('useEffect tests', () => {
    const useEffectSpy = jest.spyOn(react_2.default, 'useEffect');
    mockUseEffect = jest.fn();
    beforeAll(() => {
        useEffectSpy.mockImplementation(() => {
            mockUseEffect();
        });
    });
    afterAll(() => {
        useEffectSpy.mockRestore();
    });
    test('has registered', () => {
        const props = {
            src: 'test',
            muted: false,
            volume: 50,
        };
        (0, react_1.render)((0, jsx_runtime_1.jsx)(AudioForRendering_1.AudioForRendering, { ...props }, void 0));
        expect(mockUseEffect).toHaveBeenCalled();
    });
});
