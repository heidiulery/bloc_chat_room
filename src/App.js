import React, { Component } from 'react';
import './App.css';
import './index.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
				user: null,
			}
	
			this.setActiveRoom = this.setActiveRoom.bind(this);
			this.setUser = this.setUser.bind(this);
	}

	setActiveRoom(room) {
		this.setState({ activeRoom: room });
	}

	setUser(user) {
		this.setState({ user: user });
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
					<div className="signin">
						<User 
							firebase={ firebase }
							setUser={ this.setUser }	
							user={ this.state.user }
						/>
					</div>
					{ showActive 
						? <MessageList 
							firebase={ firebase }
							activeRoom={ this.state.activeRoom.key }
							setUser={ this.setUser }
							user={ this.state.user }
						/>
						: null
					}
				</div>
			</div>
    	);
  	}
}

export default App;
