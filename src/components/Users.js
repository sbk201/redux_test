import React from "react";
import {loopObj} from "../init/global";
const getProps=({users})=>{

	// const theMap=users.map(user=> loopObj(user,(key,value)=>
	// 	(<div>{key} : {value}</div>)
	// ));
	// console.log(theMap);
	// const userDOM=(<div>
	// 	<hr/></div>)
	return {users:'test'}
}
const UserList=({users})=>{
	const User=user=>loopObj(user,(key,value)=>
		<div key={key}>{key} : {value}</div>
	)
	// return <div>test user</div>
	return <div> {users.map((user,i)=><User key={i} {...user}/>)} </div>
}
const Users = props => {
	const {users}=props;
	return (<div>
    <h2>Users</h2>
    <div>
    	<UserList {...{users}}/>
    </div>
  </div>
);}
export default Users