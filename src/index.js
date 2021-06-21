import 'bootstrap/dist/css/bootstrap.css';
import 'moment-duration-format';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StylesProvider } from '@material-ui/core';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(
    reducer,
    undefined,
    composeWithDevTools({
        trace: true,
    })(applyMiddleware(thunk)),
);

const app = (
    <Provider store={store}>
        <MemoryRouter>
            <StylesProvider injectFirst>
                <App/>
            </StylesProvider>
        </MemoryRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
