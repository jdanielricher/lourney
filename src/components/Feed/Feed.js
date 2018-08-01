import React, { Component } from 'react';
import './Feed.css';
import axios from 'axios';

import { connect } from 'react-redux';
import { getUser } from '../../ducks/userReducer';

class Feed extends Component {
    constructor() {
        super();
        this.state = {
            post: [],
            message: ""
        }
        this.deletePost = this.deletePost.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.addPost = this.addPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        this.props.getUser().then(() => {
            this.getPosts()
        })
    }

    getPosts() {
        axios.get("/api/posts").then(posts => {
            this.setState({
                post: posts.data
            })
            // console.log(posts)
        })
    }

    addPost(post, userID) {
        // console.log(post)
        axios.post("/api/addPost", { post, userID }).then(x => {
            // console.log(x)

        })
    }

    deletePost(userId, postId) {
        axios.delete(`/deletePost/${userId}/${postId}`).then(() => {
            this.getPosts();
        })
    }

    async handleChange(value) {
        await this.setState({ message: value })
        await this.addPost(this.state.message, this.props.userReducer.user.user_id)
        await this.getPosts()
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleChange(event.target.value)
        }
    }

    render() {
        // console.log(this.props)
        console.log(this.state)
        let postsToDisplay = this.state.post.map((element, index) => {
            console.log(element)
            console.log(this.state.post[index].user_id, element.user_id)
            return (
                <div key={index}>
                    <h3> {element.post} </h3>
                    {this.state.post[index].user_id === element.user_id && <button onClick={() => this.deletePost(element.user_id, element.post_id)}>X</button>}
                </div>
            )
        })
        return (
            <div className="Posts">
                <input onKeyPress={this.handleKeyPress} type="text" placeholder="Share your learning experience..." />
                {postsToDisplay}

            </div>
        );
    }
}

// 
const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(Feed);