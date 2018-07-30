import React, { Component } from 'react';
import "./Courses.css";
import axios from 'axios';
// import swal from 'sweetalert';
// import SearchBar from '../SearchBar/SearchBar';

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

        // this.props.getCourses();
    }


    componentDidMount() {
        this.props.getUser();
        axios.get("/courses/")
            .then(courses => {
                this.setState({ courses: courses.data.results })
            })
    };


    // handleDelete(course_ID) {
    //     axios.delete(`/api/courses/${course_ID}`).then(() => {
    //         this.props.getCourses();
    //     });
    // }
    handleAdd(userId, courseId, name) {
        axios.post("/api/addCourse", { userId, courseId, name }).then(res => {
            console.log(res)
        })
    }

    // handleLinkJump() {

    // }

    render() {
        console.log(this.state.courses)
        console.log(this.props.userReducer.user)

        let { user_id } = this.props.userReducer.user
        let coursesToDisplay = this.state.courses.map((element, index) => {
            console.log(element)
            return (
                <div key={index}>
                    <button onClick={() => this.handleAdd(user_id, element.id, element.title)}>Add to Profile</button>
                    {/* <button onClick={() => this.handleLinkJump(e => { e.id })}>See on Udemy.com</button> */}
                </div>
            )
        })
        return (
            <div className="Courses">
                {coursesToDisplay}
                {/* {SearchBar} */}
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(Courses)