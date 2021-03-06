import React, { Component } from "react";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";

import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user_courses: [],
      course_name: ""
      //   editInput: false,
      //   editInputVal: "",
      //   currentEditId: 0
    };
    this.getCourses = this.getCourses.bind(this);
    this.deleteCourses = this.deleteCourses.bind(this);
    this.addCourses = this.addCourses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getUser().then(() => {
      this.getCourses();
    });
  }

  getCourses() {
    axios
      .get(`/api/getCourses${this.props.userReducer.user.user_id}`)
      .then(results => {
        console.log(results);
        this.setState({
          user_courses: results.data
        });
        console.log(results.data);
      });
  }

  deleteCourses(userId, courseId) {
    axios.delete(`/delete_courses/${userId}/${courseId}`).then(() => {
      this.getCourses();
    });
  }

  addCourses(userId, course_name) {
    console.log("USER ID: ", userId);
    axios.post(`/api/addCourses/${userId}/1`, { course_name }).then(x => {});
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.addCourses(
      this.props.userReducer.user.user_id,
      this.state.course_name
    );

    await this.getCourses();
  }

  //   updateCourses(event, course_name, userId, postId) {
  //     if (event.key === "Enter") {
  //       axios
  //         .put(`/updateCourses/${userId}/${postId}`, { course_name })
  //         .then(() => {
  //           this.getCourses();
  //           this.handleEditReset();
  //         });
  //     }
  //   }

  async handleChange(value, course_id) {
    console.log(this.props);
    this.setState({ course_name: value });
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.handleChange(event.target.value);
    }
  }

  //   handleEditReset() {
  //     this.setState({
  //       editInput: false,
  //       editInputVal: "",
  //       currentEditId: 0
  //     });
  //   }

  render() {
    let listOfCourses = this.state.user_courses.map((element, index) => {
      console.log(element);
      return (
        <div key={index}>
          <h3>{element.course_name}</h3>
          <button
            onClick={() =>
              this.deleteCourses(element.user_id, element.course_id)
            }
          >
            Remove
          </button>
        </div>
      );
    });
    console.log(this.state.user_courses);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Add Custom Course Here"
            onChange={e => this.handleChange(e.target.value)}
            onKeyPress={e =>
              this.addCourses(
                e,
                this.state.course_name,
                this.props.userReducer.user.user_id
              )
            }
          />
        </form>
        <h3>
          {this.state.user_courses[0] && this.state.user_courses[0].username}
        </h3>
        {listOfCourses}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser }
)(Profile);
