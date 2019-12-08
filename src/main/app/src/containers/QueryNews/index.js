/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import { Col, Container, Form, FormGroup, Label, Input, Table } from 'reactstrap';

import type {News, BookMarkAddRequest} from "../../data/modules/news";
import {refreshQueryNews, requestBookMarkAdd, requestBookMarkDel} from "../../data/modules/news";

import type { AuthState } from '../../data/modules/auth';
import { Layout, Menu, Icon, Button, Checkbox } from 'antd';
import { Card } from 'antd';
import {Link} from "react-router-dom";
import Tag from "antd/es/tag";
import {getCurrentDate} from "../Shared/date";
import Star from "../Shared/star";
import auth from "../../data/modules/auth";
import dateFormat from "dateformat";

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


class QueryNews extends React.Component<Props, State> {
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
        this.props.refreshQueryNews();
    }

    displayNews(isLogin) {

        const { news } = this.props;
        if (news) {
            const loadedNews = news.map((item) => {
                let newsDate = dateFormat(item.datePublished, "dddd, mmmm dS, yyyy, h:MM:ss TT");
                return (
                    <div key={item.title}>
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
        console.log("query props",this.props)
        return (
            <div>
                <Container>
                    <h1 style={{marginTop : 30, marginLeft: 20}}>Search Results</h1>
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

export default connect(mapStateToProps, { refreshQueryNews, requestBookMarkAdd,requestBookMarkDel })(QueryNews);
