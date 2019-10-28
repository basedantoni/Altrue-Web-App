import React, { Component } from 'react';
import PropTypes from "prop-types";
import PostForm from './PostForm';
import { fetchPosts } from '../actions/postActions';
import { connect } from 'react-redux';

class Post extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newPost) {
      this.props.post.unshift(nextProps.newPost);
    }
  }

  render() {
    const postItems = this.props.post.map(post => (
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

Post.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  post: PropTypes.array.isRequired,
  newItem: PropTypes.object
}

const mapStateToProps = state => ({
  post: state.post.items,
  newPost: state.post.item
})

export default connect(mapStateToProps, { fetchPosts })(Post);