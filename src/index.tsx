import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './index-reset-css.css';
import 'src/theme/colors.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store";


import {PersistGate} from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import {setupAxios} from "./api/ax";


setupAxios(store)

const persistor = persistStore(store)



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

//console.log(store.getState())



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
