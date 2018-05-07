import axios from "axios";
import {isTest,dummyData} from './init/global';

export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
const receiveSbus=sbus=>({type: "RECEIVE_SBUS", sbus });
const receiveCountries=countries=>({type: "RECEIVE_COUNTRIES", countries });
const receiveCustomers=customers=>({type: "RECEIVE_CUSTOMERS", customers });
const receiveContact=contact=>({type: "RECEIVE_CONTACT", contact });
const receiveEmployee=employee=>({type: "RECEIVE_EMPLOYEE", employee });
export const selectCust=globalCustNbr=>({type: "SELECT_CUST", globalCustNbr});
export const selectEmp=globalEmpNbr=>({type: "SELECT_EMP", globalEmpNbr});
export const pickedSbu=sbu=>({type: "PICKED_SBU", sbu });
export const pickedCountry=country=> ( {type: "PICKED_COUNTRY", country });
export const checkShare=params=> ( {type: "CHECK_SHARE", ...params });
export const nextView=view=>({type: "NEXT_VIEW", view });
const link={
	old:"http://localhost:5000/data",
	sbu:"http://localhost:5000/allocation/sbu",
	country:"http://localhost:5000/allocation/country",
	customer:"http://localhost:5000/allocation/assigned_cust",
	unCustomer:"http://localhost:5000/allocation/unassigned_cust",
	contact:"http://localhost:5000/allocation/contact",
	contact_cust:"http://localhost:5000/allocation/contact_cust",
	sbu_employee:"http://localhost:5000/allocation/sbu_employee",
	add_allocation:"http://localhost:5000/allocation/add_allocation",
	delete_allocation:"http://localhost:5000/allocation/delete_allocation",
}

const getSbusApi=async () => (await axios.get(link.sbu,{})).data;
const getCountriesApi=async () => (await axios.get(link.country,{})).data;
const getUnassignedCustomerApi=async params => (await axios.get(link.unCustomer,{params})).data;
const getAssignedCustomerApi=async params => (await axios.get(link.customer,{params})).data;
const getContactApi=async params => (await axios.get(link.contact,{params})).data;
const getContactCustApi=async params => (await axios.get(link.contact_cust,{params})).data;
const getEmployeeApi=async params => (await axios.get(link.sbu_employee,{params})).data;
const deleteAllocationApi=async params=> (await axios.get(link.delete_allocation,{params})).data;
const addAllocationApi=async params=> (await axios.post(link.add_allocation,params)).data;

const fetchGetCustomers=_params=>{
	const {method,...params}=_params;
	const apiFun={
		contact:getContactApi,
		contact_cust:getContactCustApi,
		customer:getAssignedCustomerApi,
		unassigned:getUnassignedCustomerApi,
	}[method]
	return async dispatch => {
		const dispatchUI= cmd=>{
			dispatch(updateUI({contName:'CustomerList',...cmd}))
		};
		dispatchUI({status:'loading'});

		const result= await apiFun(params);
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
		const employee=await getEmployeeApi({sbu,country});
		dispatch(receiveEmployee(employee));
		if(isTest) dispatch(receiveEmployee(dummyData.employee.concat(employee)));
	}
}

export const smart=(function() {
	return{
		fetchGetCustomers,
		fetchMain:()=>{
			return async dispatch => {
				const dispatchUI= cmd=>dispatch(updateUI({contName:'Main',...cmd}));
				dispatchUI({status:'loading'});
				const sbus=await getSbusApi();
				const countries=await getCountriesApi();
				dispatch(receiveSbus(sbus));
				dispatch(receiveCountries(countries));
				dispatchUI({status:'finished'});
			}
		},
		editShare: params=>{
			return async dispatch => {
				const {customer,selectedEmp,sbuid}=params;
				const globalCustNbr=customer.map(ele=>ele.globalCustNbr);
				const deleteFn=()=> deleteAllocationApi({globalCustNbr,sbuid});
				const addFn=()=>addAllocationApi({employee:selectedEmp,customerNbr:globalCustNbr,sbuID:sbuid});
				console.log('selected Emp',selectedEmp)
				const delResult=await deleteFn();
				console.log('deleted',...delResult);
				const addResult=await addFn();
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
})();