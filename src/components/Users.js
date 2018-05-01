import React from "react";
import {objMap,objLoop} from "../init/global";
const getProps=({users})=>{
	const newUsers=users.map(user=>{
		const {__v,...rest}=user;
		return {...rest}
	})
	return {users:newUsers}
}
const UserList=({users,delUser})=>{
	const User=user=>objMap(user,(key,value)=>
		<div key={key}>{key} : {value}</div>
	)
	return users.map((user,i)=>(<div key={i}>
		<button onClick={()=>delUser(user._id)}>X</button>
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
	const {addUser,delUser}=props;
	const {users}=getProps(props);
	return (<div>
    <h2>Users</h2>
    <Register {...{addUser}}/>
    <hr/>
    <div>
    	<UserList {...{users,delUser}}/>
    </div>
  </div>
);}
export default Users