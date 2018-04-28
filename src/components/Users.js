import React from "react";
import {objMap,objLoop} from "../init/global";
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
const Register=({addUser})=>{
	const getValue=(obj)=>objLoop(obj,(key,va)=>({[key]:va.value}));
	const submit=e=>addUser(getValue(this));
	const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} {...{...rest}}/>;
	
	return(
		<div>
			<div>Email: <Input refer={"email"} defaultValue="abc@gmail.com"/></div>
			<div>Username: <Input refer={"username"} defaultValue="jsiu"/></div>
			<div>Password: <Input refer={"password"} defaultValue="passesword"/></div>
			<button onClick={submit}>Confirm</button>
		</div>
		)
}
const Users = props => {
	const {users,addUser}=props;
	return (<div>
    <h2>Users</h2>
    <Register {...{addUser}}/>
    <hr/>
    <div>
    	<UserList {...{users}}/>
    </div>
  </div>
);}
export default Users