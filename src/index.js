import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import App from './App';
import Axios, { withInterceptors } from './services/axios';
import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';

const store = createStore(
    reducer,
    composeWithDevTools({
        trace: true,
    })(applyMiddleware(thunk)),
);

withInterceptors(Axios, store);

const app = (
    <React.StrictMode>
        <Provider store={store}>
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        </Provider>
    </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
reportWebVitals();
