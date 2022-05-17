"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomFfmpegExecutable = exports.setFfmpegExecutable = void 0;
let currentFfmpegExecutablePath = null;
const setFfmpegExecutable = (ffmpegPath) => {
    currentFfmpegExecutablePath = ffmpegPath;
};
exports.setFfmpegExecutable = setFfmpegExecutable;
const getCustomFfmpegExecutable = () => {
    return currentFfmpegExecutablePath;
};
exports.getCustomFfmpegExecutable = getCustomFfmpegExecutable;
