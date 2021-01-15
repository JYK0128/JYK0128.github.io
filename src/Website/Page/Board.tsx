import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import UserContext from "../System/Context/UserContext";
import {EntityModel, PagedModel} from "hateoas-hal-types";
import FetchUtils from "../Utils/FetchUtils";
import PostType from "../System/Type/PostType";
import HalUtils from "../Utils/HalUtils";
import MemberType from "../System/Type/MemberType";
import {stringify} from "qs";

type Props = {};
type State = { page: number, size: number };
export default class Board extends React.Component<Props, State> {
    static contextType = UserContext;
    private tableRef: React.RefObject<HTMLTableElement>;

    constructor(props: Props) {
        super(props);
        this.state = {
            page: 0,
            size: 10
        };

        this.tableRef = React.createRef<HTMLTableElement>();
        this.renderTable = this.renderTable.bind(this);
    }

    renderTable() {
        const url = '/post?' + stringify(this.state);
        const init = FetchUtils.init();
        init.addHeaders({'Content-Type': 'Application/JSON'})

        fetch(url, init)
            .then(response => response.json())
            .then((json:PagedModel<PostType>) => json._embedded.posts)
            .then(posts => posts.forEach(async (post, index) => {
                if (this.tableRef.current) {
                    const row = this.tableRef.current.insertRow();
                    const writer = await HalUtils.getData<MemberType>(post._links.writer);

                    row.insertCell(0).innerText = String(this.state.page * this.state.size + index + 1);
                    row.insertCell(1).innerText = post['tag'];
                    row.insertCell(2).innerText = post['title'];
                    row.insertCell(3).innerText = writer['nickname'];
                    row.insertCell(4).innerText = post['createDate'].toString();
                    row.insertCell(5).innerText = post['views'].toString();

                    row.onclick = () => {
                        const url = new URL(post._links.self.href);
                        const path = url.pathname;
                        const id = path.substring(path.lastIndexOf("/") + 1);
                        document.location.href=`#/board/${id}`
                    }
                    row.style.cursor = "pointer";
                    row.onmouseover = () => row.style.backgroundColor = '#FFF4E9';
                    row.onmouseout = () => row.style.backgroundColor = '';
                }
            }))
            .catch(() => console.error());
    }

    componentDidMount() {
        this.renderTable();
    }

    render() {
        return (
            <div className={'offset-sm-2 col-sm-8'}>
                <h2>My Board</h2>
                <Link to="/editor">
                    <Button className="float-right"
                            disabled={!this.context.token}
                            variant={this.context.token? "primary":"outline-light"}>작성</Button>
                </Link>

                <table className="table" ref={this.tableRef}>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Tag</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성날짜</th>
                        <th>조회수</th>
                    </tr>
                    </thead>
                </table>
            </div>
        );
    }
}