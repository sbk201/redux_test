import React from "react";
import UserBarCont from '../containers/UserBarCont';
// import PropTypes from "prop-types";

const getProps=({users})=>{
	const U=user=><div key={user.uid}>{user.uid} <br/> {user.name}<br/><br/></div>
	const Users=({users})=>users.map(U);
	return {Users}
}
const Main=props=>{
  	const {users}=props;
  	const {Users}=getProps(props);
	return (
		<div> 
			<UserBarCont/>
			<h1>Admin</h1>
			<Users users={users}/>
		</div>
	);
}
export default Main