import { RefObject } from 'react';
export declare const useMediaPlayback: ({ mediaRef, src, mediaType, playbackRate: localPlaybackRate, improvedSeeking, }: {
    mediaRef: RefObject<HTMLVideoElement | HTMLAudioElement>;
    src: string | undefined;
    mediaType: 'audio' | 'video';
    playbackRate: number;
    improvedSeeking?: boolean | undefined;
}) => void;
