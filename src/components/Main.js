import React from "react";
// import PropTypes from "prop-types";
import { Message,Button } from 'semantic-ui-react'
const getProps=props=>{
	const search=(method,input)=>{
		const {pickedItems ,fetchSearch}=props;
		const sbu=input.sbu.value;
		const country=input.country.value;
		pickedItems({sbu,country});
		fetchSearch({sbu,country,method});
	}
  	const SbuList=({sbus=[]})=>{
	  	const attr=({SbuID})=>({
	  		key:SbuID,
	  		value:SbuID
	  	});
  		return (<select ref={ele=>this.sbu=ele}>
  		  		{sbus.map(ele=> <option {...attr(ele)}>{ele.SbuName}</option>)}
	 		</select>)
 	}
  	const CountryList=({countries=[]})=>{
	  	const attr=({countryCode})=>({
	  		key:countryCode,
	  		value:countryCode
	  	});
  		return (<select ref={ele=>this.country=ele}>
  		  		{countries.map(ele=> <option {...attr(ele)}>{ele.countryName}</option> )}
	 		</select>)
  	}
	return {search ,SbuList,CountryList}
}
const Main=props=>{
  	const {data:{sbus,countries}}=props;
  	const {search ,SbuList,CountryList}=getProps(props);
	return (
		<div> <br/>
			<Message>
				<Message.Header>Select SBU</Message.Header>
			 	<SbuList sbus={sbus}/>
				<Message.Header>Select Country</Message.Header>
			 	<CountryList countries={countries}/>
				<Message.Header> Search By</Message.Header>
				<Button color="blue" onClick={()=>search("contact",this)}>Cook Contact</Button>
				<Button color="blue" onClick={()=>search("customer",this)}>Customer</Button>
				<Button color="blue" onClick={()=>search("unassigned",this)}>Unassigned Customer</Button>
			</Message>
		</div>
	);
}
export default Main