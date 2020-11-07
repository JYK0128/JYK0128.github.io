import React from 'react';
import {Button, ButtonProps, Col, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form"
import Joi from "joi";
import {joiResolver} from "@hookform/resolvers/joi";

type Props = ButtonProps & {};
type State = { show: boolean };

export default class Register extends React.Component
    <Props, State> {
    private handleClose: () => void;
    private handleShow: () => void;

    constructor(props: Props) {
        super(props);
        this.state = {show: false}

        this.handleClose = () => this.setState({show: false});
        this.handleShow = () => this.setState({show: true});
    }

    render() {
        return (
            <>
                <Button className={this.props.className} variant={this.props.variant}
                        onClick={this.handleShow}>{this.props.children}</Button>
                <Modal animation={false} show={this.state.show} onHide={this.handleClose} backdrop={"static"}
                       keyboard={false}>
                    <Modal.Header closeButton>Register</Modal.Header>
                    <Modal.Body>
                        <MyForm parentClose={this.handleClose}/>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

type FormProps = { parentClose?: () => void }

function MyForm(props: FormProps) {
    const schema = Joi.object({
        id: Joi.string().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string().required(),
        username: Joi.string().required(),
        birth: Joi.string().required(),
        gender: Joi.string().required(),
        email: Joi.string().email({tlds: {allow: false}}).required(),
        phone: Joi.string().regex(new RegExp("[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}")).required(),
    }).options({abortEarly: false});

    const {register, handleSubmit, errors} = useForm({
        resolver: joiResolver(schema)
    });

    const validIdErrRef = React.createRef<any>();

    function handleBlur(e: any) {
        if(e.target.value === 'user'){
            validIdErrRef.current!.innerText = 'ID Duplicate';
        }

    }

    function submit_function(data: any) {
        console.log(data);

        if (props.parentClose) {
            props.parentClose();
        }
    }

    return (
        <>
            <Form className={'col-md-12'} onSubmit={handleSubmit(submit_function)}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control name='id' type="text" onBlur={handleBlur} ref={register}/>
                    </Form.Group>
                    {errors.id && <div className={"text-danger"}>{errors.id.message}</div>}
                    <div className={"text-danger"} ref={validIdErrRef}></div>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control name='password' type="password" ref={register}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control name='password_confirmation' type="password" ref={register}/>
                        </Form.Group>
                    </Form.Row>
                    {errors.password && <div className={"text-danger"}>{errors.password.message}</div>}
                    {errors.password_confirmation &&
                    <div className={"text-danger"}>{errors.password_confirmation.message}</div>}
                    <hr/>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='username' type={"text"} ref={register}/>
                        </Form.Group>
                    </Form.Row>
                    {errors.username && <div className={"text-danger"}>{errors.username.message}</div>}

                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicDateOfBirth">
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control name='birth' type={"date"} ref={register}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicGender">
                            <Form.Label>gender</Form.Label>
                            <Form.Control name='gender' as="select" defaultValue={''} ref={register}>
                                <option hidden disabled value={''}/>
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    {errors.birth && <div className={"text-danger"}>{errors.birth.message}</div>}
                    {errors.gender && <div className={"text-danger"}>{errors.gender.message}</div>}
                    <hr/>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name='email' type={"email"} ref={register}/>
                        </Form.Group>
                    </Form.Row>
                    {errors.email && <div className={"text-danger"}>{errors.email.message}</div>}

                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control name='phone' type={"tel"} ref={register}/>
                        </Form.Group>
                    </Form.Row>
                    {errors.phone && <div className={"text-danger"}>{errors.phone.message}</div>}
                    <hr/>

                    <Form.Row className={'float-right'}>
                        <Button variant="danger" type="button" onClick={props?.parentClose}>Cancel</Button>
                        <Button variant="primary" type="submit">submit</Button>
                    </Form.Row>
                </Modal.Body>
            </Form>
        </>
    );
}