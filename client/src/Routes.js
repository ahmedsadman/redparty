import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Visible } from 'react-grid-system';
import Room from './components/Room/Room';
import Welcome from './components/Welcome/Welcome';
import Footer from './components/common/Footer';

function Routes() {
	return (
		<Router>
			<div style={{ minHeight: '100%' }}>
				<Switch>
					<Route path='/' component={Welcome} exact />
					<Route path='/room/:id' component={Room} exact />
				</Switch>
				<Visible xs>
					{/* Sticky footer Overlap fix for smaller screens */}
					<div style={{ marginBottom: '60px' }}></div>
				</Visible>
			</div>
			<Footer />
		</Router>
	);
}

export default Routes;
