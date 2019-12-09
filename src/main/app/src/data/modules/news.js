// @flow
import axios from 'axios';
import type { Thunk } from '../';
import * as Names from "../../constants/names";

export type News = {imgUrl: string, newsUrl: string, category:string, title: string, content: string };
export type NewsAddRequest = {imgUrl: string, newsUrl: string, category:string, title: string, content: string};
export type DelNewsRequest = {newsUrl : number};
export type BookMarkAddRequest = {markDate: string, news: News}

type State = {
    status: 'stale' | 'loaded',
    data: News[]
}

type NewsRefreshedAction = {
    type: 'NEWS_REFRESHED',
    news: News[]
}

type Action = NewsRefreshedAction;

const defaultState: State = {
    status: 'stale',
    data: []
};

export default function reducer(state : State = defaultState, action : Action) : State {
    switch (action.type) {

        case 'NEWS_REFRESHED':
            return {
                status: 'loaded',
                data: action.news
            };

        default:
            return state;
    }
}

export function newsRefreshed(news: News[]) : NewsRefreshedAction {
    return {
        type: 'NEWS_REFRESHED',
        news
    };
}

export function refreshNews() : Thunk<NewsRefreshedAction> {

    // $FlowFixMe Flow complaining about the localstorage being null
    let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
    console.log(headerToken);
    return dispatch => {
        axios.get(`/api/markednews`,{
            headers: {authorization: headerToken}
        })
            .then(
                success => dispatch(newsRefreshed(success.data)),
                failure => console.log(failure)
            );
    };
}

export function requestNewsAdd(newsAddRequest: NewsAddRequest) : Thunk<NewsRefreshedAction> {

    // $FlowFixMe Flow complaining about the localstorage being null
    let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
    return dispatch => {
        axios.post('/api/favnews', newsAddRequest,{
            headers: {authorization: headerToken}
        })
            .then(
                success => dispatch(newsRefreshed(success.data)),
                failure => console.log(failure)
            );
    };
}


export function requestNewsDel(newsDelRequest: DelNewsRequest) : Thunk<NewsRefreshedAction> {

    // $FlowFixMe Flow complaining about the localstorage being null
    let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
    let newsUrl = newsDelRequest['newsUrl'];
    let url = '/api/delnews/' + newsUrl;
    return dispatch => {
        axios.post(url,null ,  {
            headers: {authorization: headerToken}
        } )
            .then(
                success => dispatch(newsRefreshed(success.data)),
                failure => console.log(failure)
            );
    };
}


export function refreshQueryNews(search_term: string) : Thunk<NewsRefreshedAction> {
    if (localStorage.getItem(Names.JWT_TOKEN))
    {
        // $FlowFixMe Flow complaining about the localstorage being null
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
        console.log("query sentence is: " ,search_term);
        return dispatch => {
            axios.get(`/api/querynews?offset=0&q=` + search_term,{
                headers: {authorization: headerToken}
            })
                .then(
                    success => dispatch(newsRefreshed(success.data)),
                    failure => console.log(failure)
                );
        };
    }
    else
    {
        return dispatch => {
            axios.get(`/api/querynews?offset=0&q=` + search_term)
                .then(
                    success => dispatch(newsRefreshed(success.data)),
                    failure => console.log(failure)
                );
        };
    }

}

export function refreshCategoryNews(newsCategory:string) : Thunk<NewsRefreshedAction> {
    if (newsCategory === 'Local')
    {
        // refreshLocalNews();
        console.log('???',newsCategory);
        return dispatch => {
            axios.get(`/api/categorynews?offset=0&category=US`)
                .then(
                    success => dispatch(newsRefreshed(success.data)),
                    failure => console.log(failure)
                );
        };
    }
    else
    {
        if (localStorage.getItem(Names.JWT_TOKEN))
        {
            // $FlowFixMe Flow complaining about the localstorage being null
            let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
            console.log("category api",newsCategory);
            console.log(headerToken);
            return dispatch => {
                axios.get(`/api/categorynews?offset=0&category=` + newsCategory,{
                    headers: {authorization: headerToken}
                })
                    .then(
                        success => dispatch(newsRefreshed(success.data)),
                        failure => console.log(failure)
                    );
            };
        }
        else
        {
            return dispatch => {
                axios.get(`/api/categorynews?offset=0&category=` + newsCategory)
                    .then(
                        success => dispatch(newsRefreshed(success.data)),
                        failure => console.log(failure)
                    );
            };
        }
    }


}

export function refreshHotNews() : Thunk<NewsRefreshedAction> {

    // $FlowFixMe Flow complaining about the localstorage being null
    if (localStorage.getItem(Names.JWT_TOKEN))
    {
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
        console.log(headerToken);
        return dispatch => {
            axios.get(`/api/topnews?offset=0`,{
                headers: {authorization: headerToken}
            })
                .then(
                    success => dispatch(newsRefreshed(success.data)),
                    failure => console.log(failure)
                );
        };
    }
    else
    {
        return dispatch => {
            axios.get(`/api/topnews?offset=0`)
                .then(
                    success => dispatch(newsRefreshed(success.data)),
                    failure => console.log(failure)
                );
        };
    }


}

export function refreshLocalNews() : Thunk<NewsRefreshedAction> {

    if (localStorage.getItem(Names.JWT_TOKEN))
    {
        // $FlowFixMe Flow complaining about the localstorage being null
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
        console.log(headerToken);
        return dispatch => {
            axios.get(`/api/querynewsbygeo?q=&radius=100`,{
                headers: {authorization: headerToken}
            })
                .then(
                    success => dispatch(newsRefreshed(success.data)),
                    failure => console.log(failure)
                );
        };
    }
    else
    {
        return dispatch => {
            axios.get(`/api/querynewsbygeo?q=&radius=100`)
                .then(
                    success => dispatch(newsRefreshed(success.data)),
                    failure => console.log(failure)
                );
        };
    }

}

export function refreshSavedNews() : Thunk<NewsRefreshedAction> {

    // $FlowFixMe Flow complaining about the localstorage being null
    let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;

    return dispatch => {
        axios.get(`/api/allbookmarks/`,{
            headers: {authorization: headerToken}
        })
            .then(
            success => dispatch(newsRefreshed(success.data[0])),
            failure => console.log(failure)
        );
    };
}

export function requestBookMarkAdd(bookMarkAddRequest: BookMarkAddRequest) : Thunk<NewsRefreshedAction> {

    // $FlowFixMe Flow complaining about the localstorage being null
    let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
    return dispatch => {
        axios.post('/api/addbookmark/', bookMarkAddRequest,{
            headers: {authorization: headerToken}
        });
    };
}

export function requestBookMarkDel(news: News) : Thunk<NewsRefreshedAction> {

    // $FlowFixMe Flow complaining about the localstorage being null
    let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
    return dispatch => {
        axios.post('/api/deletebookmark/', news,{
            headers: {authorization: headerToken}
        });
    };
}

