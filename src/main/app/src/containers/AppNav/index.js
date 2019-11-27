import React from 'react';
import {Link, Route, withRouter} from 'react-router-dom';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink, Container} from 'reactstrap';
import Flexbox from 'flexbox-react';

import { Avatar } from 'antd';
import { Layout, Menu, Icon } from 'antd';


import Logo from '../../assets/logo.png';
import type { AuthState } from '../../data/modules/auth';
import { logout } from '../../data/modules/auth';
import { socketsSubscribe } from '../../middleware/socketActions';
import type { SocketState } from "../../data/modules/websockets";
import * as Names from '../../constants/names';


import ReactDOM from 'react-dom';
import '../../styles/AppNav.css';
import '../../styles/News.css';

import {connect} from "react-redux";
import SignIn from "../signin";
import SignUp from "../Signup";
import About from "../about";
import SerachBar from "../Shared/SearchBar";
import Preference from "../preference";
import HotNews from "../HotNews";
import RecomNews from "../RecomNews";
import FavNews from "../FavNews";
import test from "../test";

const { Header, Sider, Content } = Layout;

type Props = {
    auth: AuthState,
    socketState: SocketState,
    socketsSubscribe: (topic: string) => void,
    logout: () => void
};

type State = {
    collapsed: false,
    subscriptionActive: boolean
}

class AppNav extends React.Component<Props, State> {

    props: Props;
    state: State;

    constructor(props) {
        super(props);
        this.state = {
            subscriptionActive: false,
            collapsed: false
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    authLink(signedIn) {
        if (!signedIn) {
            return (
                <div>
                    <span><Link className="signIn" to="/signin">Log In</Link></span>
                    <span><Link className="signIn" to="/signup">Sign Up</Link></span>
                </div>
            )
        }

        return (
            <span><a className="signIn" href='#' onClick={() => this.props.logout()}>Sign Out</a></span>
        );
    }

    userLink(signedIn, username) {
        if (signedIn) {
            return (
                <NavItem>
                    <NavLink><div className="text-info">{username}</div></NavLink>
                </NavItem>
            )
        }

        return null;
    }

    roleLink(signedIn, roles) {
        if (signedIn && roles.some(item => Names.ROLE_ADMIN === item)) {
            return (
                <NavItem>
                    <NavLink><a href='#'>AdminMenu</a></NavLink>
                </NavItem>
            )
        }

        return null;
    }

    socketLink() {

        const { connected } = this.props.socketState;

        if (connected && !this.state.subscriptionActive) {
            this.props.socketsSubscribe('/topic/update');
            this.setState({subscriptionActive: true})
        }

        if (connected && this.state.subscriptionActive) {
            return (
                <NavItem>
                    <NavLink><a href='#'>{this.props.socketState.message}</a></NavLink>
                </NavItem>
            )
        }

        return null;
    }


    render() {
        console.log("state" ,this.state);
        console.log("props", this.props);
        const { roles, signedIn, username } = this.props.auth;

        return (

            <Layout>
                <Sider theme="light" trigger={null} collapsible collapsed={this.state.collapsed}>
                    {/*<div className="logo" />*/}
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                    <Menu mode="inline" defaultSelectedKeys={['1']}>
                        {/*theme="dark"*/}
                        <Menu.Item key="1">
                            <Icon type="chrome" />
                            <span>Top stories</span>
                            <Link to="/"></Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="user" />
                            <span>Selected for you</span>
                            <Link to="/recnews"></Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="star" />
                            <span>Saved News</span>
                            <Link to="/favnews"></Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="upload" />
                            <span>testExample</span>
                            <Link to="/test"></Link>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout>
                    <Header className="topNavBar">
                        <img className="logo" src={Logo}/>
                        <SerachBar/>
                        <div className="grow" />
                        <Link to="/about-us"><Avatar className="avatar" icon="user"/></Link>
                        <div className="signIn">{this.authLink(signedIn)}</div>

                    </Header>
                    <div className="fullscreen">
                        <Content >
                            <Route exact path="/" component={HotNews} />
                            <Route exact path="/signin" component={SignIn} />
                            <Route exact path="/signup" component={SignUp} />
                            <Route exact path="/preference" component={Preference} />
                            <Route exact path="/favnews" component={FavNews} />
                            <Route exact path="/recnews" component={RecomNews} />
                            <Route exact path="/about-us" component={About} />
                            <Route exact path="/test" component={test} />
                        </Content>
                    </div>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    socketState: state.websockets
});
const mapDispatchToProps = { logout, socketsSubscribe };

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AppNav)
);