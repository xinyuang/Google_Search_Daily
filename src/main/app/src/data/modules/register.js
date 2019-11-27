// @flow
import axios from 'axios';
import type {Thunk} from '../';
import * as Names from '../../constants/names';

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
    type: 'REGISTERED' | 'REGISTER_FAILURE',
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

        default:
            return state;
    }
}

export function userRegistered(name): RegisterAction {
    return {
        type: 'REGISTERED',
        data: {registered: true, regFailure: false, username:name}
    }

}

export function registerFailure(): RegisterAction {
    return {
        type: 'REGISTER_FAILURE',
        data: { registered: false, regFailure: true, regErrType: 'User Exist'}
    }

}


export function register(username: string, password: string, email: string,
                         country: string, city: string): Thunk<RegisterAction> {
    return dispatch => {
        const user_data = {username, password, email, country, city};
        axios.post(`/register`, user_data)
            .then(
                success => {
                    dispatch(userRegistered(username));
                },
                failure => {
                    dispatch(registerFailure());
                }
            );
    };

}

export function setRegisterData(username: string, checkedList: string[]): Thunk<RegisterAction> {
    return dispatch => {
        const reg_data = {username, checkedList};
        axios.post(`/addpreference`, reg_data)
            .then(
                success => {
                    dispatch(userRegistered(username));
                },
                failure => {
                    dispatch(registerFailure());
                }
            );
    };

}