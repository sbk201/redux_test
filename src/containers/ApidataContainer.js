import { connect } from 'react-redux'
import { addTodos } from '../actions'
import Apidata from '../components/Apidata'


const mapStateToProps = (state) => {
  return {
    data:state.apidata
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo:(text)=>{
      // dispatch(addTodos({text,createdAt,done}));
    }
  }
}

const ApidataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Apidata)

export default ApidataContainer