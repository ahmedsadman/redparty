import React, { createContext, useReducer } from 'react';
import { signalReducer } from '../reducers/signalReducer';

export const SignalContext = createContext();

/*
Provides mechanism to handle various server signal states. 
Like play video, pause video etc. Whenver one of these events are fired,
the global context data is updated which in turn fires different Video Player
related functions using useEffect(). 

For example, when PLAY_VIDEO event is trigerred, 'playVideo' will update with 
the value of the current video time. For PAUSE_VIDEO, it will hold UNIX timestamp
as we don't really need time to pause a video, we just want to update the state
to trigger useEffect() hooks
*/

export const SignalContextProvider = (props) => {
	const initialState = {
		playVideo: null, // hold video play time
		pauseVideo: null, // hold command timestamp

		// when transition is true, no player related socket event will
		// be emitted to the server. This prevents unintentional back and forth
		// event passing and provides consistency in video seek/pause.
		transition: false,
		videoChanging: false,
	};

	const [signalData, dispatch] = useReducer(signalReducer, initialState);

	return (
		<SignalContext.Provider value={{ signalData, dispatch }}>
			{props.children}
		</SignalContext.Provider>
	);
};
