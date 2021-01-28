import { applyMiddleware, createStore } from 'redux';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';

const store = createStore(
    reducer,
    composeWithDevTools({
        trace: true,
    })(applyMiddleware(thunk)),
);

const app = (
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
reportWebVitals();
