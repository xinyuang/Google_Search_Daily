/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import { Button, Col, Container, Form, FormGroup, Label, Input, Table } from 'reactstrap';

import type { News, NewsAddRequest, DelNewsRequest } from "../../data/modules/news";
import { refreshNews, requestNewsAdd, requestNewsDel } from "../../data/modules/news";

import type { AuthState } from '../../data/modules/auth';
import { Layout, Menu, Icon } from 'antd';
import { Card } from 'antd';
import {Link} from "react-router-dom";

const { Header, Sider, Content } = Layout;
type Props = {
    authState: AuthState,
    refreshNews: () => void,
    requestNewsAdd:(newsAddRequest: NewsAddRequest) => void,
    requestNewsDel:(newsDelRequest: number) => void,
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
            img_url: '',
            news_url: '',
            title: '',
            content: '',
            newsId: -1
        };
    }

    componentDidMount() {
        this.props.refreshNews();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleAddNews(event) {
        event.preventDefault();

        const { News_Category, Img_url, News_url, Title, Content} = this.state;


        const newsAddRequest: NewsAddRequest = { category: News_Category, img_url: Img_url, news_url: News_url, title: Title, content: Content};
        console.log(newsAddRequest)
        this.props.requestNewsAdd(newsAddRequest);
    }

    handleDelNews(e) {
        e.preventDefault();
        console.log(e.target.value);
        // this.setState({ delnewsid: e.target.value });
        const delNewsRequest: DelNewsRequest = { newsId: e.target.value};
        console.log(delNewsRequest)
        this.props.requestNewsDel(delNewsRequest);
    }

    displayNews() {

        const { news } = this.props;
        console.log(this.props);

        if (news) {

            const loadedNews = news.map((item) => {
                return (
                    <div>
                        <Card title={<a href={item.news_url} target="_blank">{item.title} </a>} extra={<Icon type="star" />}
                            style={{ width: "70%" }}
                        >
                            <div className="newsBox">
                            <img
                                alt="example"
                                src={item.img_url}
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
                    {this.displayNews()}
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

export default connect(mapStateToProps, { refreshNews, requestNewsAdd,requestNewsDel })(FavNews);
