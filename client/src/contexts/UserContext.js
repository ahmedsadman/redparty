import React, { createContext, useReducer, useEffect } from 'react';
import { userReducer } from '../reducers/userReducer';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
	const initialState = {
		userList: [],
		videoURL: '',
	};
	const [userData, dispatch] = useReducer(userReducer, initialState);

	return (
		<UserContext.Provider value={{ userData, dispatch }}>
			{props.children}
		</UserContext.Provider>
	);
};
