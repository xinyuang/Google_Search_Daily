/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import { Col, Container, Form, FormGroup, Label, Input, Table } from 'reactstrap';

import type {News, BookMarkAddRequest} from "../../data/modules/news";
import { requestBookMarkDel, requestBookMarkAdd,  refreshSavedNews } from "../../data/modules/news";

import type { AuthState } from '../../data/modules/auth';
import {Layout, Menu, Icon, Select} from 'antd';
import { Card } from 'antd';
import {Link} from "react-router-dom";
import { Tabs } from 'antd';
import Star from "../Shared/star";
import { Button} from 'antd';
import store from '../../store'
import '../../index.css';

const ButtonGroup = Button.Group;
const { Option } = Select;
const { TabPane } = Tabs;
// const { Header, Sider, Content } = Layout;



type Props = {
    authState: AuthState,
    refreshSavedNews: () => void,
    requestBookMarkAdd:(bookMarkAddRequest: BookMarkAddRequest) => void,
    requestBookMarkDel:(news: News) => void,
    // switchCategory:() => void,
    news: Array<News>,
    // switchCategory : (filter) => void
};

type State = {
    News_Category: string,
    Img_url: string,
    News_url: string,
    Title: string,
    Content: string,
    tabPosition: 'top'
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
            content: '',
            text:'All',
            collapsed: false,
        };
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
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
                    <div >
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
                              style={{ height: "250px", borderRadius: "8px", margin: "8px" }}
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
                <Container className="mt-2 col-md-12" >
                    {loadedNews}
                </Container>
            )
        }

        return null;
    }
    handleChange = e => {
        console.log("Switch category to ",e.key)
        store.dispatch({type:'SET_VISIBILITY_FILTER',filter:e.key})
        this.setState({text:e.key});
        return this.render();
    }
    be
    render() {

        const { Img_url, News_url,News_Category, Title, Content } = this.state;
        const { authState } = this.props;
        console.log(this.props)
        // const {switchCategory} = this.props;
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
                    <h1 style={{marginTop : 30}} id="textH1">Topics</h1>
                    <h1 id="textH2">{this.state.text}</h1>
                    <div>
                        <Menu
                              onClick = {this.handleChange}
                              defaultActiveKey={'All'}
                              inlineCollapsed={this.state.collapsed}
                              mode = "horizontal"
                        >
                            <Menu.Item key = "All">
                                <Icon type="google" />
                                <span style={{left:"0"}}>All</span>
                            </Menu.Item>
                            <Menu.Item key = "Health">
                                <Icon type="medicine-box"/>
                                <span style={{left:"0"}}>Health</span>
                            </Menu.Item>
                            <Menu.Item key = "Business">
                                <Icon type="money-collect"/>
                                <span style={{left:"0"}}>Business</span>
                            </Menu.Item>
                            <Menu.Item key = "Entertainment">
                                <Icon type="customer-service" />
                                <span style={{left:"0"}}> Entertainment</span>
                            </Menu.Item>
                            <Menu.Item key = "Politics">
                                <Icon type="team" />
                                <span style={{left:"0"}}>Politics</span>
                            </Menu.Item>
                            <Menu.Item key = "Science and Technology">
                                <Icon type="rocket" />
                                <span style={{left:"0"}}>Science and Technology</span>
                            </Menu.Item>
                            <Menu.Item key = "Sports">
                                <Icon type="smile" />
                                <span style={{left:"0"}}>Sports</span>
                            </Menu.Item>
                            <Menu.Item key = "World">
                                <Icon type="global" />
                                <span style={{left:"0"}}>World</span>
                            </Menu.Item>
                            <Menu.Item key = "US">
                                <Icon type="bank" />
                                <span style={{left:"0"}}>US</span>
                            </Menu.Item>
                        </Menu>
                        {this.displayNews({isLogin})}
                    </div>
                </Container>
            </div>
        )
    }
}

// public enum NewsCategory {
//     Business, Entertainment,Health,Politics,ScienceAndTechnology,Sports,World,US
// }
const getVisibleNews = (news, filter) => {
    switch (filter) {
        case 'All':
            return news.data
        case 'Business':
            return news.data.filter(function(x){return x.category === "Business"});
        case 'Entertainment':
            return news.data.filter(function(x){return x.category === "Entertainment"});
        case 'Health':
            return news.data.filter(function(x){return x.category === "Health"});
        case 'Politics':
            return news.data.filter(function(x){return x.category === "Politics"});
        case 'Science and Technology':
            return news.data.filter(function(x){return x.category === "ScienceAndTechnology"});
        case 'Sports':
            return news.data.filter(function(x){return x.category === "Sports"});
        case 'World':
            return news.data.filter(function(x){return x.category === "World"});
        case 'US':
            return news.data.filter(function(x){return x.category === "US"});
    }
};


const mapStateToProps = state =>( {
        authState: state.auth,
        news: getVisibleNews(state.news, state.visibilityFilter)
});

// const mapDispatchToProps = dispatch => {
//     return {
//         switchCategory: (ct) => dispatch(setVisibilityFilter(ct)),
//         requestBookMarkAdd: (request) => dispatch(requestBookMarkAdd(request)),
//         requestBookMarkDel: (news) => dispatch(requestBookMarkDel(news)),
//         refreshSavedNews: ()=>{refreshSavedNews()}
//     }
// }
export default connect(mapStateToProps, {requestBookMarkAdd,requestBookMarkDel,refreshSavedNews})(FavNews);
