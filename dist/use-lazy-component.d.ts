import React, { ComponentPropsWithRef, ComponentType, ExoticComponent } from 'react';
import { CompProps } from './internals';
declare type LazyExoticComponent<T extends ComponentType<any>> = ExoticComponent<ComponentPropsWithRef<T>> & {
    readonly _result: T;
};
export declare const useLazyComponent: <T>(compProps: CompProps<T>) => LazyExoticComponent<React.ComponentType<T>>;
export {};
