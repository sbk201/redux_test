import axios from "axios";
// import store from "../index";
export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
export const receiveSbus=sbus=>({type: "RECEIVE_SBUS", sbus });
export const receiveCountries=countries=>({type: "RECEIVE_COUNTRIES", countries });
export const receiveCustomers=customers=>({type: "RECEIVE_CUSTOMERS", customers });
export const receiveContact=contact=>({type: "RECEIVE_CONTACT", contact });
export const receiveEmployee=employee=>({type: "RECEIVE_EMPLOYEE", employee });
export const selectCust=globalCustNbr=>({type: "SELECT_CUST", globalCustNbr});
export const selectEmp=GlobalEmpNbr=>({type: "SELECT_EMP", GlobalEmpNbr});
export const pickedSbu=sbu=>({type: "PICKED_SBU", sbu });
export const pickedCountry=country=> ( {type: "PICKED_COUNTRY", country });
export const receiveMessage=message=>({type: "RECEIVE_MESSAGE", message });
export const getMessage=message=>({type: "GET_MESSAGE", message });
export const addMessage=message=> ( {type: "ADD_MESSAGE", ...message});
const link={
	old:"http://localhost:5000/data",
	sbu:"http://localhost:5000/allocation/sbu",
	country:"http://localhost:5000/allocation/country",
	customer:"http://localhost:5000/allocation/assigned_cust",
	unCustomer:"http://localhost:5000/allocation/unassigned_cust",
	contact:"http://localhost:5000/allocation/contact",
	contact_cust:"http://localhost:5000/allocation/contact_cust",
	sbu_employee:"http://localhost:5000/allocation/sbu_employee",
	message:"http://localhost:5000/data",
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
export const fetchEmployee=(params)=>{
	return () => axios.get(link.sbu_employee,{params});
};
export const fetchMessage=(params)=>{
	return () => axios.get(link.message,{params});
};
export const nextView=view=>({type: "NEXT_VIEW", view });
export const fetchGetMessage=()=>{
	return async dispatch => {
		const message=(await dispatch(fetchMessage())).data;
		console.log('data get',message)
		dispatch(receiveMessage(message));
	}
}
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
export const fetchGetCustomers=(_params)=>{
	const {method,...params}=_params;
	const apiFun={
		contact:fetchContact,
		contact_cust:fetchContactCust,
		customer:fetchAssignedCustomer,
		unassigned:fetchUnassignedCustomer,
	}[method]
	return async dispatch => {
		const dispatchUI= cmd=>dispatch(updateUI({contName:'CustomerList',...cmd}));
		dispatchUI({status:'loading'});

		const result= (await dispatch(apiFun(params))).data;
		method==='contact' ?
		dispatch(receiveContact(result)) : dispatch(receiveCustomers(result));
		dispatchUI({status:'finished',method});
		// console.log('fetch',result);
	}
}

export const fetchGetEmployee=params=>{
	const {sbu,country}=params;
	return async dispatch => {
		const employee=(await dispatch(fetchEmployee({sbu,country}))).data
		dispatch(receiveEmployee(employee));
	}
}
export const afterSearchView=params=>{
	const {sbu,country}=params;
	return async dispatch => {
		dispatch(fetchGetCustomers(params));
		dispatch(fetchGetEmployee({sbu,country}));
	}
}

const getMessageApi=()=>{
	return axios.get(link.message);
};
const addMessageApi=(params)=>{
	return axios.post(link.message,params);
};
export const smart=(function() {
	return {
		getMessage: ()=>async dispatch => {
			const message=(await getMessageApi()).data;
			dispatch(getMessage(message));
			console.log('got message,',message)
		},
		addMessage: param=> async dispatch => {
			const {text,date}=(await addMessageApi(param)).data;
			dispatch(addMessage({text,date}));
		}
	}
})();