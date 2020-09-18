import React from 'react';
import { UserContextProvider } from './contexts/UserContext';
import Routes from './Routes';

function App() {
	return (
		<UserContextProvider>
			<Routes />
		</UserContextProvider>
	);
}

export default App;
