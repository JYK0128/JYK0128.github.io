import React from 'react'
import UserContext from "../Context/UserContext";
import {NavDropdown} from "react-bootstrap";

export default class UserMenu extends React.Component<any, any> {
    static contextType = UserContext;
    constructor(props:any) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout(){
        this.context.setContext({
            token:undefined,
            nickname:undefined
        })
    }

    render() {
        return (
                <NavDropdown title={this.context.nickname} id="user-menu">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                    <NavDropdown.Item>Activity action</NavDropdown.Item>
                    <NavDropdown.Item>Collection</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
        );
    }
}