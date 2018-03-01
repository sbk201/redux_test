import axios from "axios";
// import store from "../index";
export const updateUI = (cmd) => {
	return {
		type: "UPDATE_UI",
		...cmd
	};
};
export const toggleTodo = (createdAt) => {
	return {
		type: "TOGGLE_TODO",
		createdAt,
	};
};
export const deleteTodo = (createdAt) => {
	return {
		type: "DELETE_TODO",
		createdAt,
	};
};
export const toggleFilter = (filter) => {
	return {
		type: "TOGGLE_FILTER",
		filter,
	};
};
function receiveTodos(todos) {
	return {
		type: "RECEIVE_TODOS",
		todos,
	};
}
function receiveSbus(sbus) {
	return {
		type: "RECEIVE_SBUS",
		sbus,
	};
}
function receiveCountries(countries) {
	return {
		type: "RECEIVE_COUNTRIES",
		countries,
	};
}
function receiveCustomers(Customers) {
	return {
		type: "RECEIVE_CUSTOMERS",
		Customers,
	};
}
function addTodos(todos) {
	return {
		type: "ADD_TODOS",
		todos
	};
}
function removeTodos(_id) {
	return {
		type: "REMOVE_TODOS",
		_id
	};
}
const link={
	old:"http://localhost:5000/data",
	sbu:"http://localhost:5000/allocation/sbu",
	country:"http://localhost:5000/allocation/country",
	customer:"http://localhost:5000/allocation/assigned_cust",
	unCustomer:"http://localhost:5000/allocation/unassigned_cust",
	contact:"http://localhost:5000/allocation/contact"
}
export const deleteTodos=(_id)=>{
	return dispatch => {
		const data = {_id};
		axios.delete(link.old,{data})
			.then(res=>{
				if(res.data) dispatch(removeTodos(_id));
			});
	};
};

export const postTodos=(text)=>{
	return dispatch => {
		const data = {text};
		axios.post(link.old,{},{data})
			.then((res)=>{
				dispatch(addTodos(res.data))
			});
	};
};

export const fetchSbus=()=>{
	return dispatch => {
		const config = {headers: {
			// "Access-Control-Allow-Origin": "*",
		} };
		axios.get(link.sbu,config)
			.then((res)=>{
				dispatch(receiveSbus(res.data))
			});
	};
};

export const fetchTodos=()=>{
	// const link='https://api.github.com/users/sbk201'
	// const gitLink="https://api.github.com/";
	return dispatch => {
		const config = {headers: {
			// "Access-Control-Allow-Origin": "*",
		} };
		axios.get(link.old,config)
			.then((res)=>{
				console.log(res.data)
				dispatch(receiveTodos(res.data))
			});
	};
};

export const fetchSbus2=()=>{
	return dispatch => axios.get(link.sbu,{});
};
export const fetchCountries=()=>{
	return dispatch => axios.get(link.country,{});
};
export const fetchUnassignedCustomer=(params)=>{
	return dispatch => axios.get(link.unCustomer,{params});
};
export const fetchAssignedCustomer=(params)=>{
	return dispatch => axios.get(link.customer,{params});
};
export const fetchPrimaryContact=(params)=>{
	return dispatch => axios.get(link.contact,{params});
};
// "SELECT GlobalCustName, GlobalCustNbr, parentDistributorName, address1, address2, city, zip, destCountrycode , APACCurrentShipCustomerID
	// from dimACFCustomer 
	// WHERE globalCustNbr not in ('ARCHIVE', 'COOK' ,'REP' , 'LOGISTICS' )
	// AND destCountrycode ='".$country."'
	// ORDER BY GlobalCustName ";
export const fetchMain=()=>{

	return async dispatch => {
		const sbus=(await dispatch(fetchSbus2())).data;
		dispatch(receiveSbus(sbus));
		const countries=(await dispatch(fetchCountries())).data;
		dispatch(receiveCountries(countries));
		// return 'done';
		// const countries=await dispatch(fetchCountries());
		// return {sbus.data,countries.data}
	}
}
export const fetchMain2=(_params)=>{
	const {method,...params}=_params;
	const apiFun={
		contact:fetchPrimaryContact,
		customer:fetchAssignedCustomer,
		unassigned:fetchUnassignedCustomer,
	}[method]
	return async dispatch => {
		const result=(await dispatch(apiFun(params))).data;
		dispatch(receiveCustomers(result));
		dispatch(updateUI({method,contName:'CustomerList'}))
		console.log('fetch',result)
		// return 'done';
	}
}