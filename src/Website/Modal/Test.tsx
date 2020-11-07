import React from 'react';
import UserContext from "../Context/UserContext";

type Props = {};
type State = {};

export default class Test extends React.Component<Props, State>{
    static contextType = UserContext;

    render() {
        return (
            <UserContext.Consumer>
                {(context) => <div>{context!.username}</div>}
            </UserContext.Consumer>
        );
    }
}