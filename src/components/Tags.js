import React from "react";
// import PropTypes from "prop-types";

const getProps=({tags})=>{
	const onDelete=id=>e=>console.log(`delete ${id}`);
	const Item=({tag})=><button>{"x "+tag}</button>
	const itemFn=(tag,i)=> <Item tag={tag} key={i}/>;
	const Items=({tags})=>tags.map(itemFn);
	
	return {Items}
}
const Todo=props=>{
  	const {data}=props;
  	const {Items}=getProps(props);
	return (
		<div>
			<Items tags={data}/>
		</div>
	);
}
export default Todo