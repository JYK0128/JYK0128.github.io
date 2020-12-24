import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import Login from "../Modal/Login";
import UserContext from "../Context/UserContext";
import UserMenu from "../Menu/UserMenu";

type Props = {};
type State = {};

export default class Header extends React.Component<Props, State> {
    static contextType = UserContext;

    render() {
        return (
            <header>
                <Navbar bg="light" expand='sm'>
                    <Navbar.Brand href="/#">JYWorld</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/#">Home</Nav.Link>
                            <Nav.Link href="/#/board">Board</Nav.Link>
                        </Nav>

                        <UserContext.Consumer>
                            {(ctx) => {
                                if (ctx.nickname) {
                                    return (
                                        <UserMenu/>
                                    )
                                } else {
                                    return (
                                            <Login className={'mr-1'} variant={"outline-success"}>Sign Up</Login>
                                    )
                                }
                            }
                            }
                        </UserContext.Consumer>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}