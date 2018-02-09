import { connect } from 'react-redux'
import { addTodos } from '../Actions.js'
import Todos from '../components/Todos'


const mapStateToProps = (state) => {
  return {
    todos:state.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo:(text)=>{
      const createdAt=new Date();
      const done=false;
      dispatch(addTodos({text,createdAt,done}));
    }
  }
}

const TodosContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos)

export default TodosContainer