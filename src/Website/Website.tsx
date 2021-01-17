import React from 'react';
import Body from './Main/Body';
import Header from './Main/Header';
import Footer from "./Main/Footer";
import UserContext, {defaultValue, UserContextType} from "./System/Context/UserContext";
import {BrowserRouter, Route} from "react-router-dom";

type Props = {};
type State = UserContextType;
export default class Website extends React.Component<Props, State> {
    static contextType = UserContext;

    constructor(props: Props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.clear = this.clear.bind(this);

        defaultValue.setContext = this.setState;
        defaultValue.clear = this.clear;
        this.state = defaultValue;
    }

    clear() {
        this.setState({
            token: undefined,
            nickname: undefined,
            loginTime: undefined
        });
    }

    componentDidMount(): void {
        if (this.isValid()) {
            this.loadUserInfo();
        } else {
            this.unloadUserInfo();
        }

        if (this.willExpired()) {
            this.refreshAccess();
        }
    }

    loadUserInfo(): void {
        let obj: Record<string, any> = {};
        for (const key of Object.keys(this.state)) {
            obj[key] = sessionStorage.getItem(key);
        }
        this.setState(obj as UserContextType);
    }

    unloadUserInfo() {
        sessionStorage.clear();
        this.clear();
    }

    isValid(): boolean {
        const loginTime = Date.parse(sessionStorage.getItem("loginTime")!);
        const now = new Date().getTime();
        return (now - loginTime < 1000 * 60 * 60)
    }

    willExpired(): boolean {
        const loginTime = Date.parse(sessionStorage.getItem("loginTime")!);
        const now = new Date().getTime();
        return (now - loginTime > 1000 * 60 * (60 - 10));
    }

//TODO:refreshAccessToken
    refreshAccess(): void {
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