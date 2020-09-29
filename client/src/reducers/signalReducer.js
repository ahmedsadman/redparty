export const signalReducer = (state, action) => {
	switch (action.type) {
		case 'SET_TRANSITION':
			return {
				...state,
				transition: action.transition,
			};
		case 'PLAY_VIDEO':
			return {
				...state,
				playVideo: Math.round(action.currentTime),
			};
		case 'PAUSE_VIDEO':
			return {
				...state,
				pauseVideo: action.timestamp,
			};
		case 'VIDEO_CHANGING':
			return {
				...state,
				videoChanging: action.videoChanging,
			};
		case 'RESET_SIGNAL_STATE':
			return {
				...state,
				playVideo: null,
				pauseVideo: null,
			};
		default:
			break;
	}
};
