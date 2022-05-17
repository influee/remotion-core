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
exports.RemotionContextProvider = exports.useRemotionContexts = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
// This is used for when other reconcilers are being used
// such as in React Three Fiber. All the contexts need to be passed again
// for them to be useable
const react_1 = __importStar(require("react"));
const CompositionManager_1 = require("./CompositionManager");
const nonce_1 = require("./nonce");
const sequencing_1 = require("./sequencing");
const timeline_position_state_1 = require("./timeline-position-state");
function useRemotionContexts() {
    const compositionManagerCtx = react_1.default.useContext(CompositionManager_1.CompositionManager);
    const timelineContext = react_1.default.useContext(timeline_position_state_1.TimelineContext);
    const setTimelineContext = react_1.default.useContext(timeline_position_state_1.SetTimelineContext);
    const sequenceContext = react_1.default.useContext(sequencing_1.SequenceContext);
    const nonceContext = react_1.default.useContext(nonce_1.NonceContext);
    return (0, react_1.useMemo)(() => ({
        compositionManagerCtx,
        timelineContext,
        setTimelineContext,
        sequenceContext,
        nonceContext,
    }), [
        compositionManagerCtx,
        nonceContext,
        sequenceContext,
        setTimelineContext,
        timelineContext,
    ]);
}
exports.useRemotionContexts = useRemotionContexts;
const RemotionContextProvider = (props) => {
    const { children, contexts } = props;
    return ((0, jsx_runtime_1.jsx)(nonce_1.NonceContext.Provider, { value: contexts.nonceContext, children: (0, jsx_runtime_1.jsx)(CompositionManager_1.CompositionManager.Provider, { value: contexts.compositionManagerCtx, children: (0, jsx_runtime_1.jsx)(timeline_position_state_1.TimelineContext.Provider, { value: contexts.timelineContext, children: (0, jsx_runtime_1.jsx)(timeline_position_state_1.SetTimelineContext.Provider, { value: contexts.setTimelineContext, children: (0, jsx_runtime_1.jsx)(sequencing_1.SequenceContext.Provider, { value: contexts.sequenceContext, children: children }, void 0) }, void 0) }, void 0) }, void 0) }, void 0));
};
exports.RemotionContextProvider = RemotionContextProvider;
