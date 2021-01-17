import React from 'react';
import {Button, Form} from "react-bootstrap";
import UserContext from "../System/Context/UserContext";
import {CollectionModel, EntityModel} from "hateoas-hal-types";
import FetchUtils from "../Utils/FetchUtils";
import UploadType from "../System/Type/UploadType";
import PostType from "../System/Type/PostType";

type Props = {};
type State = {};
export default class Editor extends React.Component<Props, State> {
    static contextType = UserContext;

    constructor(props: Props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    splitFormData(formData: FormData) {
        const postForm = new FormData();
        const fileForm = new FormData(); // not multipart

        formData.forEach((value, key) => {
            if (key === "files") {
                const file = value as File;
                if (file.size && file.name) {
                    fileForm.append(key, value);
                } else {
                    if (file.size && !file.name) {
                        throw new Error("filename is empty");
                    } else if (!file.size && file.name) {
                        throw new Error(`file \"${file.name}\" is 0 byte`);
                    }
                }
            } else {
                postForm.append(key, value);
            }
        })

        return {postForm, fileForm};
    }

    async upload(fileForm: FormData) {
        if (fileForm.has("files")) {
            const req = FetchUtils.init();
            req.setMethod("POST")
            req.setToken(this.context.token);
            req.setBody(fileForm);

            return fetch("/upload", req)
                .then(res => res.json())
                .then((model: CollectionModel<UploadType>) => model._embedded.uploads)
                .then(uploads => uploads.map(upload => upload._links.self.href))
                .catch(error => console.error(error))
        } else {
            return new Array<string>();
        }
    }

    writePost(postData: Record<string, any>):Promise<EntityModel<PostType>> {
        const req = FetchUtils.init();
        req.setMethod("POST");
        req.setToken(this.context.token);
        req.setContentType("application/json");
        req.setBody(JSON.stringify(postData));

        return fetch("/post", req)
            .then(res => res.json())
            .catch(() => this.cancelUpload(postData))
    }

    cancelUpload(postData: Record<string, any>) {
        const req = FetchUtils.init();
        req.setMethod("DELETE");
        req.setToken(this.context.token);
        req.setContentType("application/json");
        req.setBody(postData["uploads"]);

        fetch("/upload", req)
            .catch((error) => console.error(error));
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        (async () => {
            const formData = new FormData(e.currentTarget);
            let postForm, fileForm;
            try {
                ({postForm, fileForm} = this.splitFormData(formData));
            } catch (error) {
                alert(error.message);
                return;
            }

            const postData: Record<string, any> = Object.fromEntries(postForm);
            postData['uploads'] = await this.upload(fileForm);
            const model = await this.writePost(postData);
            const path = model._links.self.href;
            const id = path.substring(path.lastIndexOf("/") + 1);
            document.location.href=`#/board/${id}`;
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