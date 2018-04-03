import React, { Component } from 'react';
import { base } from "./base";

class SaveFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: {},
      friend_name: "",
      friend_email: ""
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  onEditSubmit(event) {
    event.preventDefault();
    const key = this.getKeyFromRoute(this.props.location.pathname);
    base.remove(`/friends/${key}`).then(() => {
      this.saveFriend();
    }).catch(error => {
      // handle error
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.saveFriend()
  }

  saveFriend() {
    const friends = {...this.state.friends};
    const id = Date.now();
    friends[id] = {
      name: this.state.friend_name,
      email: this.state.friend_email
    };
    this.setState({friends});

    this.props.history.push('/');
  }

  componentWillMount() {
    this.friendsRef = base.syncState('friends', {
      context: this,
      state: 'friends'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.friendsRef);
  }

  componentDidMount() {
    const route = this.props.location.pathname;
    if (this.isEditRoute(route)) {
      this.getFriend(this.getKeyFromRoute(route)); // key
    }
  }

  getKeyFromRoute(route) {
    return route.split("/").pop();
  }

  isEditRoute(route) {
    if (/edit/.test(route)) {
      return true;
    }
  }

  getFriend(key){
    base.fetch(`friends/${key}`, {
      context: this,
      asArray: false
    }).then(data => {
      this.setState({friend_name: data.name});
      this.setState({friend_email: data.email});
    }).catch(error => {
      // handle error
    })
  }

  handleNameChange(event) {
    this.setState({friend_name: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({friend_email: event.target.value});
  }

  render() {
    return (
      <form onSubmit={
          this.isEditRoute(this.props.location.pathname)
          ? this.onEditSubmit : this.onSubmit }>
          <label>Name</label><br/>
          <input
            value={this.state.friend_name}
            onChange={this.handleNameChange}
          />
          <br/>
          <label>Email</label><br/>
          <input
            value={this.state.friend_email}
            onChange={this.handleEmailChange}
          />
          <br/><br/>
          <button>Save</button>
      </form>
    );
  }
}

export default SaveFriend;
