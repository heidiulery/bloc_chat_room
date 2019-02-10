import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
	
	render() {
		return (
			<div className="App">
				<div className="RoomList">
					<RoomList firebase={ firebase } />
				</div>
				<div className="ChatRoom">
				</div>
			</div>
    	);
  	}
}

export default App;
