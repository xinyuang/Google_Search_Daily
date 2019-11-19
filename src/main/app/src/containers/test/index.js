/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import { Button, Col, Container, Form, FormGroup, Label, Input, Table } from 'reactstrap';

import type { News, NewsAddRequest, DelNewsRequest } from "../../data/modules/news";
import { refreshNews, requestNewsAdd, requestNewsDel } from "../../data/modules/news";

import type { AuthState } from '../../data/modules/auth';
import { Layout, Menu, Icon } from 'antd';

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

class test extends React.Component<Props, State> {
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
        console.log('add news! ',newsAddRequest)
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
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.img_url}</td>
                        <td>{item.news_url}</td>
                        <td>{item.category}</td>
                        <td>{item.title}</td>
                        <td>{item.content}</td>
                        <td><Button color="danger" value={item.id} onClick={e => this.handleDelNews(e)}>Delete</Button></td>
                    </tr>
                )
            });

            return (
                <Container className="mt-2 col-md-12">
                    <Table striped bordered>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Img_url</th>
                            <th>News_url</th>
                            <th>category</th>
                            <th>Title</th>
                            <th>Content</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loadedNews}
                        </tbody>
                    </Table>
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
                        <h1>Your Favorite News</h1>
                        Please sign in
                    </Container>
                </div>
            )
        }

        return (
            <div>
                <Container>
                    <h1>Your Favorite News</h1>
                    <Container>
                        <Form>
                            <FormGroup row>
                                <Label for="newsImage" sm={2}>News img</Label>
                                <Col sm={10}>
                                    <Input type="newsImage"
                                           name="Img_url"
                                           id="newsImage"
                                           placeholder="News img"
                                           value={Img_url}
                                           onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="News_url" sm={2}>News url</Label>
                                <Col sm={10}>
                                    <Input type="News_url"
                                           name="News_url"
                                           id="News_url"
                                           placeholder="News url"
                                           value={News_url}
                                           onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="News_Category" sm={2}>News category</Label>
                                <Col sm={10}>
                                    <Input type="News_Category"
                                           name="News_Category"
                                           id="News_Category"
                                           placeholder="News category"
                                           value={News_Category}
                                           onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="newsName" sm={2}>News Title</Label>
                                <Col sm={10}>
                                    <Input type="newsName"
                                           name="Title"
                                           id="newsName"
                                           placeholder="News Title"
                                           value={Title}
                                           onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="Content" sm={2}>News Content</Label>
                                <Col sm={10}>
                                    <Input type="Content"
                                           name="Content"
                                           id="Content"
                                           placeholder="News Content"
                                           value={Content}
                                           onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 10 }}>
                                    <Button onClick={e => this.handleAddNews(e)}>Submit</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Container>
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

export default connect(mapStateToProps, { refreshNews, requestNewsAdd,requestNewsDel })(test);
