import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import axios from "axios";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        axios.get("/api/me").then(user => {
            this.setState({
                user: user.data
            })
        })
    }

    render() {
        console.log(this.state.user)
        let { user } = this.state;
        return (
            <div className="nav_links">
                {user.user_id && <div>
                    <Link replace to="/">
                        Home
            </Link>
                    <Link replace to="/feed">
                        Feed
            </Link>
                    <Link replace to="/courses">
                        Courses
            </Link>
                    <Link replace to="/profile">
                        Profile
            </Link>
                </div>}
                <a href={process.env.REACT_APP_LOGIN} className="Login_Btn">
                    Login
                    </a>
            </div>
        )
    }
}

export default Header;