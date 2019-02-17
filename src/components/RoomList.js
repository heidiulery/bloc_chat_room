import React, { Component } from 'react';
import '../index.css';

class RoomList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rooms: [],
			name: '',
			isHidden: true
		};

		this.roomsRef = this.props.firebase.database().ref('rooms');
		this.handleChange = this.handleChange.bind(this);
    	this.createRoom = this.createRoom.bind(this);
		this.toggleHidden = this.toggleHidden.bind(this);
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat( room ) });
		});
	}
	
	createRoom(e) {
		e.preventDefault();
		const newRoomName = this.state.name;
		if (newRoomName.length >= 1) {
			this.roomsRef.push({ name: newRoomName });
		}
		this.setState({ name: '' });
		this.setState({ isHidden: true });
	}

	handleChange(e) {
		this.setState({ name: e.target.value });
	}

	toggleHidden() {
		this.setState({ isHidden: !this.state.isHidden })
	}

	render() {
		const roomList = this.state.rooms.map( room =>
			<li key={ room.key }>{ room.name }</li> 
		);

		const roomForm = (
			<form onSubmit={ this.createRoom }>
				<h1>Create new room</h1>
				<input
					className="inputStyle"
					type="text" 
					value={ this.state.name } 
					placeholder="Enter a room name"
					onChange={ this.handleChange }
				/>
				<div>
					<button className="create" onSubmit={ this.createRoom }>Create</button>
				</div>
			</form>
		);

		return (
			<section className="roomList">
				<img src={require("../wordbubble.jpg")} alt="Bloc Chat" className="blocChatLogo" />
				<div className="listTitle">Available chat rooms:</div>
				<ul>{ roomList }</ul>
				<button className="addRoom" onClick={ this.toggleHidden }>Create new room</button>
				{ !this.state.isHidden && roomForm }
			</section>
		)
	}
}

export default RoomList;
