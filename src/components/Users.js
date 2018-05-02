import React from "react";
import {objMap} from "../init/global";
const getProps=({users})=>{

	// const theMap=users.map(user=> objMap(user,(key,value)=>
	// 	(<div>{key} : {value}</div>)
	// ));
	// console.log(theMap);
	// const userDOM=(<div>
	// 	<hr/></div>)
	return {users:'test'}
}
const UserList=({users})=>{
	const User=user=>objMap(user,(key,value)=>
		<div key={key}>{key} : {value}</div>
	)
	return users.map((user,i)=>(<div key={i}>
		<User {...user}/>
		<hr/></div>))
}
const Register=submit=>{
	const log=e=>{
		console.log(this);
	}
	const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} {...{...rest}}/>;
	
	return(
		<div>
			<div>Email: <Input refer={"email"} defaultValue="abc@gmail.com"/></div>
			<div>Username: <Input refer={"username"} defaultValue="jsiu"/></div>
			<div>Password: <Input refer={"password"} defaultValue="passesword"/></div>
			<button onClick={log}>Confirm</button>
		</div>
		)
}
const Users = props => {
	const {users}=props;
	return (<div>
    <h2>Users</h2>
    <Register/>
    <hr/>
    <div>
    	<UserList {...{users}}/>
    </div>
  </div>
);}
export default Users