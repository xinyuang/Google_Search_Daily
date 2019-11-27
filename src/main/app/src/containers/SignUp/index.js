/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Label, ListGroup, ListGroupItem, Input, Alert } from 'reactstrap';
import { RegState, register, userRegistered } from '../../data/modules/register';
import type { AuthState } from '../../data/modules/auth';
import { socketsConnect } from '../../middleware/socketActions';
import { Select } from 'antd';


const { Option } = Select;
const countryData = [];

type Props = {
    regState: RegState,
    socketsConnect:  () => void,
    register: (username: string, password: string, email: string, country: string, city: string) => void,
    // register: (username: string, password: string, email: string, country: string, city: string, checkList: []) => void,
    // userRegistered: () => void,
    history: {
        push: (path: string) => void
    },
};

type State = {
    // registered: boolean,
    // regFailed: boolean,
    username: string,
    password: string,
    email: string,
    country: string,
    city: string,
    // indeterminate: boolean,
    // checkAll: boolean,
};

class SignUp extends React.Component<Props, State> {
    state = {
        // regFailed: false,
        // registered: false,
        username: '',
        password: '',
        email: '',
        country: '',
        city: '',
        // indeterminate: true,
        // checkAll: false,
        // checkedList: [],
    };

    handleSignUp(event) {
        event.preventDefault();

        const { username, password, email, country, city } = this.state;

        const u = username ? username.trim() : '';
        const p = password ? password.trim() : '';
        const e = email ? email.trim() : '';
        const con = country ? country.trim() : '';
        const ct = city ? city.trim() : '';
        //need check valid input
        this.props.register(u,p,e,con,ct);
        this.props.history.push("/preference");
        // this.props.register(u, p, e, con, ct, checkedList);
        // this.props.socketsConnect();
    }



    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // regFailedMessage() {
    //     if (this.props.authState.regFailure) {
    //
    //         return (
    //             <div>
    //                 <Alert color="warning">
    //                     <h1>Register failed!</h1>
    //                     <div>{this.props.authState.regErrType}</div>
    //                 </Alert>
    //             </div>
    //         );
    //     }
    //     return null;
    // }
    //
    // regSucceededMessage() {
    //     if (this.props.authState.registered) {
    //         return (
    //             <div>
    //                 <Alert color="success">
    //                     <h1>Register Succeeded!</h1>
    //                 </Alert>
    //             </div>
    //         )
    //     }
    //     return null;
    //
    // }


    render() {

        const { username, password, email, country, city } = this.state;
        // const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Container>
                    <Form>
                        <br />
                        <h1>Register</h1>
                        <br/>
                        <FormGroup>
                            <Label for="username">Username *</Label>
                            <Input type="username"
                                   name="username"
                                   id="username"
                                   placeholder="Username"
                                   value={username}
                                   onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="username">Password *</Label>
                            <Input type="password"
                                   name="password"
                                   id="password"
                                   placeholder="Password"
                                   value={password}
                                   onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="username">Email *</Label>
                            <Input type="email"
                                   name="email"
                                   id="email"
                                   placeholder="Email"
                                   value={email}
                                   onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="username">Country</Label>
                            <Input type="country"
                                   name="country"
                                   id="country"
                                   placeholder="Optional"
                                   value={country}
                                   onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="username">City</Label>
                            <Input type="city"
                                   name="city"
                                   id="city"
                                   placeholder="Optional"
                                   value={city}
                                   onChange={this.handleChange}
                            />
                        </FormGroup>

                        <br />
                        <Button onClick={e => this.handleSignUp(e)}> NEXT</Button>
                    </Form>

                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        regState: state.register
    };
}

/* Inject auth state and dispatch() into props */
export default withRouter(
    connect(mapStateToProps, { register, socketsConnect })(SignUp)
);
