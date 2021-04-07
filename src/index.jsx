import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import EnhancedApp from './App';
import store from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <EnhancedApp/>
    </Provider>,
    document.getElementById('root')
);