import React, { Component } from 'react';
import axios from "axios";

import { connect } from "react-redux"
import { getUser } from "../../ducks/userReducer"

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user_courses: [],
            course_name: []
        }
    }

    componentDidMount() {
        this.props.getUser().then(() => {
            axios.get(`/api/getCourses${this.props.userReducer.user.user_id}`).then(results => {
                console.log(results)
                this.setState({
                    user_courses: results.data
                });
            })
        })
    }

    render() {
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
        return (
            <div> {this.state.user_courses[0] && this.state.user_courses[0].username} </div>
            //&& this
        )
    }
}





const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(Profile);


// Need to save the results from the get request in componentDidMount in state
// it will be an empty array
// map through the array which will return JSX including the course data we wanna show on screen
// render variable in return on component


