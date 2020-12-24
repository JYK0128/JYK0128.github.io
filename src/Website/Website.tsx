import React from 'react';
import Body from './Main/Body';
import Header from './Main/Header';
import Footer from "./Main/Footer";
import UserContext, {UserContextType} from "./Context/UserContext";
import {BrowserRouter, Route} from "react-router-dom";

type Props = {};

export default class Website extends React.Component<Props, UserContextType> {
    constructor(props: Props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {token: undefined, nickname: undefined, setContext: this.setState};
    }

    componentDidMount() {
        let obj: { [k: string]: any } = {};
        for (const key of Object.keys(this.state)) {
            obj[key] = sessionStorage.getItem(key);
        }
        obj["setContext"] = this.setState;
        this.setState(obj as UserContextType);
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <Route exact path={"/"}>
                        <UserContext.Provider value={this.state}>
                            <div className={'min-vh-100'}>
                                <Header/>
                                <Body/>
                            </div>
                            <Footer/>
                        </UserContext.Provider>
                    </Route>
                    <Route path={"/oauth2/code/*"}/>
                </BrowserRouter>

            </>
        );
    }
}