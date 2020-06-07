import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Room from './containers/Room';
import Welcome from './containers/Welcome';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path='/' component={Welcome} exact />
					<Route path='/room/:id' component={Room} exact />
				</Switch>
			</Router>
		);
	}
}

export default App;
