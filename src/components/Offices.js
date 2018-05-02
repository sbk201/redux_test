import React from "react";
import {objMap} from "../init/global";
import MyTable_ from "./MyTable";

const getProps=props=>{
	const {offices}=props;
	const newOffices={country:offices.country,...[offices.en]}
	const tableParams=(function(){
  		const style={textAlign:'center',border: '1px black solid'}
  		const param={
  			name:'customer',
	  		headObj:{
	  			array:['name','addr1','addr2','addr3','country'], style,
	  		},
	  		bodyObj:{
	  			array:offices, style
	  		}
  		}
  		return param
  	})();
  	console.log(newOffices)
  	const MyTable=<MyTable_ {...tableParams}/>

	return {MyTable,offices,tableParams}
}
const Offices = props => {
	const {MyTable,offices,tableParams}=getProps(props);
	console.log('test2',tableParams);
	return (<div>
    <h2>Office</h2>
    <div>
    	<MyTable_ {...tableParams}/>
    </div>
  </div>
);}
export default Offices