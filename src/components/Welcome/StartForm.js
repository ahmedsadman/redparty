import React from 'react';
import styled from 'styled-components';
import { Label, Input, Button } from '../common';
import { Container, Row, Col, Visible } from 'react-grid-system';

const Form = (props) => (
	<React.Fragment>
		<Visible xs>
			<div style={{ height: '50px' }}></div>
		</Visible>
		<Tabs>
			<Tab style={{ borderRight: '1px solid #ddd' }}>Host</Tab>
			<Tab>Join</Tab>
		</Tabs>
		<Controls>
			<Label htmlFor='username'>Display Name</Label>
			<Input
				type='text'
				name='username'
				value={props.username}
				onChange={props.onChange}
				id='name'
				placeholder='Display Name'
			/>
		</Controls>
		<Controls>
			<Label htmlFor='url'>Youtube URL/Join ID</Label>
			<Input
				type='text'
				name='url'
				id='url'
				placeholder='Youtube URL or Join ID'
			/>
		</Controls>
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<Button style={{ alignSelf: 'center' }}>Host</Button>
		</div>
	</React.Fragment>
);

const Controls = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	margin: 15px 0;
`;

const Tabs = styled.div`
	display: flex;
	flex: 1;
	justify-content: space-between;
	cursor: pointer;
`;

const Tab = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	border-bottom: 1px solid #ddd;
	padding: 5px 0 6px 0;
`;

export default Form;
