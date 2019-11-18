// @flow
import axios from 'axios';
import type { Thunk } from '../';
import * as Names from "../../constants/names";

export type News = { id: number, img_url: string, news_url: string, category:string, title: string, content: string };
export type NewsAddRequest = { img_url: string, news_url: string, category:string, title: string, content: string};

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

export function requestNewsAdd(bookAddRequest: NewsAddRequest) : Thunk<NewsRefreshedAction> {

    // $FlowFixMe Flow complaining about the localstorage being null
    let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;

    return dispatch => {
        axios.post('/api/favnews', bookAddRequest,{
            headers: {authorization: headerToken}
        })
            .then(
                success => dispatch(newsRefreshed(success.data)),
                failure => console.log(failure)
            );
    };
}