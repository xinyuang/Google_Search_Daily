// /* @flow */
// import React from 'react';
// import { connect } from 'react-redux';
//
// import { Button, Col, Container, Form, FormGroup, Label, Input, Table } from 'reactstrap';
//
// import {signup} from '../../data/modules/auth';
// import type { AuthState, UserRegisterRequest } from '../../data/modules/auth';
//
// import { Layout, Menu, Icon } from 'antd';
// import type {NewsAddRequest} from "../../data/modules/news";
// import {getCurrentDate} from "../Shared/date";
// import {Redirect} from "react-router-dom";
//
// const { Header, Sider, Content } = Layout;
// type Props = {
//     authState: AuthState,
//     signup:(userRegisterRequest: UserRegisterRequest) => void,
// };
//
// type State = {
//     Email: string,
//     Password: string,
//     Username: string
// };
//
// class signupForm extends React.Component<Props, State> {
//     props: Props;
//     state: State;
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             password: '',
//             username: ''
//         };
//     }
//
//     handleChange = (e) => {
//         this.setState({ [e.target.name]: e.target.value });
//     };
//
//     handleregister(event) {
//         event.preventDefault();
//
//         const { Email, Password, Username } = this.state;
//
//         let cur_date = getCurrentDate();
//         const userRegisterRequest: UserRegisterRequest = {email: Email,
//             enabled: 'True',
//             firstname: 'userxxx',
//             lastPasswordResetDate: cur_date,
//             lastname: 'userxxx',
//             password: Password,
//             username: Username};
//         console.log('add user! ',userRegisterRequest)
//         this.props.signup(userRegisterRequest);
//         return <Redirect to="/signin/" />;
//     }
//
//     render() {
//
//         const { Email, Password, Username } = this.state;
//
//         return (
//             <div>
//                 <Container>
//                     <h1>Sign up page</h1>
//                     <Container>
//                         <Form>
//                             <FormGroup row>
//                                 <Label for="Email" sm={2}>Email</Label>
//                                 <Col sm={10}>
//                                     <Input type="Email"
//                                            name="Email"
//                                            id="Email"
//                                            placeholder="Email"
//                                            value={Email}
//                                            onChange={this.handleChange}
//                                     />
//                                 </Col>
//                             </FormGroup>
//                             <FormGroup row>
//                                 <Label for="Username" sm={2}>Username</Label>
//                                 <Col sm={10}>
//                                     <Input type="Username"
//                                            name="Username"
//                                            id="Username"
//                                            placeholder="Username"
//                                            value={Username}
//                                            onChange={this.handleChange}
//                                     />
//                                 </Col>
//                             </FormGroup>
//                             <FormGroup row>
//                                 <Label for="Password" sm={2}>Password</Label>
//                                 <Col sm={10}>
//                                     <Input type="Password"
//                                            name="Password"
//                                            id="Password"
//                                            placeholder="Password"
//                                            value={Password}
//                                            onChange={this.handleChange}
//                                     />
//                                 </Col>
//                             </FormGroup>
//                             <FormGroup check row>
//                                 <Col sm={{ size: 10 }}>
//                                     <Button onClick={e => this.handleregister(e)}>Submit</Button>
//                                 </Col>
//                             </FormGroup>
//                         </Form>
//                     </Container>
//                 </Container>
//             </div>
//         )
//     }
// }
//
// function mapStateToProps(state) {
//     return {
//         authState: state.auth,
//     };
// }
//
// export default connect(mapStateToProps, { signup })(signupForm);

/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import { RegState, register } from '../../data/modules/register';
import { AuthState } from '../../data/modules/auth';
import { socketsConnect } from '../../middleware/socketActions';
import { Form, Icon, Input, Button, Alert } from 'antd';
import { getCurrentDate } from "../Shared/date";
import { Card } from 'antd';

type Props = {
    regState: RegState,
    authState: AuthState,
    socketsConnect:  () => void,
    register: (username: string, password: string, email: string) => void,
    history: {
        push: (path: string) => void
    },
};

type State = {
    username: string,
    password: string,
    email: string,


};

class RegistrationForm extends React.Component<Props, State> {
    state = {
        username: '',
        password: '',
        email: '',
        confirmDirty: false,
    };

    handleSignUp(event) {
        event.preventDefault();
        let cur_date = getCurrentDate();
        const { username, password, email } = this.state;
        const u = username ? username.trim() : '';
        const p = password ? password.trim() : '';
        const e = email ? email.trim() : '';
        //need check valid input
        this.props.register(u,p,e, cur_date);
        // console.log("register CHECK!!!!!");
        // console.log(this.props);
        // this.props.socketsConnect();

    }

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    regFailedMessage() {
        if (this.props.regState.regFailure) {
            return (
                <div>
                    <Alert
                        message="Register failed!!"
                        description={this.props.regState.regErrType}
                        type="error"
                        showIcon
                    />
                </div>
            );
        }

        return null;
    }

