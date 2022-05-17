import React from 'react';
export declare type SequenceContextType = {
    cumulatedFrom: number;
    relativeFrom: number;
    parentFrom: number;
    durationInFrames: number;
    id: string;
};
export declare const SequenceContext: React.Context<SequenceContextType | null>;
export declare type SequenceProps = {
    children: React.ReactNode;
    from: number;
    durationInFrames?: number;
    name?: string;
    layout?: 'absolute-fill' | 'none';
    showInTimeline?: boolean;
    showLoopTimesInTimeline?: number;
};
export declare const Sequence: React.FC<SequenceProps>;
