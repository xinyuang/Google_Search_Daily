import React from 'react';
import { Route } from 'react-router-dom';

import { Container } from 'reactstrap';

import Home from '../home';
import About from '../about';
import SignIn from '../signin'
// import AppNav from '../appnav';
import AppNav from '../AppNav';
import type {AuthState} from "../../data/modules/auth";
import type {SocketState} from "../../data/modules/websockets";

type Props = {
    auth: AuthState,
    socketState: SocketState,
    socketsSubscribe: (topic: string) => void,
    logout: () => void
};

type State = {
    subscriptionActive: boolean
}


class App extends React.Component<Props, State> {
    props: Props;
    state: State;

    constructor(props) {
        super(props);
        this.state = {
            subscriptionActive: false
        };
    }

    render() {
        return (
            <div>
                <AppNav/>
                <Container>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/about-us" component={About} />
                </Container>
            </div>
        )
    }

}


export default App;