import React ,{Component}from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'


class AddTodo extends Component {
  constructor(){
   super();
   this.state={
    userInput:''
   }
  }
  onSubmit(e){
    const {dispatch}=this.props;
        e.preventDefault()
        const input=e.target.querySelector('input');
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        this.setState({userInput:''});
  }
  onChange(e){
    const value=e.target.value;
    this.setState({userInput:value});
  }
  render(){
    return (
      <div>
      <form onSubmit={e => this.onSubmit(e) }>
        <input value={this.state.userInput} onChange={e=>this.onChange(e)}/>
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
    );
  }
}

export default connect()(AddTodo)