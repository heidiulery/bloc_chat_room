import React, { Component } from 'react';

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
			username: '',
			content: '',
			sentAt: '',
			roomId: ''
		});
	}

	handleChange(e) {
		e.preventDefault();
		this.setState({
			username: this.props.user,
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

		return (
			<section>
				<div>{ messageList }</div>
			</section>
		);
	}
}

export default MessageList;