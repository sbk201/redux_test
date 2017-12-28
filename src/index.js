import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reducers from "./reducers/index";
import registerServiceWorker from "./registerServiceWorker";
import { Provider} from "react-redux";
import { createStore } from "redux";
import initData from "./initData";
import debounce from "lodash/debounce";
import moment from "moment";


const store = createStore(reducers,initData);

if (process.env.REACT_APP_GLOBAL_STORE==="true") {
	window.store=store;
	window.getState=store.getState;
}

const getStateArray= ()=>{
	const oldState=window.localGet('state') || [];
	const _createdAt=moment().format('DMMM h:mm:ss');
	const _updatedAt=()=>({_updatedAt:moment().format('DMMM h:mm:ss')});
	const nowState=()=>({...store.getState(),_createdAt,..._updatedAt()});
	return oldState.concat(nowState())

};

store.subscribe(debounce(
	()=>{
		window.localSet("state",getStateArray())
		console.log(store.getState());
	},1500)
);

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