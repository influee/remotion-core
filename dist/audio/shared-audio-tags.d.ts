import React from 'react';
import { RemotionAudioProps } from './props';
/**
 * This functionality of Remotion will keep a certain amount
 * of <audio> tags pre-mounted and by default filled with an empty audio track.
 * If the user interacts, the empty audio will be played.
 * If one of Remotions <Audio /> tags get mounted, the audio will not be rendered at this location, but into one of the prerendered audio tags.
 *
 * This helps with autoplay issues on iOS Safari and soon other browsers,
 * which only allow audio playback upon user interaction.
 *
 * The behavior can be disabled by passing `0` as the number of shared audio tracks.
 */
declare type AudioElem = {
    id: number;
    props: RemotionAudioProps;
    el: React.RefObject<HTMLAudioElement>;
};
declare type SharedContext = {
    registerAudio: (aud: RemotionAudioProps) => AudioElem;
    unregisterAudio: (id: number) => void;
    updateAudio: (id: number, aud: RemotionAudioProps) => void;
    playAllAudios: () => void;
    numberOfAudioTags: number;
};
export declare const SharedAudioContext: React.Context<SharedContext | null>;
export declare const SharedAudioContextProvider: React.FC<{
    numberOfAudioTags: number;
    children: React.ReactNode;
}>;
export declare const useSharedAudio: (aud: RemotionAudioProps) => AudioElem;
export {};
