"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable react/jsx-no-constructed-context-values */
const react_1 = require("@testing-library/react");
const index_1 = require("../index");
const timeline_position_state_1 = require("../timeline-position-state");
const use_frame_1 = require("../use-frame");
const expect_to_throw_1 = require("./expect-to-throw");
const First = () => {
    const frame = (0, use_frame_1.useCurrentFrame)();
    return (0, jsx_runtime_1.jsx)("div", { children: 'first ' + frame }, void 0);
};
const Second = () => {
    const frame = (0, use_frame_1.useCurrentFrame)();
    return (0, jsx_runtime_1.jsx)("div", { children: 'second ' + frame }, void 0);
};
const Third = () => {
    const frame = (0, use_frame_1.useCurrentFrame)();
    return (0, jsx_runtime_1.jsx)("div", { children: 'third ' + frame }, void 0);
};
const renderForFrame = (frame, markup) => {
    return (0, react_1.render)((0, jsx_runtime_1.jsx)(timeline_position_state_1.TimelineContext.Provider, { value: {
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
        }, children: markup }, void 0));
};
test('Basic series test', () => {
    const { queryByText } = renderForFrame(10, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(First, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Third, {}, void 0) }, void 0)] }, void 0));
    expect(queryByText(/^third\s0$/g)).not.toBe(null);
});
test('Should support fragments', () => {
    const { queryByText } = renderForFrame(10, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(First, {}, void 0) }, void 0), (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}, void 0) }, "0"), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Third, {}, void 0) }, "1")] }, void 0)] }, void 0));
    expect(queryByText(/^third\s0$/g)).not.toBe(null);
});
test('Should not allow foreign elements', () => {
    (0, expect_to_throw_1.expectToThrow)(() => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(First, {}, void 0) }, void 0));
    }, /only accepts a/);
});
test('Should allow layout prop', () => {
    const { container } = renderForFrame(0, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 1, children: (0, jsx_runtime_1.jsx)(First, {}, void 0) }, void 0) }, void 0));
    expect(container.outerHTML).toBe('<div><div style="position: absolute; display: flex; width: 100%; height: 100%; top: 0px; bottom: 0px; left: 0px; right: 0px;"><div>first 0</div></div></div>');
    const { container: withoutLayoutContainer } = renderForFrame(0, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 1, layout: "none", children: (0, jsx_runtime_1.jsx)(First, {}, void 0) }, void 0) }, void 0));
    expect(withoutLayoutContainer.outerHTML).toBe('<div><div>first 0</div></div>');
});
test('Should render nothing after the end', () => {
    const { container } = renderForFrame(10, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 1, children: (0, jsx_runtime_1.jsx)(First, {}, void 0) }, void 0) }, void 0));
    expect(container.outerHTML).toBe('<div></div>');
});
test('Should throw if invalid or no duration provided', () => {
    (0, expect_to_throw_1.expectToThrow)(() => {
        renderForFrame(10, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: NaN, children: (0, jsx_runtime_1.jsx)(First, {}, void 0) }, void 0) }, void 0));
    }, /The "durationInFrames" prop of a <Series.Sequence \/> component must be an integer, but got NaN./);
    (0, expect_to_throw_1.expectToThrow)(() => {
        renderForFrame(10, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { children: (0, jsx_runtime_1.jsx)(First, {}, void 0) }, void 0) }, void 0));
    }, /The "durationInFrames" prop of a <Series.Sequence \/> component must be a number, but you passed a value of type undefined/);
});
test('Should allow whitespace', () => {
    const { queryByText } = renderForFrame(11, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 10, children: (0, jsx_runtime_1.jsx)(First, {}, void 0) }, void 0), ' ', (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 10, children: (0, jsx_runtime_1.jsx)(Second, {}, void 0) }, void 0)] }, void 0));
    expect(queryByText(/^second\s1$/g)).not.toBe(null);
});
test('Handle empty Series.Sequence', () => {
    (0, expect_to_throw_1.expectToThrow)(() => renderForFrame(11, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 10, children: (0, jsx_runtime_1.jsx)(First, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 10 }, void 0)] }, void 0)), /A <Series.Sequence \/> component \(index = 1, duration = 10\) was detected to not have any children\. Delete it to fix this error\./);
});
test('Should allow negative overlap prop', () => {
    const { container } = renderForFrame(4, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, layout: "none", children: (0, jsx_runtime_1.jsx)(First, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { offset: -1, layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}, void 0) }, void 0)] }, void 0));
    expect(container.outerHTML).toBe('<div><div>first 4</div><div>second 0</div></div>');
});
test('Should allow positive overlap prop', () => {
    const { container } = renderForFrame(5, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, layout: "none", children: (0, jsx_runtime_1.jsx)(First, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { offset: 1, layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}, void 0) }, void 0)] }, void 0));
    expect(container.outerHTML).toBe('<div></div>');
});
test('Should disallow NaN as offset prop', () => {
    (0, expect_to_throw_1.expectToThrow)(() => {
        renderForFrame(9, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { offset: NaN, layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}, void 0) }, void 0) }, void 0));
    }, /The "offset" property of a <Series.Sequence \/> must not be NaN, but got NaN \(index = 0, duration = 5\)\./);
});
test('Should disallow Infinity as offset prop', () => {
    (0, expect_to_throw_1.expectToThrow)(() => {
        renderForFrame(9, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { offset: Infinity, layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}, void 0) }, void 0) }, void 0));
    }, /The "offset" property of a <Series.Sequence \/> must be finite, but got Infinity \(index = 0, duration = 5\)\./);
});
test('Should disallow non-integer numbers as offset prop', () => {
    (0, expect_to_throw_1.expectToThrow)(() => {
        renderForFrame(9, (0, jsx_runtime_1.jsx)(index_1.Series, { children: (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { offset: Math.PI, layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}, void 0) }, void 0) }, void 0));
    }, /The "offset" property of a <Series.Sequence \/> must be finite, but got 3.141592653589793 \(index = 0, duration = 5\)\./);
});
test('Should cascade negative offset props', () => {
    const { container } = renderForFrame(9, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, layout: "none", children: (0, jsx_runtime_1.jsx)(First, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { offset: -1, layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Third, {}, void 0) }, void 0)] }, void 0));
    expect(container.outerHTML).toBe('<div><div>third 0</div></div>');
});
test('Should cascade positive offset props', () => {
    const { container } = renderForFrame(11, (0, jsx_runtime_1.jsxs)(index_1.Series, { children: [(0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { durationInFrames: 5, layout: "none", children: (0, jsx_runtime_1.jsx)(First, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { offset: 1, layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Second, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(index_1.Series.Sequence, { layout: "none", durationInFrames: 5, children: (0, jsx_runtime_1.jsx)(Third, {}, void 0) }, void 0)] }, void 0));
    expect(container.outerHTML).toBe('<div><div>third 0</div></div>');
});
