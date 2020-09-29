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
