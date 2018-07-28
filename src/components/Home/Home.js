import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div className="cool_sky">
                <div className="Welcome Text">
                    <h1> Welcome to Lourney </h1>
                    <br>
                    </br>
                    <h2> Lourney is an empowered network of individuals
                         that share what they are working on
                         and what they are learning.
                    </h2>
                    <br>
                    </br>
                    <a href="localhost:3000/#/swpal">See what people are learning</a>
                    <br>
                    </br>
                    <p>Scroll down...</p>
                </div>
            </div>
        );
    }
}

export default Home;












