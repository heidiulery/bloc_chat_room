import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
	constructor(props) {
		super(props);
			
			this.state = {
				messages: [],
				username: '',
				content: '',
				sentAt: '',
				roomId: ''
			}

			this.messagesRef = this.props.firebase.database().ref('messages');
			this.createMessage = this.createMessage.bind(this);
			this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) });
        });
    }

	createMessage(e) {
		e.preventDefault();
		this.messagesRef.push({
			username: this.state.username,
      		content: this.state.content,
      		sentAt: this.state.sentAt,
      		roomId: this.state.roomId
		});
		this.setState({
			content: '',
		});
			console.log(this.state.username);
			console.log(this.state.content);
	}

	handleChange(e) {
		e.preventDefault();
		this.setState({
			user: this.props.user,
			content: e.target.value,
			sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
			roomId: this.props.activeRoom
		});
	}

	render() {
		const activeRoom = this.props.activeRoom;

		const messageList = (
      		this.state.messages.map((message) => {
        		if (message.roomId === activeRoom) {
          			return <li key={ message.key }>{ message.username }: { message.content }</li>
        		}
        	return null;
      		})
    	);

		const messageBar = (
			<form onSubmit={ this.createMessage } >
				<input type="text" value={ this.state.content } onChange={ this.handleChange } className="inputField" placeholder="Enter message . . ." />
				<input type="submit" className="submitButton" value="Send" />
			</form>
		);

		return (
			<section className="messageList">
				<div>{ messageList }</div>
				<div>{ messageBar }</div>
			</section>
		);
	}
}

export default MessageList;
