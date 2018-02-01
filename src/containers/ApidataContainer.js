import { connect } from 'react-redux'
import { fetchTodos } from '../actions'
import Apidata from '../components/Apidata'


const mapStateToProps = (state) => {
  console.log(state);
  return {
    data:state.apidata
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodos:()=> dispatch(fetchTodos()),
    postTodos:(text)=> console.log(text),
    deleteTodos:(_id)=> console.log(_id),
    // deleteTodos:(_id)=> dispatch(deleteTodos(_id)),
  }
}

const ApidataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Apidata)

export default ApidataContainer