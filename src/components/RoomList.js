import React, { Component } from 'react';
import '../index.css';

class RoomList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rooms: []
		};

		this.roomsRef = this.props.firebase.database().ref('rooms');
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat( room ) });
		});
	}
	
	render() {
		return (
			<section className='roomList'>
				<table><tbody>
					<h1>Bloc Chat</h1>
					{
						this.state.rooms.map( (room, index) =>
							<tr key={ index }>{ room.name }</tr>
						)
					}
				</tbody></table>
			</section>
		)
	}
}

export default RoomList;
