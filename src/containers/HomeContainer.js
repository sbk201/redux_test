import { connect } from 'react-redux'
import {omit} from 'lodash';
import { checkUser,smart,updateUI } from '../Actions.js'
import React, { Component } from "react";
import Home from '../components/Home'
const contName="Home";

class HomeContainer extends Component {
  shouldComponentUpdate(nextProps){
    const now=this.props.userProfile;
    const past=nextProps.userProfile;
    console.log('nextProps is :',nextProps);
    console.log(this.props.userProfile);

    if(~~now!==~~past) return false
        
    // won't update
    // const {sbus,countries}=this.props.data;
    // const loaded=sbus&&countries;
    // return !loaded
    return true
  }
  componentDidMount() {
    this.props.checkUser();
    // console.log(db);
  }
  
  render(){
    const rest=omit(this.props,[""])
    return <div>
      
      <Home {...rest}/> 
      </div>
  }
}
const mapStateToProps = (state) => {
  // const UI=state.localUI[contName] || {};
  const {userProfile}=state;
  return {
    userProfile
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    checkUser:()=>dispatch(checkUser())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
