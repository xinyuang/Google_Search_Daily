/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import { Col, Container, Form, FormGroup, Label, Input, Table } from 'reactstrap';

import type {News, BookMarkAddRequest} from "../../data/modules/news";
import { requestBookMarkDel, requestBookMarkAdd,  refreshSavedNews } from "../../data/modules/news";

import type { AuthState } from '../../data/modules/auth';
import { Layout, Menu, Icon } from 'antd';
import { Card } from 'antd';
import {Link} from "react-router-dom";
// import { Tabs } from 'antd';
import Star from "../Shared/star";
import { Button } from 'antd';
import store from '../../store'
const ButtonGroup = Button.Group;

// const { TabPane } = Tabs;
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
            content: '',
        };
    }

    componentDidMount() {
        this.props.refreshSavedNews();
    }


    tab_callback(key) {
        console.log(key);
    }

    // switchCategory=()=>{
    //     store.dispatch({
    //
    //         }
    //     )
    // }

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
        console.log(this.props)
        // const {switchCategory} = this.props;
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
                    <h1 style={{marginTop : 30}}>You may like ...</h1>
                    <div>
                        <ButtonGroup>
                            <Button autoFocus={true} onClick={()=>{store.dispatch({type:'SET_VISIBILITY_FILTER',filter:'SHOW_ALL'})}}>
                                All
                            </Button>
                            <Button onClick={()=>{store.dispatch({type:'SET_VISIBILITY_FILTER',filter:'SHOW_BUSINESS'})}}>
                                Business
                            </Button>

                            <Button onClick={()=>{store.dispatch({type:'SET_VISIBILITY_FILTER',filter:'SHOW_ENTERTAINMENT'})}}>
                                Entertainment
                            </Button>

                            <Button onClick={()=>{store.dispatch({type:'SET_VISIBILITY_FILTER',filter:'SHOW_HEALTH'})}}>
                                Health
                            </Button>

                            <Button onClick={()=>{store.dispatch({type:'SET_VISIBILITY_FILTER',filter:'SHOW_POLITICS'})}}>
                                Politics
                            </Button>

                            <Button onClick={()=>{store.dispatch({type:'SET_VISIBILITY_FILTER',filter:'SHOW_SCIENCEANDTECHNOLOGY'})}}>
                                ScienceAndTechnology
                            </Button>

                            <Button onClick={()=>{store.dispatch({type:'SET_VISIBILITY_FILTER',filter:'SHOW_SPORTS'})}}>
                                Sports
                            </Button>

                            <Button onClick={()=>{store.dispatch({type:'SET_VISIBILITY_FILTER',filter:'SHOW_WORLD'})}}>
                                World
                            </Button>

                            <Button onClick={()=>{store.dispatch({type:'SET_VISIBILITY_FILTER',filter:'SHOW_US'})}}>
                                US
                            </Button>
                        </ButtonGroup>
                    </div>
                    {this.displayNews()}
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
        case 'SHOW_ALL':
            return news.data
        case 'SHOW_BUSINESS':
            return news.data.filter(function(x){return x.category === "Business"});
        case 'SHOW_ENTERTAINMENT':
            return news.data.filter(function(x){return x.category === "Entertainment"});
        case 'SHOW_HEALTH':
            return news.data.filter(function(x){return x.category === "Health"});
        case 'SHOW_POLITICS':
            return news.data.filter(function(x){return x.category === "Politics"});
        case 'SHOW_SCIENCEANDTECHNOLOGY':
            return news.data.filter(function(x){return x.category === "ScienceAndTechnology"});
        case 'SHOW_SPORTS':
            return news.data.filter(function(x){return x.category === "Sports"});
        case 'SHOW_WORLD':
            return news.data.filter(function(x){return x.category === "World"});
        case 'SHOW_US':
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
