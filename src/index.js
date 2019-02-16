import 'es6-shim';
import storageState,{isDev, save} from "./init/global";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import reducers from "./Reducer";
import registerServiceWorker from "./registerServiceWorker";
import { Provider} from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import initData, { lastState } from "./init/initData";
import {debounce} from "lodash";
import App from "./App";
console.log("test",lastState());
const store = createStore(reducers, lastState(), applyMiddleware(thunkMiddleware));
window.store=store;
const recordState=()=>{
	const _createdAt=new Date();
	const save=()=>storageState._save(store,_createdAt);
	store.subscribe(debounce(save,1500));
}
if(isDev && false) recordState();

const maintainState = () => {
	// const save = () => storageState.save(store, _createdAt);
	const saveFn = () => save(store.getState());
	store.subscribe(debounce(saveFn, 1000));
}
maintainState();
// Do not write in one line,or it gets error:
// Warning: Failed prop type: Invalid prop `children` of type `array` supplied to `Provider`, expected a single ReactElement.
// in Provider (at index.js:14)  proxyConsole.js:56
// Error: React.Children.only expected to receive a single React element child.
ReactDOM.render(
	<Provider store={store}> 
		<App />
	</Provider>,
	document.getElementById("root"));
registerServiceWorker();

export default store;