import axios from "axios";
// import store from "../index";
export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
export const nextView=view=>({type: "NEXT_VIEW", view });
export const receiveSbus=sbus=>({type: "RECEIVE_SBUS", sbus });
export const receiveCountries=countries=>({type: "RECEIVE_COUNTRIES", countries });
export const receiveCustomers=customers=>({type: "RECEIVE_CUSTOMERS", customers });
export const receiveContact=contact=>({type: "RECEIVE_CONTACT", contact });
export const selectCust=globalCustNbr=>({type: "SELECT_CUST", globalCustNbr});
export const pickedSbu=sbu=>({type: "PICKED_SBU", sbu });
export const pickedCountry=country=> ( {type: "PICKED_COUNTRY", country });
// export const filterItems=(data,keyword)=> ( {type: "FILTER_ITEMS", data,keyword });
const link={
	old:"http://localhost:5000/data",
	sbu:"http://localhost:5000/allocation/sbu",
	country:"http://localhost:5000/allocation/country",
	customer:"http://localhost:5000/allocation/assigned_cust",
	unCustomer:"http://localhost:5000/allocation/unassigned_cust",
	contact:"http://localhost:5000/allocation/contact",
	contact_cust:"http://localhost:5000/allocation/contact_cust"
}

export const fetchSbus=()=>{
	return () => axios.get(link.sbu,{});
};
export const fetchCountries=()=>{
	return () => axios.get(link.country,{});
};
export const fetchUnassignedCustomer=(params)=>{
	return () => axios.get(link.unCustomer,{params});
};
export const fetchAssignedCustomer=(params)=>{
	return () => axios.get(link.customer,{params});
};
export const fetchContact=(params)=>{
	return () => axios.get(link.contact,{params});
};
export const fetchContactCust=(params)=>{
	return () => axios.get(link.contact_cust,{params});
};
export const fetchMain=()=>{

	return async dispatch => {
		const dispatchUI= cmd=>dispatch(updateUI({contName:'Main',...cmd}));

		dispatchUI({status:'loading'});
		const sbus=(await dispatch(fetchSbus())).data;
		const countries=(await dispatch(fetchCountries())).data;
		dispatch(receiveSbus(sbus));
		dispatch(receiveCountries(countries));
		dispatchUI({status:'finished'});
	}
}
export const fetchCustomers=(_params)=>{
	const {method,...params}=_params;
	const apiFun={
		contact:fetchContact,
		contact_cust:fetchContactCust,
		customer:fetchAssignedCustomer,
		unassigned:fetchUnassignedCustomer,
	}[method]
	console.log(_params);
	return async dispatch => {
		const dispatchUI= cmd=>dispatch(updateUI({contName:'CustomerList',...cmd}));
		dispatchUI({status:'loading'});
		const result= (await dispatch(apiFun(params))).data;
		method==='contact' ?
		dispatch(receiveContact(result)) : dispatch(receiveCustomers(result));
		dispatchUI({status:'finished',method});
		console.log('fetch',result)
		// return 'done';
	}
}