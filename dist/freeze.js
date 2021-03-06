"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Freeze = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const sequencing_1 = require("./sequencing");
const timeline_position_state_1 = require("./timeline-position-state");
const Freeze = ({ frame, children }) => {
    if (typeof frame === 'undefined') {
        throw new Error(`The <Freeze /> component requires a 'frame' prop, but none was passed.`);
    }
    if (typeof frame !== 'number') {
        throw new Error(`The 'frame' prop of <Freeze /> must be a number, but is of type ${typeof frame}`);
    }
    if (Number.isNaN(frame)) {
        throw new Error(`The 'frame' prop of <Freeze /> must be a real number, but it is NaN.`);
    }
    if (!Number.isFinite(frame)) {
        throw new Error(`The 'frame' prop of <Freeze /> must be a finite number, but it is ${frame}.`);
    }
    const context = (0, react_1.useContext)(timeline_position_state_1.TimelineContext);
    const value = (0, react_1.useMemo)(() => {
        return {
            ...context,
            playing: false,
            imperativePlaying: {
                current: false,
            },
            frame,
        };
    }, [context, frame]);
    return ((0, jsx_runtime_1.jsx)(timeline_position_state_1.TimelineContext.Provider, { value: value, children: (0, jsx_runtime_1.jsx)(sequencing_1.SequenceContext.Provider, { value: null, children: children }, void 0) }, void 0));
};
exports.Freeze = Freeze;
