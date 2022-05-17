"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMediaPlayback = void 0;
const react_1 = require("react");
const use_audio_frame_1 = require("./audio/use-audio-frame");
const play_and_handle_not_allowed_error_1 = require("./play-and-handle-not-allowed-error");
const timeline_position_state_1 = require("./timeline-position-state");
const use_frame_1 = require("./use-frame");
const use_video_config_1 = require("./use-video-config");
const get_current_time_1 = require("./video/get-current-time");
const warn_about_non_seekable_media_1 = require("./warn-about-non-seekable-media");
const useMediaPlayback = ({ mediaRef, src, mediaType, playbackRate: localPlaybackRate, improvedSeeking, }) => {
    const { playbackRate: globalPlaybackRate } = (0, react_1.useContext)(timeline_position_state_1.TimelineContext);
    const frame = (0, use_frame_1.useCurrentFrame)();
    const absoluteFrame = (0, use_frame_1.useAbsoluteCurrentFrame)();
    const [playing] = (0, timeline_position_state_1.usePlayingState)();
    const { fps } = (0, use_video_config_1.useVideoConfig)();
    const mediaStartsAt = (0, use_audio_frame_1.useMediaStartsAt)();
    const playbackRate = localPlaybackRate * globalPlaybackRate;
    (0, react_1.useEffect)(() => {
        var _a;
        if (!playing) {
            (_a = mediaRef.current) === null || _a === void 0 ? void 0 : _a.pause();
        }
    }, [mediaRef, mediaType, playing]);
    (0, react_1.useEffect)(() => {
        const tagName = mediaType === 'audio' ? '<Audio>' : '<Video>';
        if (!mediaRef.current) {
            throw new Error(`No ${mediaType} ref found`);
        }
        if (!src) {
            throw new Error(`No 'src' attribute was passed to the ${tagName} element.`);
        }
        mediaRef.current.playbackRate = Math.max(0, playbackRate);
        const shouldBeTime = (0, get_current_time_1.getMediaTime)({
            fps,
            frame,
            src,
            playbackRate: localPlaybackRate,
            startFrom: -mediaStartsAt,
        });
        const isTime = mediaRef.current.currentTime;
        const timeShift = Math.abs(shouldBeTime - isTime);
        if (timeShift > 0.45 && !mediaRef.current.ended) {
            console.log('Time has shifted by', timeShift, 'sec. Fixing...', `(isTime=${isTime},shouldBeTime=${shouldBeTime})`);
            // If scrubbing around, adjust timing
            // or if time shift is bigger than 0.2sec
            mediaRef.current.currentTime = shouldBeTime;
            (0, warn_about_non_seekable_media_1.warnAboutNonSeekableMedia)(mediaRef.current);
        }
        else if (improvedSeeking &&
            frame + mediaStartsAt < 3 * fps - 10 &&
            timeShift > 0.001 &&
            !mediaRef.current.ended) {
            const multiplier = Math.max(0.5, Math.min(10, 1 +
                ((shouldBeTime - isTime) * fps) /
                    Math.max(1, Math.min(3 * fps, Math.abs(frame + mediaStartsAt - 80)))));
            mediaRef.current.playbackRate = Math.max(0, playbackRate * multiplier);
        }
        else if (mediaRef.current.playbackRate !== Math.max(0, playbackRate)) {
            mediaRef.current.playbackRate = Math.max(0, playbackRate);
        }
        if (!playing || absoluteFrame === 0) {
            mediaRef.current.currentTime = shouldBeTime;
        }
        if (mediaRef.current.paused && !mediaRef.current.ended && playing) {
            const { current } = mediaRef;
            current.currentTime = shouldBeTime;
            (0, play_and_handle_not_allowed_error_1.playAndHandleNotAllowedError)(mediaRef, mediaType);
        }
    }, [
        absoluteFrame,
        fps,
        playbackRate,
        frame,
        mediaRef,
        mediaType,
        playing,
        src,
        mediaStartsAt,
        localPlaybackRate,
    ]);
};
exports.useMediaPlayback = useMediaPlayback;
