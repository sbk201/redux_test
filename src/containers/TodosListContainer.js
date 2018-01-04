import { connect } from 'react-redux'
import { toggleTodo,deleteTodo,updateUI } from '../actions'
import TodosList from '../components/TodosList'

const visibleFilter=(todos,filter)=>{
	return todos.filter(ele=>{
		switch (filter){
			case "all": return true;
			case "done": return ele.done
			case "yet": return !ele.done
			default: return true
		}
	})
}
const contName='TodosList';
const mapStateToProps = (state) => {
  return {
    todos:visibleFilter(state.todos,state.visibleFilter),
    UI:state.localUI[contName]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTodo:createdAt=>dispatch(toggleTodo(createdAt)) ,
    deleteTodo:createdAt=>dispatch(deleteTodo(createdAt)),
    updateUI:cmd=>dispatch(updateUI({...cmd,contName}))
  }
}

const TodosListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosList)

export default TodosListContainer