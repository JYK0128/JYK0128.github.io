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
        defaultValue.setContext = this.setState;
        this.state = defaultValue;
    }

    componentDidMount() {
        const valid = this.isValid();
        if (valid) {
            this.loadUserInfo();
        } else {
            this.unloadUserInfo();
        }

        const expired = this.willExpired();
        if (expired) {
            this.refreshAccess();
        }
    }

    loadUserInfo(): void {
        let obj: Record<string, any> = {};
        for (const key of Object.keys(this.state)) {
            obj[key] = sessionStorage.getItem(key);
        }
        obj["setContext"] = this.setState;
        this.setState(obj as UserContextType);
    }

    unloadUserInfo(): void {
        sessionStorage.clear();
        this.setState(this.context.defaultValue);
    }

    isValid(): boolean {
        const loginTime = this.state.loginTime;

        if(loginTime){
            const now = new Date().getTime();
            const login = loginTime.getTime();

            if(now - login > 1000 * 60 * 60){
                return false;
            }
        }
        return true;
    }

    willExpired(): boolean {
        const loginTime = this.state.loginTime;

        if(loginTime){
            const now = new Date().getTime();
            const login = loginTime.getTime();

            if(now - login < 1000 * 60 * (60 - 10)){
                return true;
            }
        }
        return false;
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