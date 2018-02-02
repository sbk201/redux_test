import { connect } from 'react-redux'
import { fetchTodos,postTodos,deleteTodos } from '../actions'
import Apidata from '../components/Apidata'


const mapStateToProps = (state) => {
  return {
    data:state.apidata.slice().reverse()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodos:()=> dispatch(fetchTodos()),
    postTodos:(text)=> dispatch(postTodos(text)),
    // deleteTodos:(_id)=>console.log(_id),
    deleteTodos:(_id)=> dispatch(deleteTodos(_id)),
  }
}

const ApidataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Apidata)

export default ApidataContainer