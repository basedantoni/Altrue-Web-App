import React, { Component } from 'react';
import PostForm from './PostForm';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  componentWillMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => this.setState({ posts: data }))
  }

  render() {
    const postItems = this.state.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
    return (
      <div>
        <PostForm />
        < hr />
        {postItems}
      </div>
    )
  }
}

export default Post
