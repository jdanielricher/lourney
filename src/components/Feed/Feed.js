import React, { Component } from 'react';
import './Feed.css';
import axios from 'axios';

import "font-awesome/css/font-awesome.min.css"

import { connect } from 'react-redux';
import { getUser } from '../../ducks/userReducer';

class Feed extends Component {
    constructor() {
        super();
        this.state = {
            post: [],
            message: "",
            editInput: false,
            editInputVal: "",
            currentEditId: 0
        }
        this.deletePost = this.deletePost.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.addPost = this.addPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleFlag = this.handleFlag.bind(this);
        this.handleEditReset = this.handleEditReset.bind(this);
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
        })
    }

    addPost(post, userID) {
        axios.post("/api/addPost", { post, userID }).then(x => {
        })
    }

    deletePost(userId, postId) {
        axios.delete(`/deletePost/${userId}/${postId}`).then(() => {
            this.getPosts();
        })
    }

    updatePost(event, post, userId, postId) {
        if (event.key === 'Enter') {
            axios.put(`/updatePost/${userId}/${postId}`, { post }).then(() => {
                this.getPosts();
                this.handleEditReset();
            })
        }
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

    handleFlag(flag, postId, inputVal) {
        this.setState({
            editInput: !flag,
            editInputVal: inputVal,
            currentEditId: postId
        })
    }

    handleEditReset() {
        this.setState({
            editInput: false,
            editInputVal: "",
            currentEditId: 0
        })
    }

    render() {
        console.log(this.state)
        let postsToDisplay = this.state.post.map((element, index) => {
            console.log(element)
            if (this.props.userReducer.user.user_id === element.user_id) {
                return (
                    <div key={index}>
                        <h3> {element.post} </h3>
                        {this.props.userReducer.user.user_id === element.user_id && <button onClick={() => this.deletePost(element.user_id, element.post_id)}>X</button>}
                        {!this.state.editInput && <i className="fa fa-edit" onClick={() => this.handleFlag(this.state.editInput, element.post_id, "")}></i> || this.state.editInput && this.state.currentEditId === element.post_id &&
                            <div>
                                <input placeholder="Insert New Post Here" onChange={e => this.handleFlag(!this.state.editInput, element.post_id, e.target.value)} onKeyPress={(e) => this.updatePost(e, this.state.editInputVal, this.props.userReducer.user.user_id, element.post_id)} />
                                <button onClick={this.handleEditReset}>Cancel</button>
                            </div>}
                    </div>
                )
            } else {
                return (
                    <div key={index}>
                        <h3> {element.post} </h3>
                    </div>
                )
            }
        })

        return (
            <div className="Posts">
                <input onKeyPress={this.handleKeyPress} type="text" placeholder="Comment here..." />
                {postsToDisplay}

            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(Feed);