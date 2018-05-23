import React from "react";
import {Pagination as PaginationUI} from 'semantic-ui-react'
const Pagination=({data,UI:{entries=10,page=1},updateUI})=>{
	const attr={
		totalPages:Math.ceil(data.length/entries),
		defaultActivePage:page,
		onPageChange:(_,d)=>updateUI({page:d.activePage})
	};
	return <PaginationUI {...attr}/>
}
export default Pagination