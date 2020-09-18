import React from 'react';
import { UserContextProvider } from './contexts/UserContext';
import { SignalContextProvider } from './contexts/SignalContext';
import Routes from './Routes';

function App() {
	return (
		<UserContextProvider>
			<SignalContextProvider>
				<Routes />
			</SignalContextProvider>
		</UserContextProvider>
	);
}

export default App;
