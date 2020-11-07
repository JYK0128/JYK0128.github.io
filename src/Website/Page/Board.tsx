import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

type Props = {};
type State = { page: number, size: number };
export default class Board extends React.Component<Props, State> {
    private tbodyRef: React.RefObject<HTMLTableElement >;

    constructor(props: Props) {
        super(props);
        this.state = {
            page: 0,
            size: 10
        };

        this.tbodyRef = React.createRef<HTMLTableElement >();
        this.renderTable = this.renderTable.bind(this);
    }

    renderTable() {
        const url = '/post?' +
            'page=' + this.state.page +
            '&size=' + this.state.size;

        const request = {
            method: 'get',
            headers: {
                'Content-Type': 'Application/JSON',
                'Access-Control-Allow-Origin': 'true'
            },
        }

         fetch(url, request)
            .then(response => response.json())
             .then(test => {
                 console.log(test);
                 return test;
             })
            .then(json => json['_embedded']['posts'])
            .then(posts => posts.forEach((post:any, index:number)=>{
                if(this.tbodyRef.current){
                    const row = this.tbodyRef.current.insertRow();
                    row.insertCell(0).innerText = String(this.state.page * this.state.size + index); // index
                    row.insertCell(1).innerText = post['tag']; // tag
                    row.insertCell(2).innerText = post['title']; // title
                    row.insertCell(3).innerText = 'none';  //writer
                    row.insertCell(4).innerText = post['post_date']; // date
                    row.insertCell(5).innerText = '0'; //view

                    row.onclick = () => alert(post['content']);
                    row.style.cursor = "pointer";
                    row.onmouseover = () => row.style.backgroundColor='#FFF4E9';
                    row.onmouseout = () => row.style.backgroundColor='';
                }
                console.log(post, index)
            }))
            .catch(error => console.error());
    }

    componentDidMount() {this.renderTable();}
    render() {
        return (
            <div className={'min-vh-100 offset-sm-2 col-sm-8'}>
                <h2>My Board</h2>

                <Link to="/editor">
                    <Button color="white" className="float-right"
                            style={{display: this.context.username ? 'none':''}} variant={'primary'}>작성</Button>
                </Link>
                <table className="table"  ref = {this.tbodyRef}>
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