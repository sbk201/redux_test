import React,{Fragment as Frag} from "react";
// import PropTypes from "prop-types";
import {Table } from "react-bootstrap";
import {mapIndex} from '../init/global';
import Paging from "./Paging";
import {last} from "ramda";

const entry=20;
const getProps=props=>{
	const {getNews, updateUI, news} = props;
	const itemFn= (item, i)=> <Frag key={i}>
	<div>{i+1}, {item.title}<br/> {item.author} </div><br/>
	</Frag>
	const NewsList= ({list})=> mapIndex(itemFn)(list)
	const onPage= e=> {
		const page= e.target.getAttribute("value");
		updateUI({page});
		getNews(page,entry);
	};
	return {NewsList, onPage}
}
const Home=props=>{
  	const {news, page}=props;
  	// testing('test');
  	const {NewsList, onPage}=getProps(props);
	return (
		<div>
			<h1>NewsPaper</h1>
			<Paging entry={entry} amount={1024} onClick={onPage} activePage={page}/>
			<NewsList list={news} />
		</div>
	);
}
export default Home