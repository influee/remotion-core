"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playAndHandleNotAllowedError = void 0;
const playAndHandleNotAllowedError = (mediaRef, mediaType) => {
    const { current } = mediaRef;
    if (!current) {
        return;
    }
    const prom = current.play();
    if (prom.catch) {
        prom.catch((err) => {
            if (!current) {
                return;
            }
            // Pause was called after play in Chrome
            if (err.message.includes('request was interrupted by a call to pause')) {
                return;
            }
            // Pause was called after play in Safari
            if (err.message.includes('The operation was aborted.')) {
                return;
            }
            // Pause was called after play in Firefox
            if (err.message.includes('The fetching process for the media resource was aborted by the user agent')) {
                return;
            }
            // Got replaced by a different audio source in Chromium
            if (err.message.includes('request was interrupted by a new load request')) {
                return;
            }
            console.log(`Could not play ${mediaType} due to following error: `, err);
            if (!current.muted) {
                console.log(`The video will be muted and we'll retry playing it.`, err);
                current.muted = true;
                current.play();
            }
        });
    }
};
exports.playAndHandleNotAllowedError = playAndHandleNotAllowedError;
