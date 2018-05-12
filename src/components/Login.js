import React from "react";
import {objLoop} from "../init/global";
const getProps=({users})=>{
}
const Login = props => {
	const {loginCall}=props;
	const getValue=(obj)=>objLoop(obj,(key,va)=>{
		return key==='a'? {} : {[key]:va.value}
	});
	const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} {...{...rest}}/>;
	const login=()=>loginCall(getValue(this));
	return (<div>
    <h2>Login</h2>
    <div>User <Input refer={"username"} defaultValue="user01"/></div>
    <div>Password <Input refer={"password"} defaultValue="pass01" type={"password"}/></div>
    <button onClick={login}>Login</button>
  </div>
);}
export default Login