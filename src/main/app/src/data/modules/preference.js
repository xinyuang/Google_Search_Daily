// @flow
import axios from 'axios';
import type { Thunk } from '../';
import * as Names from "../../constants/names";
import {registerFailure} from "./register";


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
                success => dispatch(PreferenceRefreshed(success.data)),
                failure => console.log(failure)
            );
    };
}

export function requestPreferAdd(categoryId: string) : Thunk<PreferenceRefreshedAction> {
    let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
    return dispatch => {
        const reg_data = {category: categoryId};
        // const reg_data = {setDate: '', preference: checkList};
        console.log("CHECK prefe", reg_data,headerToken);
        // axios.post(`/api/addpreference`, reg_data,{headers: {authorization: headerToken}})
        axios.post(`/api/addonepreference`, reg_data,{headers: {authorization: headerToken}});
    };
}

export function requestPreferDel(categoryId: string) : Thunk<PreferenceRefreshedAction> {

    // $FlowFixMe Flow complaining about the localstorage being null
    let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
    console.log(headerToken);
    return dispatch => {
        const reg_data = {category: categoryId};
        axios.post('/api/deleteonepreference', reg_data,{
            headers: {authorization: headerToken}
        });
    };
}