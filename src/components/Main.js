import React from "react";
import PropTypes from "prop-types";
import { Message,Button } from 'semantic-ui-react'
import { Component } from 'react';
class Main extends Component {
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
// PropTypes Generator http://rmosolgo.github.io/prop-types/
Main.propTypes ={
  UI: PropTypes.shape({
    status: PropTypes.string
  }).isRequired,
  data: PropTypes.shape({
    countries: PropTypes.arrayOf(PropTypes.shape({
      countryCode: PropTypes.string.isRequired,
      countryName: PropTypes.string.isRequired
    }).isRequired),
    pickedCountry: PropTypes.string,
    pickedSbu: PropTypes.string,
    sbus: PropTypes.arrayOf(PropTypes.shape({
      SbuID: PropTypes.string.isRequired,
      SbuName: PropTypes.string.isRequired
    }).isRequired)
  }).isRequired,
  status: PropTypes.shape({
    finished: PropTypes.bool,
    loading: PropTypes.bool
  }).isRequired
}
export default Main;