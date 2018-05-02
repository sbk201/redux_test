import React from "react";
import {objMap} from "../init/global";
const Orders = props => {
	const {orders}=props;
	return (<div>
    <h2>Orders</h2>
    <div>
    	{JSON.stringify(orders)}
    </div>
  </div>
);}
export default Orders