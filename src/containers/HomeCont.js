import { connect } from 'react-redux'
import {updateUI,smart} from '../Actions.js'
import React, { Component } from "react";
import Home from '../components/Home'
import {isEmpty} from "ramda";
const contName="Home";

class HomeCont extends Component {
  componentDidMount() {
    this.props.getNews();
  }
  
  render(){
    const {news}=this.props;
    if(isEmpty(news)) return <div>loading</div>
    return <div><Home {...this.props}/></div>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const page= UI.page || null;
  const {news} = state;
  return {news, page}
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  const dispatchFn= fn=> params=> dispatch(fn(params));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    getNews:(from,entry)=>dispatch(smart.fetchNews(from,entry)),
    // getTodo: dispatchFn(smart.fetchNews),
    postTodo:todo=>dispatch(smart.postTodo(todo)),
    deleteTodo: id=>dispatch(smart.deleteTodo(id)),
    postTag:tag=>dispatch(smart.postTag(tag)),
    // listen:()=>dispatch(smart.listenTodos())

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeCont)
