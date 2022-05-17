"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const freeze_1 = require("../freeze");
const index_1 = require("../index");
const timeline_position_state_1 = require("../timeline-position-state");
const use_frame_1 = require("../use-frame");
const expect_to_throw_1 = require("./expect-to-throw");
describe('Prop validation', () => {
    test('It should throw if Freeze has string as frame prop value', () => {
        (0, expect_to_throw_1.expectToThrow)(
        // @ts-expect-error
        () => (0, react_1.render)((0, jsx_runtime_1.jsx)(freeze_1.Freeze, { frame: '0' }, void 0)), /The 'frame' prop of <Freeze \/> must be a number, but is of type string/);
    });
    test('It should throw if Freeze has undefined as frame prop value', () => {
        (0, expect_to_throw_1.expectToThrow)(
        // @ts-expect-error
        () => (0, react_1.render)((0, jsx_runtime_1.jsx)(freeze_1.Freeze, {}, void 0)), /The <Freeze \/> component requires a 'frame' prop, but none was passed./);
    });
});
const timelineCtxValue = (frame) => ({
    rootId: '',
    frame,
    playing: false,
    imperativePlaying: {
        current: false,
    },
    playbackRate: 1,
    setPlaybackRate: () => {
        throw new Error('playback rate');
    },
    audioAndVideoTags: { current: [] },
});
const renderForFrame = (frame, markup) => {
    return (0, react_1.render)((0, jsx_runtime_1.jsx)(timeline_position_state_1.TimelineContext.Provider, { value: timelineCtxValue(frame), children: markup }, void 0));
};
const Basic = () => {
    return ((0, jsx_runtime_1.jsx)(freeze_1.Freeze, { frame: 300, children: (0, jsx_runtime_1.jsx)(TestComponent, {}, void 0) }, void 0));
};
const WithSequence = () => {
    const SequenceFrom = 200;
    const FreezeFrame = 100;
    return ((0, jsx_runtime_1.jsx)(index_1.Sequence, { from: SequenceFrom, layout: "none", children: (0, jsx_runtime_1.jsx)(freeze_1.Freeze, { frame: FreezeFrame, children: (0, jsx_runtime_1.jsx)(TestComponent, {}, void 0) }, void 0) }, void 0));
};
const TestComponent = () => {
    const frame = (0, use_frame_1.useCurrentFrame)();
    return (0, jsx_runtime_1.jsx)("div", { children: frame }, void 0);
};
describe('Integration tests', () => {
    test('Basic test', () => {
        const { container } = renderForFrame(0, (0, jsx_runtime_1.jsx)(Basic, {}, void 0));
        expect(container.innerHTML).toBe('<div>300</div>');
    });
    test('Should ignore a Sequence', () => {
        const { container } = renderForFrame(300, (0, jsx_runtime_1.jsx)(WithSequence, {}, void 0));
        expect(container.innerHTML).toBe('<div>100</div>');
    });
});
