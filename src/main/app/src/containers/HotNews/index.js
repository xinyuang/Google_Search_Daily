import React from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import { Col, Container, Form, FormGroup, Label, Input, Table } from 'reactstrap';

import type {News, BookMarkAddRequest} from "../../data/modules/news";
import {refreshHotNews, refreshQueryNews, requestBookMarkAdd, requestBookMarkDel} from "../../data/modules/news";

import type { AuthState } from '../../data/modules/auth';
import { Layout, Menu, Icon, Button, Checkbox } from 'antd';
import { Card } from 'antd';
import {Link} from "react-router-dom";
import Tag from "antd/es/tag";
import {getCurrentDate} from "../Shared/date";
import Star from "../Shared/star";
import auth from "../../data/modules/auth";
import {refreshHotTopic} from "../../data/modules/topK";

const { Header, Sider, Content } = Layout;

type Props = {
    authState: AuthState,
    refreshHotNews: (cur_idx:string) => void,
    refreshHotTopic: () => void,
    requestBookMarkAdd:(bookMarkAddRequest: BookMarkAddRequest) => void,
    requestBookMarkDel:(news: News) => void,
    news: Array<News>,
    topics: string[]
};

type State = {
    News_Category: string,
    Img_url: string,
    News_url: string,
    Title: string,
    Content: string
};


class HotNews extends React.Component<Props, State> {
    props: Props;
    state: State;

    constructor(props) {
        super(props);
        this.state = {
            category: '',
            imgUrl: '',
            newsUrl: '',
            title: '',
            datePublished:'',
            content: '',
            colors: ["magenta","red","volcano","orange","gold","lime","green","cyan","blue","purple"],
            cur_idx: 0,
            newsList: []
        };
        this.addNews = this.addNews.bind(this);
    }

    componentDidMount() {
        this.props.refreshHotNews();
        this.props.refreshHotTopic();
        this.addNews();
    }

    addNews() {
        this.setState({
            newsList: [...this.state.newsList,...this.props.news]
        })
    }

    displayNews(isLogin) {

        // const { news } = this.props;
        const { topics } = this.props;
        const news = this.state.newsList;
        console.log(this.props);
        if (news) {
            const loadedTopics = topics.map((item,index) => {
                console.log(item, this.state.colors[index]);
                return (
                    <Tag key={item} className="tag" color={this.state.colors[index]}
                         onClick={()=>{this.props.refreshQueryNews(item)}}
                         // onClick={console.log("tag ???" ,item)}
                    >
                            {item}
                    </Tag>

                )
            });

            const loadedNews = news.map((item) => {
                let newsDate = dateFormat(item.datePublished, "dddd, mmmm dS, yyyy, h:MM:ss TT");
                return (
                    <div key={item.title} >
                        <Card title={<div><a href={item.newsUrl} target="_blank">{item.title} </a>  <p>{newsDate}</p></div> }
                              extra={
                                  <Star key={item.newsUrl}
                                        data={item}
                                        marked={false}
                                        visible={isLogin}
                                        requestBookMarkAdd={this.props.requestBookMarkAdd}
                                        requestBookMarkDel={this.props.requestBookMarkDel}
                                  />
                              }
                              style={{ width: "700px", borderRadius: "8px", margin: "8px" }}
                        >
                            <div className="newsBox">

                                <img
                                    alt=""
                                    src={item.imgUrl}
                                    style={{ marginRight: 10}}
                                />
                                <p>{item.content}</p>
                            </div>
                        </Card>
                    </div>
                )
            });

            return (
                <Container className="mt-2 col-md-12 flex-column">
                    <div className="newsBox">
                        <div className="grow-1">
                            {loadedNews}
                        </div>
                        <div className="grow-3">
                            <Card title="Hot Topics"
                                  style={{ width: "100%", borderRadius: "8px", margin: "8px"}}
                            >
                                <div className="newsBox">
                                    <div>
                                        {loadedTopics}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <button onClick={
                        ()=>{
                            this.setState({cur_idx:this.state.cur_idx + 12});
                            this.props.refreshHotNews(this.state.cur_idx);
                            this.addNews()
                            console.log(this.state.cur_idx, " click " , this.state);

                        }
                    }>More...</button>
                </Container>
            )
        }

        return null;
    }

    render() {
        const { Img_url, News_url,News_Category, Title, Content } = this.state;
        const { authState } = this.props;
        const isLogin = authState.signedIn;
        return (
            <div>
                <Container>
                    {/*<h1 style={{marginTop : 30, marginLeft: 20}}>Headlines</h1>*/}
                    <h1 id="textH3">Headlines</h1>
                    {this.displayNews({isLogin})}
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authState: state.auth,
        news: state.news.data,
        topics: state.topK.data
    };
}

export default connect(mapStateToProps, { refreshHotNews, refreshHotTopic, requestBookMarkAdd,requestBookMarkDel,refreshQueryNews })(HotNews);