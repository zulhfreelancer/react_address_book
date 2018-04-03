import React, { Component } from 'react';
import { base } from "./base";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onEdit(key) {
    this.props.history.push(`/edit/${key}`);
  }

  onDelete(key) {
    base.remove(`friends/${key}`).then(() => {
      this.loadData();
    }).catch(error => {
      // handle error
    });
  }

  loadData() {
    base.fetch('friends', {
      context: this,
      asArray: true
    }).then(data => {
      this.setState({ friends: data })
    }).catch(error => {
      // handle error
    })
  }

  componentWillMount() {
    //
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    //
  }

  render() {
    if (!this.state.friends.length) { return null }

    return (
      this.state.friends.map(friend => {
        return (
          <p key={friend.key}>
            {friend.name}
            {` (`}
            {friend.email}
            {`) `}
            <button
              onClick={() => this.onEdit(friend.key)}>
              Edit
            </button>
            {` `}
            <button
              onClick={() => this.onDelete(friend.key)}>
              Delete
            </button>
          </p>
        )
      })
    )
  }
}

export default Home;
