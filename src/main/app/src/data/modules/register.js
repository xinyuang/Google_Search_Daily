import axios from 'axios';
import type {Thunk} from '../';
import * as Names from '../../constants/names';
import {authenticated, login} from '../modules/auth';
// import { PreferenceRefreshed } from "../modules/preference";

import {socketsConnect, socketsDisconnect} from '../../middleware/socketActions';

export type Role =
    'ROLE_ADMIN'
    | 'ROLE_USER'
    | 'ROLE_ANONYMOUS';

export type RegState = {
    registered: boolean,
    regFailure: boolean,
    regErrType: string,
    username: string,


};

type RegisterAction = {
    type: 'REGISTERED' | 'REGISTER_FAILURE' | 'SET_DEFAULT',
    data: {
        registered: boolean,
        regFailure: boolean,
        regErrType: string,
        username: string,

    }
};


type Action = RegisterAction;

const defaultState = {
    registered: false,
    regFailure: false,
    regErrType: '',
    username: '',

};

export default function reducer(state: RegState = defaultState, action: Action): RegState {
    switch (action.type) {
        case 'REGISTERED':
            return {
                registered: true,
                regFailure: false,
                username: action.data.username
            };
        case 'REGISTER_FAILURE':
            return {
                registered: false,
                regFailure: true,
                regErrType: 'User Exist'
            };
        case 'SET_DEFAULT':
            return defaultState;

        default:
            return state;
    }
}

export function userRegistered(name): RegisterAction {
    return {
        type: 'REGISTERED',
        data: {registered: true, regFailure: false, username: name}
    }

}

export function registerFailure(): RegisterAction {
    return {
        type: 'REGISTER_FAILURE',
        data: { registered: false, regFailure: true, regErrType: 'User Exist'}
    }

}
export function setDefault(): RegisterAction{
    return {
        type: 'SET_DEFAULT'
    }

}

export function register(username: string, password: string, email: string, date: string): Thunk<RegisterAction> {
    // let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
    return dispatch => {

        const user_data = {
            email: email,
            enabled: "True",
            firstname: 'userxxx',
            lastPasswordResetDate: date,
            lastname: "userxxx",
            password: password,
            username: username
        };
        console.log("CHECK DATA!!!!");
        console.log(user_data);
        axios.post(`/api/register`, user_data)
            .then(
                success => {
                    // dispatch(socketsConnect());
                    dispatch(userRegistered(username));
                    dispatch(login(username, password));
                },
                failure => {
                    dispatch(registerFailure());
                }
            );
    };

}

export function setRegisterData(date: string, checkedList: number[]): Thunk<RegisterAction> {
    let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
    return dispatch => {
        const reg_data = {setDate: date, preference: checkedList};
        console.log("CHECK prefe", reg_data,headerToken);
        axios.post(`/api/addpreference`, reg_data,{headers: {authorization: headerToken}})
            .then(
                success => {
                    // dispatch(PreferenceRefreshed(reg_data.preference));
                    console.log(checkedList);
                },
                failure => {
                    dispatch(registerFailure());
                }
            );
    };

}