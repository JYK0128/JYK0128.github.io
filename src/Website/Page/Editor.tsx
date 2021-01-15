import React from 'react';
import {Button, Form} from "react-bootstrap";
import UserContext from "../System/Context/UserContext";
import {CollectionModel} from "hateoas-hal-types";
import FetchUtils from "../Utils/FetchUtils";

type Props = {};
type State = {};
export default class Editor extends React.Component<Props, State> {
    static contextType = UserContext;

    constructor(props: Props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const init = FetchUtils.init();

        const uploadData = new FormData();
        const uploadEntity = formData.getAll("files");
        formData.delete("files");

        //upload 파일 확인
        for (let file of uploadEntity) {
            file = file as File;
            if (!(file.size && file.name)) {
                if (uploadEntity.length > 1) return alert(`${file.name} is not valid.`);
                if (uploadEntity.length === 1 && file.name) return alert(`${file.name} is not valid.`);
                if (uploadEntity.length === 1 && !file.name) uploadEntity.pop();
            }
            uploadData.append("files", file);
        }

        // FormData
        (async function () {
            const uploads: string[] = [];
            if(uploadEntity.length){
                const res = await fetch("/upload", init.setBody(uploadData))
                    .then(res => res.json() as Promise<CollectionModel>)
                    .then(hal => hal._embedded?.uploads.map(upload => upload._links.self.href) as string[]);
                uploads.push(...res);
            }
            const postData:Record<string, any> = Object.fromEntries(formData);
            postData.uploads = uploads;

            fetch("/post", init.setBody(postData).setContentType("application/json"))
                .then(res => res.json())
                .catch(() => uploads.forEach(upload => fetch(upload, init.setMethod("DELETE"))))
        })();
    }


    render() {
        return (
            <>
                <h2>게시글 작성</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId={"formTitle"}>
                        <Form.Label>제목</Form.Label>
                        <Form.Control name={"title"} as="input" type="text" placeholder="제목을 입력하세요."/>
                    </Form.Group>

                    <Form.Group controlId={"formTag"}>
                        <Form.Label>태그</Form.Label>
                        <Form.Control name={"tag"} as="input" type="text" placeholder="주제를 입력하세요."/>
                    </Form.Group>

                    <Form.Group controlId={"formContent"}>
                        <Form.Label>내용</Form.Label>
                        <Form.Control name={"content"} as="textarea" placeholder="내용을 입력하세요."/>
                    </Form.Group>

                    <Form.Group controlId={"formFile"}>
                        <Form.File name={"files"} multiple={true}/>
                    </Form.Group>

                    <Form.Group controlId={"formButton"}>
                        <Button type="button" variant={"secondary"} href={"#/board"}>취소</Button>
                        <Button type="submit" variant={"primary"}>작성</Button>
                    </Form.Group>
                </Form>
            </>
        );
    }
}