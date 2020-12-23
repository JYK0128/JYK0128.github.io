import React from 'react';
import Body from './Main/Body';
import Header from './Main/Header';
import Footer from "./Main/Footer";
import UserContext, {UserContextType} from "./Context/UserContext";

type Props = {};

export default class Website extends React.Component<Props, UserContextType> {
    constructor(props:Props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {token: undefined, nickname: undefined, setContext: this.setState};
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                    <div className={'min-vh-100'}>
                        <Header/>
                        <Body/>
                    </div>
                    <Footer/>
            </UserContext.Provider>
        );
    }
}