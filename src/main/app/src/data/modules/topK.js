// @flow
import axios from 'axios';
import type { Thunk } from '../';
import * as Names from "../../constants/names";


type State = {
    status: 'stale' | 'loaded',
    data: string[]
}

type HotTopicRefreshedAction = {
    type: 'TOPIC_REFRESHED',
    hotTopic: string[]
}

type Action = HotTopicRefreshedAction;

const defaultHotTopicState: State = {
    status: 'stale',
    data: []
};

export default function reducer(state : State = defaultHotTopicState, action : Action) : State {
    switch (action.type) {

        case 'TOPIC_REFRESHED':
            return {
                status: 'loaded',
                data: action.hotTopic
            };

        default:
            return state;
    }
}

export function HotTopicRefreshed(hotTopic: string[]) : HotTopicRefreshedAction {
    return {
        type: 'TOPIC_REFRESHED',
        hotTopic
    };
}

export function refreshHotTopic() : Thunk<HotTopicRefreshedAction> {

    // $FlowFixMe Flow complaining about the localstorage being null
    if (localStorage.getItem(Names.JWT_TOKEN))
    {
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
        console.log(headerToken);
        return dispatch => {
            axios.get(`/api/topquery`,{
                headers: {authorization: headerToken}
            })
                .then(
                    success => dispatch(HotTopicRefreshed(success.data)),
                    failure => console.log(failure)
                );
        };
    }
    else
    {
        return dispatch => {
            axios.get(`/api/topquery`)
                .then(
                    success => dispatch(HotTopicRefreshed(success.data)),
                    failure => console.log(failure)
                );
        };
    }

}
