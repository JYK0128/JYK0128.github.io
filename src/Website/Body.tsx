import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Board from './Page/Board'
import Home from './Page/Home'
import Editor from './Page/Editor'
import Test from "./Modal/Test";

type Props = {};
type State = {};

export default class Body extends React.Component<Props, State> {
    render() {
        return (
            <Switch>
                <Route path={"/"} exact component={Home}/>
                <Route path={"/board"} exact component={Board}/>
                <Route path={"/editor"} exact component={Editor}/>
                <Route path={"/test"} exact component={Test}/>
                <Redirect path={"*"} to={"/"}/>
            </Switch>
        );
    }
}