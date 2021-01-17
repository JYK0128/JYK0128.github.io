import React from "react";
import {RouteComponentProps} from "react-router-dom";
import {EntityModel, CollectionModel} from "hateoas-hal-types";
import UserContext from "../System/Context/UserContext";
import PostType from "../System/Type/PostType";
import HalUtils from "../Utils/HalUtils";
import MemberType from "../System/Type/MemberType";
import UploadType from "../System/Type/UploadType";
import {Button} from "react-bootstrap";

type Props = RouteComponentProps<{ id: string }>
type State = {}
export default class Post extends React.Component<Props, State>{
    static contextType = UserContext;

    private writerRef: React.RefObject<HTMLDivElement>;
    private titleRef: React.RefObject<HTMLDivElement>;
    private tagRef: React.RefObject<HTMLDivElement>;
    private createDateRef: React.RefObject<HTMLDivElement>;
    private modifiedDateRef: React.RefObject<HTMLDivElement>;
    private viewCountRef: React.RefObject<HTMLDivElement>;
    private commentCountRef: React.RefObject<HTMLDivElement>;
    private contentRef: React.RefObject<HTMLDivElement>;
    private uploadListRef: React.RefObject<HTMLDivElement>;
    private commentListRef: React.RefObject<HTMLTableElement>;

    private readonly id: string;
    constructor(props:Props) {
        super(props);
        this.id = this.props.match.params.id;

        this.writerRef = React.createRef<HTMLDivElement>();
        this.titleRef = React.createRef<HTMLDivElement>();
        this.tagRef = React.createRef<HTMLDivElement>();

        this.createDateRef = React.createRef<HTMLDivElement>();
        this.modifiedDateRef = React.createRef<HTMLDivElement>();

        this.viewCountRef = React.createRef<HTMLDivElement>();
        this.commentCountRef = React.createRef<HTMLDivElement>();

        this.contentRef = React.createRef<HTMLDivElement>();
        this.uploadListRef = React.createRef<HTMLDivElement>();
        this.commentListRef = React.createRef<HTMLTableElement>();
    }

    componentDidMount() {
        const init = {method: "GET"};

        //TODO: error
        fetch("/post/" + this.id, init)
            .then(res => res.json())
            .then((json: EntityModel<PostType>) => {
                const writerPromise = HalUtils.getData<MemberType>(json._links.writer)
                writerPromise.then(member => this.writerRef.current!.innerText = member.nickname)

                this.titleRef.current!.innerText = json.title;
                this.tagRef.current!.innerText = json.tag;
                this.contentRef.current!.innerText = json.content;
                this.createDateRef.current!.innerText = json.createDate.toString();
                this.modifiedDateRef.current!.innerText = json.modifiedDate.toString();
                this.viewCountRef.current!.innerText = json.views.toString();
                this.commentCountRef.current!.innerText = "테스트";

                const uploadListPromise = HalUtils.getData<CollectionModel<UploadType>>(json._links.uploads)
                uploadListPromise.then(uploads => console.log(JSON.stringify(uploads._embedded.uploads)))
                this.uploadListRef.current!.innerText = "테스트";
                this.commentListRef.current!.innerText = "테스트";
            })
    }

    render() {
        return (
            <div className={'offset-sm-2 col-sm-8'}>
                <h1 ref={this.titleRef}></h1>

                <div>writer</div>
                <div ref={this.writerRef}></div>
                <div>publisqhed</div>
                <div ref={this.createDateRef}></div>
                <div>modified</div>
                <div ref={this.modifiedDateRef}></div>
                <div>views</div>
                <div ref={this.viewCountRef}></div>
                <div>comments</div>
                <div ref={this.commentCountRef}></div>


                <div>tag</div>
                <div ref={this.tagRef}></div>
                <div>본문</div>
                <div ref={this.contentRef}></div>
                <div>첨부파일</div>
                <div ref={this.uploadListRef}></div>
                <div>댓글</div>
                <input/>
                <Button>OK</Button>
                <div ref={this.commentListRef}></div>
            </div>
        );
    }
}