"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSyncVolumeWithMediaTag = void 0;
const react_1 = require("react");
const is_approximately_the_same_1 = require("./is-approximately-the-same");
const volume_prop_1 = require("./volume-prop");
const useSyncVolumeWithMediaTag = ({ volumePropFrame, actualVolume, volume, mediaVolume, mediaRef, }) => {
    (0, react_1.useEffect)(() => {
        const userPreferredVolume = (0, volume_prop_1.evaluateVolume)({
            frame: volumePropFrame,
            volume,
            mediaVolume,
        });
        if (!(0, is_approximately_the_same_1.isApproximatelyTheSame)(userPreferredVolume, actualVolume) &&
            mediaRef.current) {
            mediaRef.current.volume = userPreferredVolume;
        }
    }, [actualVolume, volumePropFrame, mediaRef, volume, mediaVolume]);
};
exports.useSyncVolumeWithMediaTag = useSyncVolumeWithMediaTag;
