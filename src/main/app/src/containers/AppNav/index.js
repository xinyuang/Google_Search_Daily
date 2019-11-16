import { Link, withRouter } from 'react-router-dom';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import type { AuthState } from '../../data/modules/auth';
import { logout } from '../../data/modules/auth';
import { socketsSubscribe } from '../../middleware/socketActions';
import type { SocketState } from "../../data/modules/websockets";
import * as Names from '../../constants/names';

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../styles/AppNav.css';
import { Layout, Menu, Icon } from 'antd';
import {connect} from "react-redux";

const { Header, Sider, Content } = Layout;






type Props = {
    auth: AuthState,
    socketState: SocketState,
    socketsSubscribe: (topic: string) => void,
    logout: () => void
};

type State = {
    subscriptionActive: boolean
}

class AppNav extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        Content
                    </Content>
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
