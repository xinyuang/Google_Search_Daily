/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Container, Label, Alert } from 'reactstrap';
import { socketsConnect } from '../../middleware/socketActions';
import {Checkbox} from "antd";
import type { RegState, setRegisterData} from "../../data/modules/register";

type Props = {
    regState: RegState,
    socketsConnect:  () => void,
    setRegisterData: (username: string, checkedList: string[]) => void,
};

type State = {
    // registered: boolean,
    // regFailed: boolean,
    // username: string,
    indeterminate: boolean,
    checkAll: boolean,
    checkedList: string[]
};

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Science', 'Technology', 'Sports', 'Entertainment', 'Business'];

class Perference extends React.Component<Props, State> {
    state = {
        regFailed: false,
        registered: false,
        // username: '',
        indeterminate: true,
        checkAll: false,
        checkedList: [],
    };
    handleRegister(event) {
        event.preventDefault();

        const { checkedList } = this.state;

        const { username } = this.props.regState.username;
        //need check valid input
        this.props.setRegisterData(username, checkedList);
        this.setState({ regFailed: this.props.regState.regFailure, registered: this.props.regState.registered});
        this.props.socketsConnect();
    }


    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };
    onChange = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
        console.log(checkedList);
    };

    regFailedMessage() {
        if (this.state.regFailed) {

            return (
                <div>
                    <Alert color="warning">
                        <h1>Register failed!</h1>
                        <div>{this.props.regState.regErrType}</div>
                    </Alert>
                </div>
            );
        }
        return null;
    }

    regSucceededMessage() {
        if (this.state.registered) {
            return (
                <div>
                    <Alert color="success">
                        <h1>Register Succeeded!</h1>
                    </Alert>
                </div>
            )
        }
        return null;

    }

    render() {


        return (
            <Container>
                <form>
                    <div className='check-box'>
                        <Label for="username">Select What Kind of News You May Like:</Label>
                        <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                            <Checkbox
                                indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllChange}
                                checked={this.state.checkAll}
                            >
                                Check all
                            </Checkbox>
                        </div>
                        <br />
                        <CheckboxGroup
                            options={plainOptions}
                            value={this.state.checkedList}
                            onChange={this.onChange}
                        />
                    </div>
                    <br />
                    <Button onClick={e => this.handleRegister(e)}> Register </Button>
                </form>
                <Container>
                    {this.regSucceededMessage()}
                    {this.regFailedMessage()}
                </Container>
            </Container>


        );
    }
}

function mapStateToProps(state) {
    return {
        regState: state.register
    };
}

/* Inject auth state and dispatch() into props */
export default withRouter(
    connect(mapStateToProps, {  setRegisterData, socketsConnect })(Perference)
);