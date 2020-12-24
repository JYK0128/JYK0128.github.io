import React from 'react';
import {Button, Form} from "react-bootstrap";

type Props = {};
type State = {};

export default class Editor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
//        alert(e.currentTarget.childElementCount) // 5
        const data = new FormData(e.currentTarget);

        alert(JSON.stringify(data));
    }

    render() {
        return (
            <>
                <h2>게시글 작성</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId={"formTitle"}>
                        <Form.Label>제목</Form.Label>
                        <Form.Control as="input" type="text" placeholder="제목을 입력하세요."/>
                    </Form.Group>

                    <Form.Group controlId={"formTag"}>
                        <Form.Label>태그</Form.Label>
                        <Form.Control as="input" type="text" placeholder="주제를 입력하세요."/>
                    </Form.Group>

                    <Form.Group controlId={"formContent"}>
                        <Form.Label>내용</Form.Label>
                        <Form.Control as="textarea" placeholder="내용을 입력하세요."/>
                    </Form.Group>

                    <Form.Group controlId={"formFile"}>
                        <Form.File multiple={true}/>
                    </Form.Group>

                    <Form.Group controlId={"formFile"}>
                        <Button type="button" variant={"secondary"} href={"#/board"}>취소</Button>
                        <Button type="submit" variant={"primary"}>작성</Button>
                    </Form.Group>
                </Form>
            </>
        );
    }
}