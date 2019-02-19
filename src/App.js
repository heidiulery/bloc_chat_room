import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAAlsDPki543p-5sCfQxqUwXSOoW_YZ6Sw",
    authDomain: "bloc-chat-room-4f89f.firebaseapp.com",
    databaseURL: "https://bloc-chat-room-4f89f.firebaseio.com",
    projectId: "bloc-chat-room-4f89f",
    storageBucket: "bloc-chat-room-4f89f.appspot.com",
    messagingSenderId: "52277306433"
  };
  firebase.initializeApp(config);

class App extends Component {
	constructor(props) {
		super(props);

			this.state = {
				activeRoom: '',
			}
	
			this.setActiveRoom = this.setActiveRoom.bind(this);
	}

	setActiveRoom(room) {
		this.setState({ activeRoom: room });
	}

	render() {
		const showActive = this.state.activeRoom;

		return (
			<div className="App">
				<div className="RoomList">
					<RoomList 
						firebase={ firebase } 
						activeRoom={ this.state.activeRoom }
						setActiveRoom={ this.setActiveRoom }
					/>
				</div>
				<div className="MessageList">
					{ showActive 
						? <MessageList 
							firebase={ firebase }
							activeRoom={ this.state.activeRoom.key }
						/>
						: null
					}
				</div>
			</div>
    	);
  	}
}

export default App;
