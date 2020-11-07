import React from 'react';
import {Button, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Register from "./Modal/Register";
import Login from "./Modal/Login";
import UserContext from "./Context/UserContext";
import Logout from "./Modal/Logout";

type Props = {};
type State = {};

export default class Header extends React.Component<Props, State> {
    static contextType = UserContext;

    render() {
        return (
            <header>
                <Navbar bg="light" expand='sm'>
                    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/board">Board</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <div style={{width: '160px', display: this.context.username ? 'none' : ''}}>
                            <Register className={'mr-1'} variant={"outline-success"}>Sign Up</Register>
                            <Login className={'mr-1'} variant={"outline-success"}>Log In</Login>
                        </div>
                        <div style={{width: '160px', display: this.context.username ? '' : 'none'}}>
                            <Button className={'mr-1 text-dark font-weight-bold font-italic'}
                                    variant={"outline-light"}> {this.context.username} </Button>
                            <Logout className={'mr-1'} variant={"outline-success"}>Log Out</Logout>
                        </div>

                        <form className="form-inline" style={{width: '290px'}}>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                            <Button variant="outline-success">Search</Button>
                        </form>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}