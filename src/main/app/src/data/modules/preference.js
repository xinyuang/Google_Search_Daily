// @flow
import axios from 'axios';
import type { Thunk } from '../';
import * as Names from "../../constants/names";


type PrefState = {
    status: 'stale' | 'loaded',
    data: number[]
}

type PreferenceRefreshedAction = {
    type: 'PREFERENCE_REFRESHED',
    preference: number[]
}

type Action = PreferenceRefreshedAction;

const defaultPreferState: PrefState = {
    status: 'stale',
    data: []
};

export default function reducer(state : PrefState = defaultPreferState, action : Action) : PrefState {
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
                success => dispatch(PreferenceRefreshed(success.data)),
                failure => console.log(failure)
            );
    };
}
