import React, { Component } from 'react';
import axios from "axios";

import { connect } from "react-redux"
import { getUser } from "../../ducks/userReducer"

class Profile extends Component {
    componentDidMount() {
        this.props.getUser().then(() => {
            axios.get(`/api/getCourses${this.props.userReducer.user.user_id}`).then(results => {
                console.log(results)
            })
        })
    }


    render() {
        console.log(this.props.userReducer.user)
        return (
            <div> Profile </div>
        )
    }

}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(Profile);


// Need to save the results from the get request in componentDidMount in state
// it will be an empty array
// map through the array which will return JSX including the course data we wanna show on screen
// render variable in return on component


