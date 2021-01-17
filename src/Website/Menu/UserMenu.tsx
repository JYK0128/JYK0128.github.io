import React from 'react'
import UserContext from "../System/Context/UserContext";
import {NavDropdown} from "react-bootstrap";

type Props = {}
type State = {}
export default class UserMenu extends React.Component<Props, State> {
    static contextType = UserContext;

    constructor(props:Props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(){
        this.context.clear();
        sessionStorage.clear();
    }

    render() {
        return (
                <NavDropdown title={this.context.nickname} id="user-menu">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                    <NavDropdown.Item>Activity</NavDropdown.Item>
                    <NavDropdown.Item>Collection</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
        );
    }
}