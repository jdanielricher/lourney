import React, { Component } from 'react';
import "./Courses.css";
import axios from 'axios';

import { connect } from "react-redux"
import { getUser } from "../../ducks/userReducer";

class Courses extends Component {
    constructor() {
        super();

        this.state = {
            filterString: "",
            courses: []
        }
        this.setState()
    }

    componentDidMount() {
        this.props.getUser();
        axios.get("/courses/")
            .then(courses => {
                this.setState({ courses: courses.data.results })
            })
    };

    handleAdd(userId, courseId, name) {
        axios.post("/api/addCourse", { userId, courseId, name }).then(res => {
            console.log(res)
        })
    }

    render() {
        console.log(this.state.courses)
        console.log(this.props.userReducer.user)

        let { user_id } = this.props.userReducer.user
        let coursesToDisplay = this.state.courses.map((element, index) => {
            console.log(element)
            return (
                <div key={index}>
                    <h2>{element.title}</h2>
                    <button onClick={() => this.handleAdd(user_id, element.id, element.title)}>Add to Profile</button>
                    {/* <button onClick={this.handleLinkJump(e => { e.id })}>See on Udemy.com</button> */}
                </div>
            )
        })
        return (
            <div className="Courses">
                {coursesToDisplay}
            </div>
        );
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { getUser })(Courses)