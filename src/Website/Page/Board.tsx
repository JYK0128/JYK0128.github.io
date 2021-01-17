import React from 'react';
import {Link} from "react-router-dom";
import {Button, Table} from "react-bootstrap";
import UserContext from "../System/Context/UserContext";
import {PagedModel, EntityModel} from "hateoas-hal-types";
import FetchUtils from "../Utils/FetchUtils";
import PostType from "../System/Type/PostType";
import {stringify} from "qs";
import HalUtils from "../Utils/HalUtils";
import MemberType from "../System/Type/MemberType";

type Props = {};
type State = { page: number, size: number, data: any[] };
export default class Board extends React.Component<Props, State> {
    static contextType = UserContext;

    constructor(props: Props) {
        super(props);
        this.state = {
            page: 0,
            size: 10,
            data: []
        };

        this.fetchData = this.fetchData.bind(this);
    }

    //TODO: 성능 개선
    fetchData() {
        (async () => {
            const init = FetchUtils.init();
            const url = '/post?' + stringify(this.state);
            init.addHeaders({'Content-Type': 'Application/JSON'})
            const response = await fetch(url, init);
            const model: PagedModel<PostType> = await response.json();
            const posts = model._embedded.posts;
            const memberLinks = posts.map(post => post._links.writer);

            const members = await Promise.all(memberLinks.map((link) => HalUtils.getData<MemberType>(link)));
            const memberNames = members.map(member => member.nickname);
            const board = posts.map((post, index) => {
                const path = post._links.self.href;
                return {
                    id: path.substring(path.lastIndexOf("/") + 1),
                    tag: post.tag,
                    title: post.title,
                    writer: memberNames[index],
                    createDate: post.createDate,
                    views: post.views,
                }
            })
            this.setState({data: board})
        })();
    }

    componentDidMount() {
        this.fetchData()
    }

    tableHead() {
        return (
            <tr>
                <th>No</th>
                <th>tag</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성날짜</th>
                <th>조회수</th>
            </tr>
        )
    }

    onclick(index:number){
        document.location.href=`#/board/${index}`
    }

    //TODO: reverse sort
    tableBody() {
        const {page, size, data} = this.state;

        return data.map((post, index) => (
            <tr key={index} onClick={() => this.onclick(index)}>
                <td>{post.id}</td>
                <td>{post.tag}</td>
                <td>{post.title}</td>
                <td>{post.writer}</td>
                <td>{post.createDate}</td>
                <td>{post.views}</td>
            </tr>
        ));
    }

    render() {
        return (
            <div className={'offset-sm-2 col-sm-8'}>
                <h2>My Board</h2>
                <Link to="/editor">
                    <Button className="float-right"
                            disabled={!this.context.token}
                            variant={this.context.token ? "primary" : "outline-light"}>작성</Button>
                </Link>

                <Table striped hover>
                    <thead>{this.tableHead()}</thead>
                    <tbody>{this.tableBody()}</tbody>

                </Table>
            </div>
        );
    }
}