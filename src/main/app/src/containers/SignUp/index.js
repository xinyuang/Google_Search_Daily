/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import { Button, Col, Container, Form, FormGroup, Label, Input, Table } from 'reactstrap';

import {signup} from '../../data/modules/auth';
import type { AuthState, UserRegisterRequest } from '../../data/modules/auth';

import { Layout, Menu, Icon } from 'antd';
import type {NewsAddRequest} from "../../data/modules/news";
import {getCurrentDate} from "../Shared/date";

const { Header, Sider, Content } = Layout;
type Props = {
    authState: AuthState,
    signup:(userRegisterRequest: UserRegisterRequest) => void,
};

type State = {
    Email: string,
    Password: string,
    Username: string
};

class signupForm extends React.Component<Props, State> {
    props: Props;
    state: State;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleregister(event) {
        event.preventDefault();

        const { Email, Password, Username } = this.state;

        let cur_date = getCurrentDate();
        const userRegisterRequest: UserRegisterRequest = {email: Email,
            enabled: 'True',
            firstname: 'userxxx',
            lastPasswordResetDate: cur_date,
            lastname: 'userxxx',
            password: Password,
            username: Username};
        console.log('add user! ',userRegisterRequest)
        this.props.signup(userRegisterRequest);
    }

    render() {

        const { Email, Password, Username } = this.state;

        return (
            <div>
                <Container>
                    <h1>Sign up page</h1>
                    <Container>
                        <Form>
                            <FormGroup row>
                                <Label for="Email" sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input type="Email"
                                           name="Email"
                                           id="Email"
                                           placeholder="Email"
                                           value={Email}
                                           onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="Username" sm={2}>Username</Label>
                                <Col sm={10}>
                                    <Input type="Username"
                                           name="Username"
                                           id="Username"
                                           placeholder="Username"
                                           value={Username}
                                           onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="Password" sm={2}>Password</Label>
                                <Col sm={10}>
                                    <Input type="Password"
                                           name="Password"
                                           id="Password"
                                           placeholder="Password"
                                           value={Password}
                                           onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 10 }}>
                                    <Button onClick={e => this.handleregister(e)}>Submit</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Container>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authState: state.auth,
    };
}

export default connect(mapStateToProps, { signup })(signupForm);
