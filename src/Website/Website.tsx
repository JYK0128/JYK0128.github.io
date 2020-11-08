import React from 'react';
import Body from './Body'
import Header from './Header'
import Footer from "./Footer";
import {BrowserRouter as Router} from "react-router-dom";
import UserContext from "./Context/UserContext";

type Props = {};
export type State = { username: string, setStore: any};

export default class Website extends React.Component<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            username: localStorage.getItem('username')||'',
            setStore: (obj:object) => this.setState(obj)
        }
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                <Router>
                    <div className={'min-vh-100'}>
                        <Header/>
                        <Body/>
                    </div>
                    <Footer/>
                </Router>
            </UserContext.Provider>
        );
    }
}