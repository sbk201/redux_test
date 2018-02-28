import {cloneDeep as clone} from "lodash";
const _reducer = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_CUSTOMERS':
    // { GlobalCustName: "Zia Mujeeb Limited", globalCustNbr: "GAF00000001", destCountrycode: "AF" }
      return action.Customers;
    default:
      return state
  }
}

export default _reducer