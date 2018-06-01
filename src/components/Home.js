import React from "react";
// import PropTypes from "prop-types";
import { Message,Button } from 'semantic-ui-react'

const getProps=props=>{
	const {getHospList}=props;
  	const search=(that,method)=>{
  		const sbuId=that.sbu.value;
  		const keyword=that.name.value;
  		getHospList({keyword,sbuId,method,limit:"allocation"});
  	};
	return {search}
}
const SbuList=({sbus=[]})=>{
	const attr=({sbuId})=>({
		key:sbuId,
		value:sbuId
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
			    <Input refer={"name"} defaultValue="aka"/><br/><br/>
				<Button color="blue" onClick={()=>search(this,"rep")}>Search by Representative</Button>
				<Button color="blue" onClick={()=>search(this,"hospital")}>Search by Hospital Name</Button>
			</Message>
		</div>
	);
}
export default Home