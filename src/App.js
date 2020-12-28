import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthGate } from "pages/Auth/AuthGate";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { SmartToaster, toast } from 'react-smart-toaster';

import { theme } from "./utils/styles/theme";
import { GlobalStyle } from "./utils/styles";
import "./App.css";

import RootReducer from './reducers/index';

const store = createStore(
  RootReducer,
  applyMiddleware(reduxThunk)
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SmartToaster
        store={toast}
        lightBackground={true}
        position={"top_right"}
      />
      <Provider store={store}>
        <GlobalStyle />
        <BrowserRouter>
          <AuthGate />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
