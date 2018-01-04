import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reducers from "./reducers/index";
import registerServiceWorker from "./registerServiceWorker";
import { Provider} from "react-redux";
import { createStore } from "redux";
import initData from "./init/initData";
import storageState,{isDev} from "./init/global"
import {debounce} from "lodash";

const store = createStore(reducers,initData);

const recordState=()=>{
	const _createdAt=new Date();
	const save=()=>storageState.save(store,_createdAt,new Date());
	store.subscribe(debounce(save,1500));
}
if(isDev) recordState();

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