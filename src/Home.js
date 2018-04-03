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
    var confirmDelete = window.confirm("Are you sure to delete?");
    if (confirmDelete === true) {
      base.remove(`friends/${key}`).then(() => {
        this.loadData();
      }).catch(error => {
        // handle error
      });
    }
  }

  loadData() {
    this.friendsRef = base.syncState('friends', {
      context: this,
      state: 'friends',
      asArray: true
    });
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
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
            {
              this.state.friends.map(friend => {
                return (
                  <tr key={friend.key}>
                    <td>{friend.name}</td>
                    <td>{friend.email}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => this.onEdit(friend.key)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.onDelete(friend.key)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    )

  }
}

export default Home;
