import React, { Component } from "react";
import axios from "axios";

export class PostList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/users/poc")
      .then(response => {
        console.log(response)
        this.setState({posts: response.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

    render() {
      const { posts } = this.state
        return (
            <div>
              <h1>Everything in Database</h1>
              {
                posts.length ?
                posts.map(post => <div key={post.id}>{post.username}</div>) :
                null
              }
            </div>
        )
    }
}

export default PostList