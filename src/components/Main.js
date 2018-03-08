import React from "react";
// import PropTypes from "prop-types";
import { Message,Button } from 'semantic-ui-react'
import { Component } from 'react';
class _Component extends Component {
	componentDidMount() {
		this.props.fetch1()
		// const that=this;
		setTimeout(function(){
			document.querySelectorAll('select')[1].selectedIndex = 2;
			// this.refs.country.selectedIndex = 2;
		},2000)
  	}
  	// onEnter(e){
		// const isEnter=e.keyCode===13;
		// const text=e.target.value;
	// };
	searchMethod(method){
		const sbu=this.refs.sbu.value;
		const country=this.refs.country.value;
		this.props.pickedItems({sbu,country})
		this.props.fetchCustomers({sbu,country,method});
	}
	render(){
  	const {data,status:{loading,finished},UI}=this.props;

  	if(!finished) return <div>Loading</div>
  	// console.log('data',data);

  	const sbuAttr=ele=>({
  		key:ele.SbuID,
  		value:ele.SbuID
  	});
  	const countryAttr=ele=>({
  		key:ele.countryCode,
  		value:ele.countryCode
  	});
  	const activeItem='';

	return (
		<div>
			<br/>
			<Message>
				<Message.Header>Select SBU</Message.Header>
				<select ref="sbu">
				 	{data.sbus.map(ele=>
				 		<option {...sbuAttr(ele)}>{ele.SbuName}</option>
				 	)}
				</select> <p/>
				<Message.Header>Select Country</Message.Header>
				<select ref="country">
				 	{data.countries.map(ele=>
				 		<option {...countryAttr(ele)}>{ele.countryName}</option>
				 	)}
				</select><p/>
				<Message.Header> Search By</Message.Header>
				<Button color="blue" onClick={()=>this.searchMethod("contact")}>Cook Contact</Button>
				<Button color="blue" onClick={()=>this.searchMethod("customer")}>Customer</Button>
				<Button color="blue" onClick={()=>this.searchMethod("unassigned")}>Unassigned Customer</Button>
			</Message>
		</div>
	);
  	
  }
}
// _Component.propTypes = {
	// text: PropTypes.string,
	// done: PropTypes.bool,
	// createdAt: PropTypes.string
// };
export default _Component;