import axios from "axios";
import {isTest,dummyData} from './init/global';

export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
const receiveSbus=sbus=>({type: "RECEIVE_SBUS", sbus });
const receiveCountries=countries=>({type: "RECEIVE_COUNTRIES", countries });
const receiveCustomers=customers=>({type: "RECEIVE_CUSTOMERS", customers });
const receiveContact=contact=>({type: "RECEIVE_CONTACT", contact });
const receiveEmployee=employee=>({type: "RECEIVE_EMPLOYEE", employee });
const receiveGcnCustomers=customers=>({type: "RECEIVE_GCN_CUSTOMERS", customers });
export const selectCust=globalCustNbr=>({type: "SELECT_CUST", globalCustNbr});
export const selectEmp=globalEmpNbr=>({type: "SELECT_EMP", globalEmpNbr});
export const pickedSbu=sbu=>({type: "PICKED_SBU", sbu });
export const pickedCountry=country=> ( {type: "PICKED_COUNTRY", country });
export const checkShare=params=> ( {type: "CHECK_SHARE", ...params });
export const nextView=view=>({type: "NEXT_VIEW", view });

const api=async (method,item,params={})=>{
	const link2= "http://localhost:5000/custAllocation/"+item;
	if(method==='get') return (await axios.get(link2,{params})).data
	if(method==='post') return (await axios.post(link2,params)).data
	if(method==='delete') return (await axios.delete(link2,{params})).data
}

const fetchGetCustomers=_params=>{
	const {method,...params}=_params;
	const apiFun={
		contact:()=>api("get","contact",params),
		contact_cust:()=>api("get","contact_cust",params),
		customer:()=>api("get","assigned_cust",params),
		unassigned:()=>api("get","unassigned_cust",params),
	}[method]
	return async dispatch => {
		const dispatchUI= cmd=> dispatch(updateUI({contName:'CustomerList',...cmd}));
		dispatchUI({status:'loading'});

		const result= await apiFun();
		method==='contact' ?
		dispatch(receiveContact(result)) : dispatch(receiveCustomers(result));
		if(isTest && method!=='contact') dispatch(receiveCustomers(dummyData.customers.concat(result)));
		dispatchUI({status:'finished',method});
		// console.log('fetch',result);
	}
}

const fetchGetEmployee=params=>{
	const {sbu,country}=params;
	return async dispatch => {
		const employee=await api("get","sbu_employee",{sbu,country})
		dispatch(receiveEmployee(employee));
		if(isTest) dispatch(receiveEmployee(dummyData.employee.concat(employee)));
	}
}

export const smart= {
	fetchGetCustomers,
	fetchAdmin:(customers)=>{
		return async dispatch=>{
			const custDetail=await api("get","noGcnsOrNameCustDetail",{customers});
			dispatch(receiveGcnCustomers(custDetail));
		}
	},
	fetchHome:()=>{
		return async dispatch => {
			const dispatchUI= cmd=>dispatch(updateUI({contName:'Home',...cmd}));
			dispatchUI({status:'loading'});
			const sbus=await api("get","sbu");
			const countries=await api("get","country");
			dispatch(receiveSbus(sbus));
			dispatch(receiveCountries(countries));
			dispatchUI({status:'finished'});
		}
	},
	editShare: params=>{
		return async dispatch => {
			const {customer,selectedEmp,sbuid}=params;
			const globalCustNbr=customer.map(ele=>ele.globalCustNbr);
			const deleteFn=()=> api("delete","allocation",{globalCustNbr,sbuid});
			const postParam={employee:selectedEmp,customerNbr:globalCustNbr,sbuID:sbuid};
			const postFn=()=>api("post","allocation",postParam);
			console.log('selected Emp',selectedEmp)
			const delResult=await deleteFn();
			console.log('deleted',...delResult);
			const addResult=await postFn();
			console.log('added',...addResult);
		}
	},
	afterSearchView:params=>{
		const {sbu,country}=params;
		return async dispatch => {
			dispatch(fetchGetCustomers(params));
			dispatch(fetchGetEmployee({sbu,country}));
		}
	}
}