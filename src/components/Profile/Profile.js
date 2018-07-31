import React, { Component } from 'react';
import axios from "axios";

import { connect } from "react-redux"
import { getUser } from "../../ducks/userReducer"

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user_courses: []
        }
    }

    componentDidMount() {
        this.props.getUser().then(() => {
            axios.get(`/api/getCourses${this.props.userReducer.user.user_id}`).then(results => {
                console.log(results)
                this.setState({
                    user_courses: results.data
                });
                console.log(results.data)
            })
        })
    }


    // console.log(this.props.userReducer.user)
    // console.log(this.state.user_courses)
    // let userCoursesToDisplay;
    // this.state.user_courses && (userCoursesToDisplay = this.state.user_courses[0].username);
    //     return (
    //         //e.id
    //         <div key="authid">
    //             <div> Profile </div>
    //             <div>
    //                 {e.username}
    //             </div>
    //             <div>
    //                 {e.bio}
    //             </div>
    //         </div>
    //     )
    // })
    render() {
        let listOfCourses = this.state.user_courses.map((element, index) => {
            return (
                <div key={index}> {element.course_name} </div>

            )
        })
        console.log(this.state.user_courses)
        return (
            <div>
                <h3>{this.state.user_courses[0] && this.state.user_courses[0].username}</h3>
                {listOfCourses}
            </div>

        )
    }
}


//depending on the user_id, display selected courses on the users profile


const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(Profile);


// Need to save the results from the get request in componentDidMount in state
// it will be an empty array
// map through the array which will return JSX including the course data we wanna show on screen
// render variable in return on component


