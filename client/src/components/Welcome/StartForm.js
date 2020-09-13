import React, { useState } from 'react';
import styled from 'styled-components';
import { Label, Input, Button, Card } from '../common';
import { Container, Row, Col, Hidden } from 'react-grid-system';
import { Visible } from 'react-grid-system';
import { colors } from '../../config/colors';

function CustomForm(props) {
	const { onSubmit, buttonLabel, header } = props;
	return (
		<form>
			<Card padding='20px'>
				<Header>{header}</Header>
				{props.children}
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Button
						type='submit'
						style={{ alignSelf: 'center', marginTop: '30px' }}
						onClick={onSubmit}
						secondary
					>
						{buttonLabel}
					</Button>
				</div>
			</Card>
		</form>
	);
}

const Forms = (props) => {
	const [hostDisplayName, setHostDisplayName] = useState('');
	const [joinDisplayName, setJoinDisplayName] = useState('');

	const _onHost = (e) => {
		e.preventDefault();
		props.onHost(hostDisplayName);
	};

	return (
		<React.Fragment>
			<Col md={3}>
				<CustomForm
					buttonLabel='Host'
					header='Start a party!'
					onSubmit={_onHost}
				>
					<Controls>
						<Label htmlFor='username1'>Display Name</Label>
						<Input
							type='text'
							name='username1'
							value={hostDisplayName}
							onChange={(e) => setHostDisplayName(e.target.value)}
							id='name1'
							placeholder='Display Name'
							required
						/>
					</Controls>
					<Controls>
						<Label htmlFor='url'>Youtube URL</Label>
						<Input
							type='text'
							name='url'
							id='url'
							placeholder='Youtube URL or Join ID'
						/>
					</Controls>
				</CustomForm>
			</Col>
			<Col md={2} align='center'>
				<BigHeader>...Or...</BigHeader>
			</Col>
			<Col md={3}>
				<CustomForm buttonLabel='Join' header='Join existing one!'>
					<Controls>
						<Label htmlFor='username2'>Display Name</Label>
						<Input
							type='text'
							name='username2'
							value={props.username}
							onChange={props.onChange}
							id='name2'
							placeholder='Display Name'
							required
						/>
					</Controls>
					<Controls>
						<Label htmlFor='url'>Room ID</Label>
						<Input
							type='text'
							name='url'
							id='url'
							placeholder='Youtube URL or Join ID'
						/>
					</Controls>
				</CustomForm>
			</Col>
		</React.Fragment>
	);
};

const Controls = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	margin: 15px 0;
`;

const Header = styled.h1`
	margin: 0;
	padding: 0;
	font-weight: 500;
	margin-bottom: 50px;
	font-size: 2em;
	text-align: center;
`;

const BigHeader = styled.h1`
	font-weight: 300;
	font-size: 2.8em;
	margin-top: -50px;
`;

export default Forms;
