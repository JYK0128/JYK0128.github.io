import React, {ComponentState} from 'react';
import {Button, Modal, Form, ButtonProps} from "react-bootstrap";
import UserContext from "../Context/UserContext";

type Props = ButtonProps & {};
type State = { show: boolean, username: string, password: string };

export default class Login extends React.Component<Props, State> {
    static contextType = UserContext;

    constructor(props: Props) {
        super(props);
        this.state = {
            show: false,
            username: '',
            password: ''
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({[e.target.id]: e.target.value} as ComponentState);
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Request
        const token = localStorage.getItem('authorization') || '';
        const data = JSON.stringify({"username": this.state.username, "password": this.state.password});
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Authorization": token},
            body: data
        };

        // Response
        fetch('/login', requestOptions)
            .then(test => {
                console.log(test);
                return test;
            })
            .then(response => response.headers.get('authorization'))
            .then(authorization => {
                if (authorization) {
                    localStorage.setItem('username', this.state.username||'');
                    localStorage.setItem('authorization', authorization||'');
                    this.handleClose();
                    this.context.setStore({username: this.state.username});
                } else {
                    alert('올바른 아이디 또는 비밀번호를 입력하세요.')
                }
            })
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <>
                <Button className={this.props.className} variant={this.props.variant}
                        onClick={this.handleShow}>{this.props.children}</Button>
                <Modal animation={false} show={this.state.show} onHide={this.handleClose}>
                    <Form onSubmit={this.handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Log in</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>ID</Form.Label>
                                <Form.Control id={'username'} type="text" onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control id={'password'} type="password" onChange={this.handleChange}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Form.Group>
                                <Form.Check type="checkbox" label="Remember Me"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        )
            ;
    }
}