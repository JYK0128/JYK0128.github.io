import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Board from '../Page/Board';
import Home from '../Page/Home';
import Editor from '../Page/Editor';
import Post from '../Page/Post';

type Props = {};
type State = {};

export default class Body extends React.Component<Props, State> {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path={"/"} exact component={Home}/>
                    <Route path={"/board"} exact component={Board}/>
                    <Route path={"/editor"} exact component={Editor}/>
                    <Route path={"/board/:id(\\d+)"} exact component={Post}/>
                    <Redirect path={"*"} to={"/"}/>
                </Switch>
            </Router>
        );
    }
}