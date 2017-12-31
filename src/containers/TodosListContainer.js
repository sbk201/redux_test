import { connect } from 'react-redux'
import { toggleTodo,deleteTodo } from '../actions'
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
const mapStateToProps = (state) => {
	console.log(visibleFilter(state.todos,state.visibleFilter))
  return {
    todos:visibleFilter(state.todos,state.visibleFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTodo:createdAt=>dispatch(toggleTodo(createdAt)) ,
    deleteTodo:createdAt=>dispatch(deleteTodo(createdAt))
  }
}

const TodosListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosList)

export default TodosListContainer