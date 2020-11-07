import React from 'react';
import {Button, ButtonProps} from "react-bootstrap";
import UserContext from "../Context/UserContext";

type Props = ButtonProps & {};
type State = {};
export default class Logout extends React.Component<Props, State>{
    static contextType = UserContext;

    constructor(props:Props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        localStorage.clear();
        this.context.setStore({username: ''});
    }

    render() {
        return (
            <Button className={this.props.className} variant={this.props.variant}
                    onClick={this.handleClick}>{this.props.children}</Button>
        );
    }
}