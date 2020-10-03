import React, { createContext, useReducer } from 'react';
import { userReducer } from '../reducers/userReducer';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
	const initialState = {
		userList: [],
		messages: [],
		videoId: '',
		username: '',
	};
	const [userData, dispatch] = useReducer(userReducer, initialState);

	return (
		<UserContext.Provider value={{ userData, dispatch }}>
			{props.children}
		</UserContext.Provider>
	);
};
