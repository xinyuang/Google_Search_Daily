import React from 'react';
import { connect } from 'react-redux';

import { Col, Container, Form, FormGroup, Label, Input, Table } from 'reactstrap';

import type {News, BookMarkAddRequest} from "../../data/modules/news";
import {refreshHotNews, requestBookMarkAdd, requestBookMarkDel} from "../../data/modules/news";

import type { AuthState } from '../../data/modules/auth';
import { Layout, Menu, Icon, Button, Checkbox } from 'antd';
import { Card } from 'antd';
import {Link} from "react-router-dom";
import Tag from "antd/es/tag";
import {getCurrentDate} from "../Shared/date";
import Star from "../Shared/star";
import auth from "../../data/modules/auth";

const { Header, Sider, Content } = Layout;

type Props = {
    authState: AuthState,
    refreshHotNews: () => void,
    requestBookMarkAdd:(bookMarkAddRequest: BookMarkAddRequest) => void,
    requestBookMarkDel:(news: News) => void,
    news: Array<News>
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
            content: ''
        };
    }

    componentDidMount() {
        this.props.refreshHotNews();
    }

    displayNews(isLogin) {

        const { news } = this.props;
        if (news) {
            const loadedNews = news.map((item) => {
                return (
                    <div key={item.title} >
                        <Card title={<div><a href={item.newsUrl} target="_blank">{item.title} </a>  <p>{item.datePublished}</p></div> }
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
                                    alt="example"
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
                                        <Tag className="tag" color="magenta">magenta</Tag>
                                        <Tag className="tag" color="red">red</Tag>
                                        <Tag className="tag" color="volcano">volcano</Tag>
                                        <Tag className="tag" color="orange">orange</Tag>
                                        <Tag className="tag" color="gold">gold</Tag>
                                        <Tag className="tag" color="lime">lime</Tag>
                                        <Tag className="tag" color="green">green</Tag>
                                        <Tag className="tag" color="cyan">cyan</Tag>
                                        <Tag className="tag" color="blue">blue</Tag>
                                        <Tag className="tag" color="geekblue">geekblue</Tag>
                                        <Tag className="tag" color="purple">purple</Tag>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
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
                    <h1 style={{marginTop : 30, marginLeft: 20}}>Headlines</h1>
                    {this.displayNews({isLogin})}
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authState: state.auth,
        news: state.news.data
    };
}

export default connect(mapStateToProps, { refreshHotNews, requestBookMarkAdd,requestBookMarkDel })(HotNews);