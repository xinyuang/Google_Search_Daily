/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import { socketsConnect } from '../../middleware/socketActions';
import {Checkbox, Button, Alert, Col} from "antd";
import { RegState, setRegisterData} from "../../data/modules/register";
// import { PrefState } from "../../data/modules/preference";
import { getCurrentDate } from "../Shared/date";


type Props = {
    regState: RegState,
    // prefState: PrefState,
    socketsConnect:  () => void,
    setRegisterData: (date: string, checkedList: string[]) => void,
    history: {
        push: (path: string) => void
    },
};

type State = {
    // registered: boolean,
    // regFailed: boolean,
    // username: string,
    indeterminate: boolean,
    checkAll: boolean,
    checkedList: number[]
};

const CheckboxGroup = Checkbox.Group;
// const plainOptions = [
//     'Business',
//     'Entertainment',
//     'Health',
//     'Politics',
//     'ScienceAndTechnology', 'Sports',
//     'World',
//     'US'];
const optionNumber = [1,2,3,4,5,6,7,8,9]
const options = [
    { title : "Business", icon: 1, src : "https://content.thriveglobal.com/wp-content/uploads/2019/07/Dream-Side-Business-Desk.jpg?w=1550"},
    { title : "Entertainment", icon: 2, src : "https://www.eventmanagerblog.com/wp-content/uploads/2018/10/350x215-FEAT-in-post-Entertainment.jpg"},
    { title : "Health", icon: 3, src : "https://d362armbx6l2g0.cloudfront.net/d362armbx6l2g0_cloudfront_net/Video-Poster/promo_newslettersignup_2x_f2756ffb5c172d269067ce311945acea.png"},
    { title : "Politics", icon: 4, src : "https://www.voicesofyouth.org/sites/default/files/images/2019-01/politics3.jpg"},
    { title : "ScienceAndTechnology", icon: 5, src : "https://i.cbc.ca/1.4833630.1537555507!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/global-internet-abstract.jpg"},
    { title : "Sports", icon: 6, src : "https://blog.studocu.com/wp-content/uploads/2016/10/slide1-image-tablet.png"},
    { title : "World", icon: 7, src : "https://www.clayton.edu/international-student-services/Forms/images/intern636634593552534916.jpeg"},
    { title : "US", icon: 8, src : "https://www.cmsschicago.org/wp-content/uploads/2018/11/US-News-and-World-Report.png"},
    { title : "Local", icon: 9, src : "https://whitespark.ca/wp-content/uploads/2016/03/LocalInsider-hero.png"}
]

class Perference extends React.Component<Props, State> {
    state = {
        // regFailed: false,
        // registered: false,
        // username: '',
        indeterminate: true,
        checkAll: false,
        checkedList: [],
    };
    handleRegister(event) {
        event.preventDefault();
        let cur_date = getCurrentDate();
        const { checkedList } = this.state;

        // const { username } = this.props.regState.username;
        //need check valid input
        this.props.setRegisterData(cur_date, checkedList);
        // this.setState({ regFailed: this.props.regState.regFailure, registered: this.props.regState.registered});
        // this.props.socketsConnect();
    }


    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? optionNumber : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };
    onChange = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < optionNumber.length,
            checkAll: checkedList.length === optionNumber.length,
        });
        console.log(checkedList);
    };


    // prefSucceededMessage() {
    //     if (this.props.prefState.status === 'loaded') {
    //         return (
    //             <div>
    //                 <Alert message="Successfully load preference" type="success" showIcon />
    //             </div>
    //         )
    //     }
    //     return null;
    //
    //
    //
    // }

    render() {


        return (
            <Container>
                <form>
                    <div className='check-box'>
                        <br/>
                        <p className="preference">Select What Kind of News You May Like:</p>
                        <div style={{ borderBottom: '2px solid #E9E9E9' }}>
                            <Checkbox
                                indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllChange}
                                checked={this.state.checkAll}
                            >
                                Check all
                            </Checkbox>
                        </div>
                        <br />
                        {/*<CheckboxGroup*/}
                        {/*    className='checkbox-img'*/}
                        {/*    options={plainOptions}*/}
                        {/*    value={this.state.checkedList}*/}
                        {/*    onChange={this.onChange}*/}
                        {/*/>*/}
                        <CheckboxGroup className='allcheckbox' value={this.state.checkedList} onChange={this.onChange}>
                            {options.map(option =>
                                <Col className="checkBox-grid" span={8}>
                                    <Checkbox className='checkbox-img'
                                              style={{backgroundImage: `url(${ option.src })`}}
                                              value={option.icon}>{option.title}</Checkbox>
                                </Col>

                            )}

                        </CheckboxGroup>
                    </div>
                    <br />
                    <Button onClick={e => this.handleRegister(e)}> Submit </Button>
                    <Button
                            // disabled={this.props.prefState.status === 'stale'}
                            onClick={e => this.props.history.push("/")}> Go To Home </Button>
                </form>
                {/*<Container>*/}
                {/*    {this.prefSucceededMessage()}*/}
                {/*</Container>*/}
            </Container>


        );
    }
}

function mapStateToProps(state) {
    return {
        regState: state.register,
        // prefState: state.preference
    };
}

/* Inject auth state and dispatch() into props */
export default withRouter(
    connect(mapStateToProps, { setRegisterData, socketsConnect })(Perference)
);