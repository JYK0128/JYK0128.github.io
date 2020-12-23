import React from 'react';

type Props = {};
type State = { page: number, size: number };

export default class Home extends React.Component<Props, State> {
    render() {
        return (
            <>
                <h1>Welcome To JyWorld!!!</h1>
            </>
        );
    }
}