import React from "react";
// import PropTypes from "prop-types";

const getProps=props=>{
	const {users}=props;
	const getUser=({name,uid})=><div key={uid}>({uid}) {name}</div>
	const Users=()=>users.map(getUser);
	return {Users}
}
const Main=props=>{
  	// const {users}=props;
  	const {Users}=getProps(props);
	return (
		<div> Admin
			<Users/>
		</div>
	);
}
export default Main