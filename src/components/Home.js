import React from "react";
// import PropTypes from "prop-types";
import { Message,Button } from 'semantic-ui-react'

const getProps=props=>{
	const {getHospList}=props;
  	const search=(that,method)=>{
  		const sbuID=that.sbu.value;
  		const keyword=that.name.value;
  		getHospList({keyword,sbuID,method,limit:"allocation"});
  	};
	return {search}
}
const SbuList=({sbus=[]})=>{
	const attr=({sbuID})=>({
		key:sbuID,
		value:sbuID
	});
	return (<select ref={ele=>this.sbu=ele}>
	  		{sbus.map(ele=> <option {...attr(ele)}>{ele.sbuCode}</option>)}
		</select>)
}
const Home=props=>{
  	const {sbus}=props;
  	const {search}=getProps(props);
	const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} {...{...rest}}/>;

	return (
		<div> <br/>
			<Message>
				<Message.Header>Select SBU</Message.Header>
			 	<SbuList sbus={sbus}/><br/><br/>
				<Message.Header>Search by Name</Message.Header>
			    <Input refer={"name"} defaultValue="aaabbb"/><br/><br/>
				<Button color="blue" onClick={()=>search(this,"rep")}>Search by Representative</Button>
				<Button color="blue" onClick={()=>search(this,"hosp")}>Search by Hospital Name</Button>
			</Message>
		</div>
	);
}
export default Home