    regSucceededMessage() {
        if (this.props.regState.registered) {
            return (
                <div>
                    <Alert message="Register and Login Succeeded!" type="success" showIcon />
                </div>

            )
        }
        return null;

    }

    render() {

        const { username, password, email } = this.state;
        const { getFieldDecorator } = this.props.form;
        console.log("Check LOGOUT", this.props);
        return (
            <div>
                <Container>
                    <br />
                    <h1 id="textH3">Register</h1>
                    <Card style={{width:500, alignItems:"center", marginTop:20}}>
                        <Form className="register-form">
                            <Container>
                                {this.regSucceededMessage()}
                                {this.regFailedMessage()}
                            </Container>
                            <br/>
                            <Form.Item label="Username" required="true">
                                {/*<Label for="username">Username *</Label>*/}
                                {getFieldDecorator('username', {
                                    rules: [
                                        {
                                            pattern: /^[a-z0-9_]+$/,
                                            message: 'The input is not valid username!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input a username!',
                                        },
                                    ],
                                })(<Input type="username"
                                          name="username"
                                          id="username"
                                          placeholder="Username"
                                          value={username}
                                          onChange={this.handleChange}
                                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />)}
                                {/*<Input type="username"*/}
                                {/*       name="username"*/}
                                {/*       id="username"*/}
                                {/*       placeholder="Username"*/}
                                {/*       value={username}*/}
                                {/*       onChange={this.handleChange}*/}
                                {/*/>*/}
                            </Form.Item>
                            <Form.Item label="Password" required="true" hasFeedback>
                                {/*<Label for="username">Password *</Label>*/}
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            min: 6,
                                            message: 'The password must be at least 6 characters',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        {
                                            validator: this.validateToNextPassword,
                                        },
                                    ],
                                })(<Input.Password
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={this.handleChange}
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />)}
                                {/*<Input type="password"*/}
                                {/*       name="password"*/}
                                {/*       id="password"*/}
                                {/*       placeholder="Password"*/}
                                {/*       value={password}*/}
                                {/*       onChange={this.handleChange}*/}
                                {/*/>*/}
                            </Form.Item>
                            <Form.Item label="Confirm Password" required="true" hasFeedback>
                                {getFieldDecorator('confirm', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        {
                                            validator: this.compareToFirstPassword,
                                        },
                                    ],
                                })(<Input.Password
                                    placeholder="Confirm Password" onBlur={this.handleConfirmBlur}
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />)}
                            </Form.Item>

                            {/*<Form.Item>*/}
                            {/*    <Input type="email"*/}
                            {/*           name="email"*/}
                            {/*           id="email"*/}
                            {/*           placeholder="Email"*/}
                            {/*           value={email}*/}
                            {/*           onChange={this.handleChange}*/}
                            {/*    />*/}
                            {/*</Form.Item>*/}
                            <Form.Item label="E-mail" required="true">
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={this.handleChange} />)}
                            </Form.Item>
                            {/*<FormGroup>*/}
                            {/*    <Label for="username">Country</Label>*/}
                            {/*    <Input type="country"*/}
                            {/*           name="country"*/}
                            {/*           id="country"*/}
                            {/*           placeholder="Optional"*/}
                            {/*           value={country}*/}
                            {/*           onChange={this.handleChange}*/}
                            {/*    />*/}
                            {/*</FormGroup>*/}
                            {/*<FormGroup>*/}
                            {/*    <Label for="username">City</Label>*/}
                            {/*    <Input type="city"*/}
                            {/*           name="city"*/}
                            {/*           id="city"*/}
                            {/*           placeholder="Optional"*/}
                            {/*           value={city}*/}
                            {/*           onChange={this.handleChange}*/}
                            {/*    />*/}
                            {/*</FormGroup>*/}

                            <br />
                            <Button onClick={e => this.handleSignUp(e)}> Register</Button>
                            <Button
                                // disabled={!this.props.regState.registered}
                                onClick={e => this.props.history.push("/preference")}>Next</Button>
                        </Form>
                    </Card>


                </Container>
            </div>
        );
    }
}




const SignUp = Form.create({ name: 'register' })(RegistrationForm);
function mapStateToProps(state) {
    console.log(state);
    return {
        regState: state.register,
        authState: state.auth
    };
}

/* Inject auth state and dispatch() into props */
export default withRouter(
    connect(mapStateToProps, { register, socketsConnect })(SignUp)
);