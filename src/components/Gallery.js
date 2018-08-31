import React from "react";
import { Col,Row,Grid,Image } from "react-bootstrap";
import a from "../img/a.jpg";
import b from "../img/b.jpg";
import c from "../img/c.jpg";
import d from "../img/d.jpg";
import e from "../img/e.jpg";
import f from "../img/f.jpg";

const getProps=props=>{
	const imgArray=[b,c,d,e,a,f];
	const imageStyle={width:"100%",marginBottom:"1rem", position: "relative"};
	// const divStyle={width: "100%", height: "20rem", overflow: "hidden"};
	const ImageQ=({src})=><Image style={imageStyle} src={src} alt="" thumbnail responsive/>
	const Images=({array})=> array.map(src=>(
			<Col xs={12} sm={6} md={4} key={src}>
				<ImageQ src={src}/>
			</Col>
		))
	return {Images,imgArray}
}
const Gallery=props=>{
	const {Images,imgArray}=getProps(props);

	return (
		<Grid>
			<Row>
				<Images array={imgArray}/>
			</Row>
		</Grid>
	);
};
export default Gallery;