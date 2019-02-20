import React, { Component } from 'react';
import '../index.css';

class User extends Component {
	constructor(props) {
		super(props);

		this.signIn = this.signIn.bind(this);
		this.signOut = this.signOut.bind(this);
	}

	componentDidMount() {
		this.props.firebase.auth().onAuthStateChanged( user => {
  			this.props.setUser(user);
		});
	}

	signIn() {
		const provider = new this.props.firebase.auth.GoogleAuthProvider();
		this.props.firebase.auth().signInWithPopup( provider ).then( (result) => {
			const user = result.user;
			this.props.setUser(user);
		});
	}

	signOut() {
		this.props.firebase.auth().signOut().then( () => {
			this.props.setUser(null);
		});
	}
	
	render() {
		const currentUser = this.props.user ? this.props.user.displayName : 'Guest';
			console.log(currentUser);
			console.log(this.props.user);

		return (
			<section className="header">
				<button 
					className="signin-out" 
					onClick={ this.props.user ? this.signOut : this.signIn }
				>
					<span>{ this.props.user ? 'Sign out' : 'Sign in' }</span>
				</button>
				<div className="user">{ currentUser }</div>
			</section>
		);
	}
}

export default User;
