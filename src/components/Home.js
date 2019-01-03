import React,{Fragment as Frag} from "react";
// import PropTypes from "prop-types";
import {mapIndex} from '../init/global';

const getProps=props=>{
	const itemFn= (item, i)=> <Frag key={i}>
	<div>{i+1}, {item.title}<br/> {item.author} </div><br/>
	</Frag>
	const NewsList= ({list})=> mapIndex(itemFn)(list)
	return {NewsList}
}
const Home=props=>{
  	const {news}=props;
  	// testing('test');
  	const {NewsList}=getProps(props);
	return (
		<div>
			<h1>NewsPaper</h1>
			<NewsList list={news} />
		</div>
	);
}
export default Home