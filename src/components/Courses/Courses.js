import React, { Component } from "react";
import "./Courses.css";
import axios from "axios";
import Footer from ".././Footer/Footer";

import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";

class Courses extends Component {
  constructor() {
    super();

    this.state = {
      filterString: "",
      courses: [],
      count: 1,
      disablePrev: true,
      pageSwitch: false
    };
    this.getNextPage = this.getNextPage.bind(this);
    this.getPrevPage = this.getPrevPage.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
    axios.get(`/courses/?page=${this.state.count}`).then(courses => {
      this.setState({ courses: courses.data.results });
    });
  }

  getNextPage() {
    axios.get(`/courses/?page=${this.state.count + 1}`).then(res => {
      this.setState({
        courses: res.data.results,
        count: this.state.count + 1,
        disablePrev: false
      });
    });
  }

  getPrevPage() {
    axios.get(`/courses/?page=${this.state.count - 1}`).then(res => {
      this.setState({
        courses: res.data.results,
        count: this.state.count - 1
      });
    });
    if (this.state.count === 2) {
      this.setState({ disablePrev: true });
    }
  }

  handleAdd(userId, courseId, name) {
    axios.post("/api/addCourse", { userId, courseId, name }).then(res => {
      console.log(res);
    });
  }

  render() {
    console.log(this.state.courses);
    // console.log(this.props.userReducer.user);

    let { user_id } = this.props.userReducer.user;
    let coursesToDisplay = this.state.courses.map((element, index) => {
      //   console.log(element);
      return (
        <div key={index}>
          <h2>{element.title}</h2>
          <button
            onClick={() => this.handleAdd(user_id, element.id, element.title)}
          >
            Add to Profile
          </button>
          {/* <button onClick={this.handleLinkJump(e => { e.id })}>See on Udemy.com</button> */}
        </div>
      );
    });
    return (
      <div className="Courses">
        {coursesToDisplay}
        <Footer
          getNextPage={this.getNextPage}
          getPrevPage={this.getPrevPage}
          getDisable={this.state.disablePrev}
        />
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { getUser }
)(Courses);
