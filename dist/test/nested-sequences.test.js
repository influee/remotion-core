"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable react/jsx-no-constructed-context-values */
const react_1 = require("@testing-library/react");
const sequencing_1 = require("../sequencing");
const timeline_position_state_1 = require("../timeline-position-state");
const use_frame_1 = require("../use-frame");
test('It should calculate the correct offset in nested sequences', () => {
    const NestedChild = () => {
        const frame = (0, use_frame_1.useCurrentFrame)();
        return (0, jsx_runtime_1.jsx)("div", { children: 'frame' + frame }, void 0);
    };
    const Child = () => {
        return ((0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { from: 10, durationInFrames: 50, children: (0, jsx_runtime_1.jsx)(Child2, {}, void 0) }, void 0));
    };
    const Child2 = () => {
        return ((0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { from: 1, durationInFrames: 50, children: (0, jsx_runtime_1.jsx)(NestedChild, {}, void 0) }, void 0));
    };
    const { queryByText } = (0, react_1.render)((0, jsx_runtime_1.jsx)(timeline_position_state_1.TimelineContext.Provider, { value: {
            rootId: 'hi',
            frame: 40,
            playing: false,
            imperativePlaying: {
                current: false,
            },
            playbackRate: 1,
            setPlaybackRate: () => {
                throw new Error('playback rate');
            },
            audioAndVideoTags: {
                current: [],
            },
        }, children: (0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { from: 20, durationInFrames: 100, children: (0, jsx_runtime_1.jsx)(Child, {}, void 0) }, void 0) }, void 0));
    expect(queryByText(/^frame9$/i)).not.toBe(null);
});
test('Negative offset test', () => {
    const NestedChild = () => {
        const frame = (0, use_frame_1.useCurrentFrame)();
        return (0, jsx_runtime_1.jsx)("div", { children: 'frame' + frame }, void 0);
    };
    const { queryByText } = (0, react_1.render)((0, jsx_runtime_1.jsx)(timeline_position_state_1.TimelineContext.Provider, { value: {
            frame: 40,
            playing: false,
            rootId: 'hi',
            imperativePlaying: {
                current: false,
            },
            playbackRate: 1,
            setPlaybackRate: () => {
                throw new Error('playback rate');
            },
            audioAndVideoTags: {
                current: [],
            },
        }, children: (0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { from: -200, durationInFrames: 300, children: (0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { from: 10, durationInFrames: 300, children: (0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { from: 10, durationInFrames: 300, children: (0, jsx_runtime_1.jsx)(NestedChild, {}, void 0) }, void 0) }, void 0) }, void 0) }, void 0));
    const result = queryByText(/^frame220/i);
    expect(result).not.toBe(null);
});
test('Nested negative offset test', () => {
    const NestedChild = () => {
        const frame = (0, use_frame_1.useCurrentFrame)();
        return (0, jsx_runtime_1.jsx)("div", { children: 'frame' + frame }, void 0);
    };
    const startFrom = 40;
    const endAt = 90;
    const content = ((0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { from: 0 - startFrom, durationInFrames: endAt, children: (0, jsx_runtime_1.jsx)(NestedChild, {}, void 0) }, void 0));
    const getForFrame = (frame) => {
        const { queryByText } = (0, react_1.render)((0, jsx_runtime_1.jsx)(timeline_position_state_1.TimelineContext.Provider, { value: {
                frame,
                playing: false,
                rootId: 'hi',
                imperativePlaying: {
                    current: false,
                },
                playbackRate: 1,
                setPlaybackRate: () => {
                    throw new Error('playback rate');
                },
                audioAndVideoTags: {
                    current: [],
                },
            }, children: content }, void 0));
        return queryByText;
    };
    const frame0 = getForFrame(0);
    expect(frame0(/^frame40$/i)).not.toBe(null);
    const frame39 = getForFrame(39);
    expect(frame39(/^frame79$/i)).not.toBe(null);
    const frame50 = getForFrame(50);
    expect(frame50(/^frame90$/i)).toBe(null);
});
test('Negative offset edge case', () => {
    const NestedChild = () => {
        const frame = (0, use_frame_1.useCurrentFrame)();
        return (0, jsx_runtime_1.jsx)("div", { children: 'frame' + frame }, void 0);
    };
    const startFrom = 40;
    const endAt = 90;
    const content = ((0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { from: 40, children: (0, jsx_runtime_1.jsx)(sequencing_1.Sequence, { from: 0 - startFrom, durationInFrames: endAt, children: (0, jsx_runtime_1.jsx)(NestedChild, {}, void 0) }, void 0) }, void 0));
    const getForFrame = (frame) => {
        const { queryByText } = (0, react_1.render)((0, jsx_runtime_1.jsx)(timeline_position_state_1.TimelineContext.Provider, { value: {
                frame,
                playing: false,
                rootId: 'hi',
                imperativePlaying: {
                    current: false,
                },
                playbackRate: 1,
                setPlaybackRate: () => {
                    throw new Error('playback rate');
                },
                audioAndVideoTags: {
                    current: [],
                },
            }, children: content }, void 0));
        return queryByText;
    };
    expect(getForFrame(0)(/^frame/i)).toBe(null);
    expect(getForFrame(10)(/^frame/i)).toBe(null);
    expect(getForFrame(40)(/^frame40$/i)).not.toBe(null);
    const atFrame80 = getForFrame(80)(/^frame80$/i);
    expect(atFrame80).not.toBe(null);
    const atFrame90 = getForFrame(90)(/^frame90$/i);
    expect(atFrame90).toBe(null);
});
