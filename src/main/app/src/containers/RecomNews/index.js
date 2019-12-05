/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import { Container } from 'reactstrap';

import type { News, NewsAddRequest, DelNewsRequest } from "../../data/modules/news";

import type { AuthState } from '../../data/modules/auth';

import { Layout,Card, Col, Row, Icon, Avatar  } from 'antd';
import {refreshPreference} from "../../data/modules/preference";

const { Meta } = Card;

const { Header, Sider, Content } = Layout;
type Props = {
    authState: AuthState,
    refreshPreference: () => void,
    news: Array<News>,
    preference: number
};

type State = {
    News_Category: string,
    Img_url: string,
    News_url: string,
    Title: string,
    Content: string
};

class RecomNews extends React.Component<Props, State> {
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
        this.props.refreshPreference();
    }

    displayNews() {

        const { news } = this.props;


        if (news) {

            const loadedNews = news.map((item) => {
                return (
                    <Col span={8}>
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
                    </Col>
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
                        <h1 style={{marginTop : 30}}>News you may be interested in ...</h1>
                        <Link to="/signin">Please sign in</Link>
                    </Container>
                </div>
            )
        }

        return (
            <div>
                <Container>
                    <h1 style={{marginTop : 30}}>You may be interested</h1>
                        <Row  gutter={16}>
                            <Col className="Row" span={8}>
                                <Card
                                    style={{ width: 300, marginBottom: "auto" }}
                                    cover={
                                        <img className="newsImg"
                                             alt="example"
                                             src="https://content.thriveglobal.com/wp-content/uploads/2019/07/Dream-Side-Business-Desk.jpg?w=1550"
                                        />
                                    }
                                >
                                    <Meta
                                        avatar={<Icon type="shopping" />}
                                        title="Business"
                                    />
                                </Card>
                            </Col>
                            <Col className="Row" span={8}>
                                <Card
                                    style={{ width: 300, marginBottom: "auto" }}
                                    cover={
                                        <img className="newsImg"
                                             alt="example"
                                             src="https://www.eventmanagerblog.com/wp-content/uploads/2018/10/350x215-FEAT-in-post-Entertainment.jpg"
                                        />
                                    }
                                >
                                    <Meta
                                        avatar={<Icon type="interaction" />}
                                        title="Entertainment"
                                    />
                                </Card>
                            </Col>
                            <Col className="Row" span={8}>
                                <Card
                                    style={{ width: 300, marginBottom: "auto" }}
                                    cover={
                                        <img className="newsImg"
                                             alt="example"
                                             src="https://d362armbx6l2g0.cloudfront.net/d362armbx6l2g0_cloudfront_net/Video-Poster/promo_newslettersignup_2x_f2756ffb5c172d269067ce311945acea.png"
                                        />
                                    }
                                >
                                    <Meta
                                        avatar={<Icon type="heart" />}
                                        title="Health"
                                    />
                                </Card>
                            </Col>
                            <Col className="Row" span={8}>
                                <Card
                                    style={{ width: 300, marginBottom: "auto" }}
                                    cover={
                                        <img className="newsImg"
                                             alt="example"
                                             src="https://www.voicesofyouth.org/sites/default/files/images/2019-01/politics3.jpg"
                                        />
                                    }
                                >
                                    <Meta
                                        avatar={<Icon type="heart" />}
                                        title="Politics"
                                    />
                                </Card>
                            </Col>
                            <Col className="Row" span={8}>
                                <Card
                                    style={{ width: 300, marginBottom: "auto" }}
                                    cover={
                                        <img className="newsImg"
                                             alt="example"
                                             src="https://i.cbc.ca/1.4833630.1537555507!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/global-internet-abstract.jpg"
                                        />
                                    }
                                >
                                    <Meta
                                        avatar={<Icon type="appstore" />}
                                        title="ScienceAndTechnology"
                                    />
                                </Card>
                            </Col>
                            <Col className="Row" span={8}>
                                <Card
                                    style={{ width: 300, marginBottom: "auto" }}
                                    cover={
                                        <img className="newsImg"
                                             alt="example"
                                             src="https://blog.studocu.com/wp-content/uploads/2016/10/slide1-image-tablet.png"
                                        />
                                    }
                                >
                                    <Meta
                                        avatar={<Icon type="dingding" />}
                                        title="Sports"
                                    />
                                </Card>
                            </Col>
                            <Col className="Row" span={8}>
                                <Card
                                    style={{ width: 300, marginBottom: "auto" }}
                                    cover={
                                        <img className="newsImg"
                                             alt="example"
                                             src="https://www.clayton.edu/international-student-services/Forms/images/intern636634593552534916.jpeg"
                                        />
                                    }
                                >
                                    <Meta
                                        avatar={<Icon type="interaction" />}
                                        title="World"
                                    />
                                </Card>
                            </Col>
                            <Col className="Row" span={8}>
                                <Card
                                    style={{ width: 300, marginBottom: "auto" }}
                                    cover={
                                        <img className="newsImg"
                                             alt="example"
                                             src="https://www.cmsschicago.org/wp-content/uploads/2018/11/US-News-and-World-Report.png"
                                        />
                                    }
                                >
                                    <Meta
                                        avatar={<Icon type="shopping" />}
                                        title="US"
                                    />
                                </Card>
                            </Col>

                            <Icon className="addTag" type="plus-square" />
                        </Row>

                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authState: state.auth,
        news: state.news.data,
        preference: state.preference.data
    };
}

export default connect(mapStateToProps, { refreshPreference })(RecomNews);
