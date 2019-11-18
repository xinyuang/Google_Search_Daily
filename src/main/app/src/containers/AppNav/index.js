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
import 'antd/dist/antd.css';
import '../../styles/AppNav.css';

import {connect} from "react-redux";
import Home from "../home";
import SignIn from "../signin";
import About from "../about";
import SerachBar from "../Shared/SearchBar";
import FavNews from "../FavNews";

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
                 <span><Link className="signIn" to="/signin">Sign In</Link></span>
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
        console.log(this.state);
        console.log(this.props);
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
                            <Icon type="user" />
                            <span>Search</span>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>News</span>
                            <Link to="/about-us">About</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>Favorite</span>
                            <Link to="/favnews">FavNews</Link>
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
                            <Route exact path="/" component={Home} />
                            <Route exact path="/signin" component={SignIn} />
                            <Route exact path="/favnews" component={FavNews} />
                            <Route exact path="/about-us" component={About} />
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
