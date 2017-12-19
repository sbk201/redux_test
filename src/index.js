import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reducers from './reducers/index';
import registerServiceWorker from "./registerServiceWorker";
import { Provider} from "react-redux";
import { createStore } from "redux";
import initData from "./initData";
const store = createStore(reducers,initData);
window.store=store;
// console.log(store.getState());

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
