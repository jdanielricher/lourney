import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Courses from './components/Courses/Courses';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Feed from './components/Feed/Feed';

export default (
    <Switch>
        <Route path="/feed" component={Feed} />
        <Route path="/courses" component={Courses} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route path="*" render={() => <div>FourOhFour</div>} />
    </Switch>
);
