import { connect } from 'react-redux'
import { fetchPoke } from '../actions'
import Apidata from '../components/Apidata'


const mapStateToProps = (state) => {
  return {
    data:state.apidata
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    post:()=>{
      dispatch(fetchPoke());
    }
  }
}

const ApidataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Apidata)

export default ApidataContainer