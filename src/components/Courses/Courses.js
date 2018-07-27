import React, { Component } from 'react';
import "./Courses.css";
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';

export default class Courses extends Component {
    constructor() {
        super();

        this.state = {
            filterString: "",
            courses: []
        }
        this.setState
    }

    componentDidMount() {
        axios.get("/courses/")
            .then(courses => {
                this.setState({ courses: courses.data.results })
            })
    };

    render() {
        console.log(this.state.courses)
        let coursesToDisplay = this.state.courses.map((element, index) => {
            return (
                <div key={index}>
                    <h2>{element.title}</h2>
                    {/* <h2> {element.image_480x270}</h2> */}
                </div>
            )
        })
        return (
            <div className="Courses">
                {coursesToDisplay}
                {SearchBar}
            </div>
        );
    }
}