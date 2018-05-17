import axios from "axios";
import {isTest,dummyData} from './init/global';

export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
const receiveSbus=sbus=>({type: "RECEIVE_SBUS", sbus });
const link={
	old:"http://localhost:5000/data",
	sbu:"http://localhost:5000/hospAllocation/sbu",
	rep:"http://localhost:5000/hospAllocation/rep",
	getRep:"http://10.65.1.24/appPortal/hospitalAllocation/lib/api.php?sbu_id=1396&limit=allocation&type=get_rep",
}

const api=async (method,item,params={})=>{
	const link2= "http://localhost:5000/hospAllocation/"+item;
	if(method==='get') return (await axios.get(link2,{params})).data
	if(method==='post') return (await axios.post(link2,params)).data
	if(method==='delete') return (await axios.delete(link2,{params})).data
}

const getSbusApi=async () => (await axios.get(link.sbu,{})).data;
const getRepApi=async params => (await axios.get(link.rep,{params})).data;
export const smart= {
	fetchHome:(customers)=>{
		return async dispatch=>{
			const sbus=await api("get","sbu");
			console.log('got result >>>',sbus)
			dispatch(receiveSbus(sbus));
		}
	},
	getHospList:({method,...rest})=>{
		return async dispatch => {
			if(method==='rep') {
				const rep=await getRepApi(rest);
				console.log(rep);
			}
		}
	},
}