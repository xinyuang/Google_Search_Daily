import React, {Component, useState} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from '../../store';
import AppNav from '../AppNav'

export class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <AppNav/>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;



