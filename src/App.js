import { connect } from 'react-redux'
import { updateUI,smart } from './Actions.js'
import React, { Component } from "react";
import "react-dom";

// import CustomerListContainer from './containers/CustomerListContainer'
// import AllocateContainer from './containers/AllocateContainer'
import TodosContainer from './containers/TodosContainer'

const mapStateToProps = (state) => {
  return { }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetch:()=>dispatch(smart.getMessage()),
  }
}

class App extends Component {
 
  componentDidMount() {
    this.props.fetch();
  }
	render(){
			// ${wraperCss}
			// grid-template-columns: 1fr 6em;
			// @media screen and (min-width: 800px) {
				// grid-template-columns: 1fr 10em;
  			// }
				// <TodosContainer/>
		return (
			<div>
				<h1>Todo Demo</h1>
    			<TodosContainer/>
			</div>
			
		);
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)