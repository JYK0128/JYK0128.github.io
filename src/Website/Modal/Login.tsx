import React from 'react';
import {Button, ButtonProps, Modal, Row, Form, Col, Container} from "react-bootstrap";
import UserContext from "../System/Context/UserContext";
import OauthProvider, {PopupWindow, UserInfo} from "../System/Oauth/OauthProvider";

type Props = ButtonProps & {};
type State = { show: boolean };

export default class Login extends React.Component<Props, State> {
    static contextType = UserContext;

    constructor(props: Props) {
        super(props);
        this.state = {show: false}

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleShow() {
        this.setState({show: true})
    }

    handleClose() {
        this.setState({show: false})
    }

    handleLogin(e: React.MouseEvent<HTMLElement>) {
        const server = OauthProvider(e.currentTarget.id);
        const popup = PopupWindow(server);
        popup
            .then(popup => popup ? popup : Promise.reject(new Error("popup isn't working")))
            .then(popup => server.getCode(popup))
            .then(code => server.getAccessToken(code))
            .then(token => UserInfo(token))
            .then(userInfo => {
                userInfo.loginTime = new Date();
                this.context.setContext(userInfo)
                for(const [key, val] of Object.entries(userInfo)){
                    sessionStorage.setItem(key, val as string)
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <>
                <Button className={this.props.className} variant={this.props.variant}
                        onClick={this.handleShow}>{this.props.children}</Button>
                <Modal animation={false} show={this.state.show}
                       onHide={this.handleClose} backdrop={"static"} keyboard={false}>
                    <Modal.Header closeButton>Register / Log In</Modal.Header>
                    <Modal.Body>
                        <Container fluid="sm">
                            <Row sm={{cols: 1}}>
                                <Form as={Col}>
                                    <Form.Group as={Row} controlId="test">
                                        <Form.Label column sm={{span: 2, offset: 1}}>ID</Form.Label>
                                        <Col sm={{span: 8}}>
                                            <Form.Control type="email" placeholder="Enter email"/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formGroupPassword">
                                        <Form.Label column sm={{span: 2, offset: 1}}>Password</Form.Label>
                                        <Col sm={{span: 8}}>
                                            <Form.Control type="password" placeholder="Password"/>
                                        </Col>
                                    </Form.Group>

                                    <Row className={"justify-content-sm-center"}>
                                        <Button as={Col} sm={{span: 10}} variant="primary" type="submit">
                                            로그인
                                        </Button>
                                    </Row>
                                    <Row className={"justify-content-sm-center"}>
                                        <Button as={Col} sm={{span: 5}} variant="info">
                                            아이디/비밀번호 찾기
                                        </Button>
                                        <Button as={Col} sm={{span: 5}} variant="info">
                                            회원가입
                                        </Button>
                                    </Row>
                                </Form>
                            </Row>

                            <hr/>

                            <Row>
                                <Button as={Col} id={'google'} variant={'danger'} onClick={this.handleLogin}>Login with Google</Button>
                                <Button as={Col} id={'naver'} variant={'success'} onClick={this.handleLogin}>Login with Naver</Button>
                                <Button as={Col} id={'kakao'} variant={'warning'} onClick={this.handleLogin}>Login with Kakao</Button>
                            </Row>
                        </Container>
                    </Modal.Body>
                </Modal>
            </>
        )
            ;
    }
}