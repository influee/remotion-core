import React, { ComponentType, FC } from 'react';
export declare const Folder: FC<{
    name: string;
    children: React.ReactNode;
}>;
declare type LooseComponentType<T> = ComponentType<T> | ((props: T) => React.ReactNode);
export declare type CompProps<T> = {
    lazyComponent: () => Promise<{
        default: LooseComponentType<T>;
    }>;
} | {
    component: LooseComponentType<T>;
};
export declare type StillProps<T> = {
    width: number;
    height: number;
    id: string;
    defaultProps?: T;
} & CompProps<T>;
declare type CompositionProps<T> = StillProps<T> & {
    fps: number;
    durationInFrames: number;
};
export declare const Composition: <T>({ width, height, fps, durationInFrames, id, defaultProps, ...compProps }: CompositionProps<T>) => null;
export {};
