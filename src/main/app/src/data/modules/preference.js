// @flow
import axios from 'axios';
import type { Thunk } from '../';
import * as Names from "../../constants/names";


type State = {
    status: 'stale' | 'loaded',
    data: number[]
}

type PreferenceRefreshedAction = {
    type: 'PREFERENCE_REFRESHED',
    preference: number[]
}

type Action = PreferenceRefreshedAction;

const defaultPreferState: State = {
    status: 'stale',
    data: []
};

export default function reducer(state : State = defaultPreferState, action : Action) : State {
    switch (action.type) {

        case 'PREFERENCE_REFRESHED':
            return {
                status: 'loaded',
                data: action.preference
            };

        default:
            return state;
    }
}

export function PreferenceRefreshed(preference: number[]) : PreferenceRefreshedAction {
    return {
        type: 'PREFERENCE_REFRESHED',
        preference
    };
}

export function refreshPreference() : Thunk<PreferenceRefreshedAction> {

    // $FlowFixMe Flow complaining about the localstorage being null
    let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
    console.log(headerToken);
    return dispatch => {
        axios.get(`/api/getpreference`,{
            headers: {authorization: headerToken}
        })
            .then(
                success => dispatch(PreferenceRefreshed(success.data),console.log(success.data[0])),
                failure => console.log(failure)
            );
    };
}
