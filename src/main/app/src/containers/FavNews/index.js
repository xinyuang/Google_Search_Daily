/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import { Button, Col, Container, Form, FormGroup, Label, Input, Table } from 'reactstrap';

import type {News, BookMarkAddRequest} from "../../data/modules/news";
import { requestBookMarkDel, requestBookMarkAdd,  refreshSavedNews } from "../../data/modules/news";

import type { AuthState } from '../../data/modules/auth';
import { Layout, Menu, Icon } from 'antd';
import { Card } from 'antd';
import {Link} from "react-router-dom";
import { Tabs } from 'antd';
import Star from "../Shared/star";

const { TabPane } = Tabs;
const { Header, Sider, Content } = Layout;

type Props = {
    authState: AuthState,
    refreshSavedNews: () => void,
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

class FavNews extends React.Component<Props, State> {
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
        this.props.refreshSavedNews();
    }


    tab_callback(key) {
        console.log(key);
    }

    displayNews(isLogin) {

        const { news } = this.props;
        if (news) {

            const loadedNews = news.map((item) => {
                return (
                    <div>
                        <Card key={item.newsUrl} title={<div><a href={item.newsUrl} target="_blank">{item.title} </a>  <p>{item.datePublished}</p></div> }
                              extra={
                                  <Star key={item.newsUrl}
                                        data={item}
                                        marked={true}
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
                <Container className="mt-2 col-md-12">
                        {loadedNews}
                </Container>
            )
        }

        return null;
    }

    render() {

        const { Img_url, News_url,News_Category, Title, Content } = this.state;
        const { authState } = this.props;
        const isLogin = authState.signedIn;

        if (!authState.signedIn) {
            return (
                <div>
                    <Container>
                        <h1 style={{marginTop : 30}}>Your Saved News</h1>
                        <Link to="/signin">Please sign in</Link>
                    </Container>
                </div>
            )
        }

        return (
            <div>
                <Container>
                    <h1 style={{marginTop : 30}}>Your Saved News</h1>
                    <Tabs onChange={this.tab_callback} type="card">
                        <TabPane tab="International" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Business" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Technology" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
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

export default connect(mapStateToProps, {  requestBookMarkAdd,requestBookMarkDel,refreshSavedNews })(FavNews);
