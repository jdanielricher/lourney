import React, { Component } from 'react';
import axios from "axios";

import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user_courses: []
        }
        this.getCourses = this.getCourses.bind(this);
        this.deleteCourses = this.deleteCourses.bind(this);
    }

    componentDidMount() {
        this.props.getUser().then(() => {
            this.getCourses();
        })
    }

    getCourses() {
        axios.get(`/api/getCourses${this.props.userReducer.user.user_id}`).then(results => {
            console.log(results)
            this.setState({
                user_courses: results.data
            });
            // console.log(results.data)
        })
    }

    deleteCourses(userId, courseId) {
        axios.delete(`/delete_courses/${userId}/${courseId}`).then(() => {
            this.getCourses();
        })
    }

    render() {
        let listOfCourses = this.state.user_courses.map((element, index) => {
            console.log(element)
            return (
                <div key={index}>
                    <h3>{element.course_name}</h3>
                    <button onClick={() => this.deleteCourses(element.user_id, element.course_id)}>Remove</button>
                </div>
            )
        })
        // console.log(this.state.user_courses)
        return (
            <div>
                <h3>{this.state.user_courses[0] && this.state.user_courses[0].username}</h3>
                {listOfCourses}
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(Profile);