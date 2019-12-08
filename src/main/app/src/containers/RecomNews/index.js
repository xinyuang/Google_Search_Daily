/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import { Container } from 'reactstrap';
import type { News, NewsAddRequest, DelNewsRequest } from "../../data/modules/news";

import type { AuthState } from '../../data/modules/auth';

import { Layout,Card, Col, Row, Icon, Switch  } from 'antd';
import {refreshPreference} from "../../data/modules/preference";
import {requestPreferAdd, requestPreferDel} from "../../data/modules/news";

const { Meta } = Card;

const { Header, Sider, Content } = Layout;

class PreferCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Prefer: true
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(checked) {
        this.setState({
            Prefer: checked,
        });
        if(checked) {
            console.log(this.props.idx[0],"add");
            this.props.addPrefer(this.props.idx[0]);
        }
        else {
            console.log(this.props.idx[0],"del");
            this.props.delPrefer(this.props.idx[0]);
        }
    }

    render() {
        console.log(this.props);
        return (
            <Card
                style={{ width: 300, marginBottom: "auto" }}
                cover={
                    <img className="newsImg"
                         alt="example"
                         src={this.props.card.newsCategory[this.props.idx[0]].src}
                    />
                }
            >
                <div className="newsBox">
                    <Meta className="meta"
                          avatar={<Icon type={this.props.card.newsCategory[this.props.idx[0]].icon} />}
                          title={this.props.card.newsCategory[this.props.idx[0]].title}
                    />
                    <Switch style=
                                {this.state.Prefer ?  {"backgroundColor": "rgba(0,0,255,0.5)"} : {"backgroundColor":""}}
                            defaultChecked onChange={this.onChange} />
                </div>

            </Card>
        )
    }



}

class PreferenceCard extends React.Component {
    constructor() {
        super();
        this.state = {
            newsCategory: {
                1: { title : "Business", icon: "shopping", src : "https://content.thriveglobal.com/wp-content/uploads/2019/07/Dream-Side-Business-Desk.jpg?w=1550"},
                2: { title : "Entertainment", icon: "interaction", src : "https://www.eventmanagerblog.com/wp-content/uploads/2018/10/350x215-FEAT-in-post-Entertainment.jpg"},
                3: { title : "Health", icon: "heart", src : "https://d362armbx6l2g0.cloudfront.net/d362armbx6l2g0_cloudfront_net/Video-Poster/promo_newslettersignup_2x_f2756ffb5c172d269067ce311945acea.png"},
                4: { title : "Politics", icon: "heart", src : "https://www.voicesofyouth.org/sites/default/files/images/2019-01/politics3.jpg"},
                5: { title : "ScienceAndTechnology", icon: "appstore", src : "https://i.cbc.ca/1.4833630.1537555507!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/global-internet-abstract.jpg"},
                6: { title : "Sports", icon: "dingding", src : "https://blog.studocu.com/wp-content/uploads/2016/10/slide1-image-tablet.png"},
                7: { title : "World", icon: "interaction", src : "https://www.clayton.edu/international-student-services/Forms/images/intern636634593552534916.jpeg"},
                8: { title : "US", icon: "shopping", src : "https://www.cmsschicago.org/wp-content/uploads/2018/11/US-News-and-World-Report.png"},
                9: { title : "Local", icon: "home", src: "https://whitespark.ca/wp-content/uploads/2016/03/LocalInsider-hero.png"}
            },
        }
    }

    render() {
        console.log('parent ',this.props);
        return(
            <div>
                {
                    this.props.preference.map(item => {
                        return(
                            <Col key={item} className="Row" span={8}>
                                <PreferCard
                                    card={this.state}
                                    idx={item}
                                    addPrefer={this.props.addPrefer}
                                    delPrefer={this.props.delPrefer}
                                />
                            </Col>
                        )
                    })
                }
            </div>
        )
    }
}

class RecomNews extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.refreshPreference();
    }

    render() {

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
                    <h1 style={{marginTop : 30}}>You may be interested in ...</h1>
                        <Row  gutter={16}>
                            <PreferenceCard
                                preference={this.props.preference}
                                addPrefer={this.props.requestPreferAdd}
                                delPrefer={this.props.requestPreferDel}
                            />
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
        preference: state.preference.data
    };
}

export default connect(mapStateToProps, { refreshPreference,requestPreferAdd,requestPreferDel })(RecomNews);