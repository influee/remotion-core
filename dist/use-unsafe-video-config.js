"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUnsafeVideoConfig = void 0;
const react_1 = require("react");
const sequencing_1 = require("./sequencing");
const use_video_1 = require("./use-video");
const useUnsafeVideoConfig = () => {
    var _a;
    const context = (0, react_1.useContext)(sequencing_1.SequenceContext);
    const ctxDuration = (_a = context === null || context === void 0 ? void 0 : context.durationInFrames) !== null && _a !== void 0 ? _a : null;
    const video = (0, use_video_1.useVideo)();
    return (0, react_1.useMemo)(() => {
        if (!video) {
            return null;
        }
        const { id, durationInFrames, fps, height, width, defaultProps } = video;
        return {
            id,
            width,
            height,
            fps,
            durationInFrames: ctxDuration !== null && ctxDuration !== void 0 ? ctxDuration : durationInFrames,
            defaultProps,
        };
    }, [ctxDuration, video]);
};
exports.useUnsafeVideoConfig = useUnsafeVideoConfig;
