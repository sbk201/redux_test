import React, { Component } from "react";
import "react-dom";
import "./App.css";

class App extends Component {
	constructor(){
		super();
		this.state={
			term:'',
			stock:true,
		}
	}
	onInput(e){this.setState({term:e.target.value}); }
	onChangeStock(e){this.setState({stock: e.target.checked}); }
	render(){
		return (
			<div>
				<SearchBox onInput={e=>this.onInput(e)} onChangeStock={e=> this.onChangeStock(e)}></SearchBox>
				<SearchTable term={this.state.term} stock={this.state.stock}></SearchTable>
			</div>
		);
	}
}
class SearchBox extends Component {
	render(){
		return (
			<div>
        Search <input onChange={e=>this.props.onInput(e)}></input><br/>
				<input type="checkbox" onChange={e=> this.props.onChangeStock(e)}></input>
				 Only show products in stock
			</div>
		);
	}
}
class SearchTable extends Component {
	render(){
		// const rowHead=PRODUCTS.map(e=>e.category)
			// .filter((elem,th,self)=> th === self.indexOf(elem));
		// console.log(rowHead);
		const term=this.props.term.toLowerCase();
		const stock=this.props.stock;
		const rows=PRODUCTS
		.filter(it=> !term || it.name.toLowerCase().includes(term))
		.filter(it=> !stock || it.stocked===stock)
		.map(it=> <ProductRows key={it.name} product={it}></ProductRows>);
		
		return (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		);
	}
}
const PRODUCTS=[
	{category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
	{category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
	{category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
	{category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
	{category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
	{category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
class ProductRows extends Component {
	render(){
		const it = this.props.product;
		const style= it.stocked? {} : {color:"red"};
		return (
			<tr key={it.name} style={style}>
				<th>{it.name}</th>
				<th>{it.price}</th>
			</tr>
		);
	}
}
export default App;