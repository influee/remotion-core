import {useContext, useMemo} from 'react';
import {SequenceContext} from './sequencing';
import {useVideo} from './use-video';
import {VideoConfig} from './video-config';

export const useUnsafeVideoConfig = (): VideoConfig | null => {
	const context = useContext(SequenceContext);
	const ctxDuration = context?.durationInFrames ?? null;
	const video = useVideo();

	return useMemo(() => {
		if (!video) {
			return null;
		}

		const {id, durationInFrames, fps, height, width, defaultProps} = video;

		return {
			id,
			width,
			height,
			fps,
			durationInFrames: ctxDuration ?? durationInFrames,
			defaultProps,
		};
	}, [ctxDuration, video]);
};
