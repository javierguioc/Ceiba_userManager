import React from "react";
import thunk from "redux-thunk";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import reducer from "./src/storage/reducers/reducer";
import Root from "./src/routes/Router";

import AsyncStorage from "@react-native-community/async-storage";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

//Permite mostrar alertas personalizadas
import ReactNotification from "react-notifications-component"; 
import "react-notifications-component/dist/theme.css"; 
import "animate.css/animate.compat.css";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

// Esta configuracion es para la extencion dev tools
const composeEnhancers =
  process.env.NODE_ENV === "production"
    ? ""
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const devTools =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunk)
    : composeEnhancers(applyMiddleware(thunk));

const store = createStore(persistedReducer, devTools);

const persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ReactNotification />
      <Root />
    </PersistGate>
  </Provider>
);

export default App;
